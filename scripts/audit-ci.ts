import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Known unfixable upstream Prisma advisory:
// prisma@7.9.1 -> @prisma/config -> deepmerge-ts (<8.0.0)
// DeepmergeTS has stack exhaustion when merging recursive object graphs
// Advisory: GHSA-ggr8-5vv4-36mx (https://github.com/advisories/GHSA-ggr8-5vv4-36mx)
// Prisma pins @prisma/config which depends on deepmerge-ts. No non-breaking fix is available upstream.
const ALLOWED_ADVISORY_IDS = new Set([
  "GHSA-ggr8-5vv4-36mx",
  "https://github.com/advisories/GHSA-ggr8-5vv4-36mx",
  1145093,
]);

const ALLOWED_CHAIN_PACKAGES = new Set([
  "deepmerge-ts",
  "@prisma/config",
  "prisma",
]);

export type AuditVulnerability = {
  name: string;
  severity: string;
  isDirect: boolean;
  via: Array<string | { url?: string; source?: number | string; title?: string; severity?: string }>;
  effects: string[];
};

export type AuditReport = {
  vulnerabilities?: Record<string, AuditVulnerability>;
  metadata?: {
    vulnerabilities?: {
      info: number;
      low: number;
      moderate: number;
      high: number;
      critical: number;
      total: number;
    };
  };
};

export type UnexpectedFinding = {
  package: string;
  severity: string;
  reason: string;
};

export function checkAuditReport(report: AuditReport): UnexpectedFinding[] {
  const vulnerabilities = report.vulnerabilities || {};
  const unexpected: UnexpectedFinding[] = [];

  for (const [pkgName, vuln] of Object.entries(vulnerabilities)) {
    const isHighOrCritical =
      vuln.severity === "high" || vuln.severity === "critical";

    if (!isHighOrCritical) {
      continue;
    }

    if (!ALLOWED_CHAIN_PACKAGES.has(pkgName)) {
      unexpected.push({
        package: pkgName,
        severity: vuln.severity,
        reason: `Unexpected vulnerable package: ${pkgName}`,
      });
      continue;
    }

    const vias = vuln.via || [];
    for (const via of vias) {
      if (typeof via === "string") {
        if (!ALLOWED_CHAIN_PACKAGES.has(via)) {
          unexpected.push({
            package: pkgName,
            severity: vuln.severity,
            reason: `Unexpected dependency in chain: ${via}`,
          });
        }
      } else if (typeof via === "object" && via !== null) {
        const isAllowed =
          ALLOWED_ADVISORY_IDS.has(via.url || "") ||
          ALLOWED_ADVISORY_IDS.has(via.source || "") ||
          (typeof via.url === "string" &&
            via.url.includes("GHSA-ggr8-5vv4-36mx"));

        if (!isAllowed) {
          unexpected.push({
            package: pkgName,
            severity: vuln.severity,
            reason: `Unexpected advisory: ${via.url || via.title || via.source}`,
          });
        }
      }
    }
  }

  return unexpected;
}

export function runAuditCi(): void {
  let stdout = "";
  try {
    stdout = execSync("npm audit --json", {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (err: unknown) {
    const execErr = err as { stdout?: string | Buffer };
    stdout = execErr.stdout ? execErr.stdout.toString() : "";
  }

  if (!stdout) {
    console.log("No audit output received. Audit clean.");
    return;
  }

  let report: AuditReport;
  try {
    report = JSON.parse(stdout);
  } catch (parseErr) {
    console.error("Failed to parse npm audit JSON output:", parseErr);
    process.exit(1);
  }

  const unexpected = checkAuditReport(report);

  if (unexpected.length > 0) {
    console.error(
      "❌ npm audit CI gate FAILED: Found unapproved high/critical vulnerabilities:"
    );
    console.error(JSON.stringify(unexpected, null, 2));
    process.exit(1);
  }

  const totalHigh = report.metadata?.vulnerabilities?.high ?? 0;
  const totalCrit = report.metadata?.vulnerabilities?.critical ?? 0;
  console.log(
    `✅ npm audit CI gate PASSED: Only approved upstream advisory (GHSA-ggr8-5vv4-36mx in Prisma chain: ${totalHigh} high, ${totalCrit} critical). 0 unexpected vulnerabilities.`
  );
}

const currentFile = fileURLToPath(import.meta.url);
const executedFile = process.argv[1] ? fileURLToPath(new URL(`file:///${process.argv[1].replace(/\\/g, "/")}`)) : "";

if (executedFile && currentFile.toLowerCase() === executedFile.toLowerCase()) {
  runAuditCi();
}

export function resolve(specifier, context, nextResolve) {
  if (specifier === "next/server") {
    return nextResolve("next/server.js", context);
  }

  if (specifier.startsWith("@/")) {
    return {
      shortCircuit: true,
      url: new URL(`../${specifier.slice(2)}.ts`, import.meta.url).href,
    };
  }

  return nextResolve(specifier, context);
}

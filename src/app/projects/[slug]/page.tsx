import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CalendarCheck,
  CaretLeft,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";

import { ProjectCard } from "@/components/cards/project-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/public-content";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Proyek Tidak Ditemukan",
    };
  }

  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: [project.coverImage.src],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projects
    .filter((item) => item.slug !== project.slug && item.category === project.category)
    .slice(0, 3);

  return (
    <>
      <article>
        <section className="section-container pt-32 md:pt-40">
          <Button asChild variant="ghost" size="sm" className="mb-8">
            <Link href="/projects">
              <CaretLeft aria-hidden className="h-4 w-4" />
              Kembali
            </Link>
          </Button>
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
            <div>
              <Badge variant="gold">{project.category}</Badge>
              <h1 className="mt-5 font-serif text-[clamp(3rem,7vw,7rem)] leading-[0.9] text-forest-900 text-balance">
                {project.title}
              </h1>
              <p className="mt-6 text-base leading-8 text-text-secondary md:text-lg">
                {project.excerpt}
              </p>
            </div>
            <div className="grid gap-3 rounded-xl border border-forest-200/60 bg-surface p-5 shadow-card sm:grid-cols-3">
              <ProjectMeta icon="location" label="Lokasi" value={project.location} />
              <ProjectMeta icon="year" label="Tahun" value={project.year} />
              <ProjectMeta
                icon="scope"
                label="Lingkup"
                value={project.scope.join(", ")}
              />
            </div>
          </div>
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-background-muted shadow-soft">
            <Image
              src={project.coverImage.src}
              alt={project.coverImage.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="section-container grid gap-10 py-16 md:py-24 lg:grid-cols-[0.72fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-gold-700">
              Cerita Proyek
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-none text-forest-900 md:text-6xl">
              Dirancang untuk ritme hidup yang nyata.
            </h2>
          </div>
          <div>
            <p className="text-base leading-8 text-text-secondary md:text-lg">
              {project.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.scope.map((scope) => (
                <Badge key={scope}>{scope}</Badge>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background-muted">
          <div className="section-container py-16 md:py-24">
            <div className="mb-8 max-w-2xl">
              <p className="text-sm font-semibold uppercase text-gold-700">
                Galeri
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-none text-forest-900 md:text-6xl">
                Detail ruang yang membentuk suasana.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {project.gallery.map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl bg-background shadow-card"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </article>

      <section className="section-container py-16 md:py-24">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-gold-700">
              Proyek Terkait
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-none text-forest-900 md:text-6xl">
              Jelajahi ruang serupa.
            </h2>
          </div>
          <Button asChild variant="secondary">
            <Link href="/#kontak">
              Konsultasi
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        {relatedProjects.length ? (
          <div className="grid gap-5 md:grid-cols-3">
            {relatedProjects.map((item) => (
              <ProjectCard key={item.id} project={item} />
            ))}
          </div>
        ) : (
          <Button asChild variant="secondary">
            <Link href="/projects">Semua Proyek</Link>
          </Button>
        )}
      </section>
    </>
  );
}

function ProjectMeta({
  icon,
  label,
  value,
}: {
  icon: "location" | "year" | "scope";
  label: string;
  value: string;
}) {
  const Icon =
    icon === "location" ? MapPin : icon === "year" ? CalendarCheck : ArrowRight;

  return (
    <div>
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-pill bg-forest-50 text-forest-800">
        <Icon aria-hidden className="h-5 w-5" weight="duotone" />
      </div>
      <p className="text-xs font-semibold uppercase text-text-muted">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-forest-900">
        {value}
      </p>
    </div>
  );
}

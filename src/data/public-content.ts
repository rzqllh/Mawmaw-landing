import { createWhatsappLink } from "@/lib/whatsapp";
import type { IconName } from "@/lib/icons";

export type SiteConfig = {
  name: string;
  description: string;
  url?: string;
  email: string;
  phone?: string;
  address?: string;
  socials: {
    instagram?: string;
    pinterest?: string;
    behance?: string;
    email?: string;
  };
};

export type NavItem = {
  label: string;
  href: string;
};

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type HeroContent = {
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  image: ImageAsset;
  statCards: {
    label: string;
    value: string;
    description?: string;
    icon?: IconName;
  }[];
};

export type AboutContent = {
  label: string;
  title: string;
  description: string;
  image: ImageAsset;
  badge?: {
    title: string;
    description: string;
  };
  values: {
    title: string;
    description: string;
    icon: IconName;
  }[];
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  image?: ImageAsset;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  excerpt: string;
  description: string;
  coverImage: ImageAsset;
  gallery: ImageAsset[];
  featured: boolean;
  year: string;
  scope: string[];
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: ImageAsset;
  publishedAt: string;
  category: string;
  featured: boolean;
  content: string[];
};

export type ContactFormInput = {
  name: string;
  email: string;
  projectType: string;
  location: string;
  message: string;
};

export const siteConfig: SiteConfig = {
  name: "Mawmaw Interior",
  url: "https://mawmaw-interior.vercel.app",
  description:
    "Mawmaw Interior adalah studio desain interior yang membantu menciptakan ruang hangat, fungsional, dan elegan untuk rumah maupun tempat usaha.",
  email: "hrizqullah484@gmail.com",
  phone: "+6281294232755",
  address: "Jakarta Selatan, Indonesia",
  socials: {
    instagram: "https://www.instagram.com/mawmawinterior/",
    pinterest: "",
    behance: "",
    email: "mailto:[EMAIL_ADDRESS]",
  },
};

export const navItems: NavItem[] = [
  { label: "Tentang", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "Proyek", href: "#proyek" },
  { label: "Artikel", href: "#artikel" },
  { label: "Kontak", href: "#kontak" },
];

export const heroContent: HeroContent = {
  title: "Ruang yang hangat, elegan, dan dirancang untuk kehidupan Anda.",
  description:
    "Mawmaw Interior membantu menciptakan ruang yang personal, fungsional, dan indah—untuk rumah maupun tempat usaha yang merefleksikan siapa Anda.",
  primaryCta: {
    label: "Mulai Konsultasi",
    href: createWhatsappLink(
      siteConfig.phone ?? "",
      "Halo Mawmaw Interior, saya ingin konsultasi desain interior."
    ),
  },
  secondaryCta: {
    label: "Lihat Portfolio",
    href: "#proyek",
  },
  image: {
    src: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=2400&q=85",
    alt: "Ruang keluarga hangat dengan sofa lembut, kayu alami, dan pencahayaan sore.",
    width: 2400,
    height: 1600,
  },
  statCards: [
    {
      label: "Proyek Selesai",
      value: "150+",
      description: "Hunian & Komersial",
      icon: "seal",
    },
    {
      label: "Desain Bernilai",
      value: "Personal",
      description: "Fungsional, estetis, dan berkelanjutan.",
      icon: "heart",
    },
  ],
};

export const aboutContent: AboutContent = {
  label: "Tentang Kami",
  title: "Mawmaw Interior, desain yang berangkat dari hati.",
  description:
    "Kami percaya bahwa ruang yang baik bukan hanya soal estetika, tapi juga tentang bagaimana ruang tersebut mendukung aktivitas, kenyamanan, dan kebahagiaan Anda setiap hari.",
  image: {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    alt: "Sudut interior rumah dengan kursi santai, karya seni, dan tekstur kayu alami.",
    width: 1600,
    height: 1200,
  },
  badge: {
    title: "Pendekatan personal",
    description: "Setiap keputusan desain dimulai dari ritme hidup klien.",
  },
  values: [
    {
      title: "Personal",
      description: "Kami mendengarkan kebutuhan unik setiap klien.",
      icon: "heart",
    },
    {
      title: "Fungsional",
      description: "Desain yang indah, nyaman, dan mudah digunakan.",
      icon: "ruler",
    },
    {
      title: "Hangat",
      description: "Menciptakan suasana yang terasa akrab dan menenangkan.",
      icon: "plant",
    },
    {
      title: "Elegan",
      description: "Detail halus untuk hasil akhir yang timeless.",
      icon: "sparkle",
    },
  ],
};

export const servicesSection = {
  label: "Layanan Kami",
  title: "Solusi desain interior yang lengkap untuk Anda.",
  description:
    "Kami membantu merancang ruang dari arah besar hingga detail keseharian, dengan proses yang tenang dan jelas.",
};

export const services: Service[] = [
  {
    id: "desain-interior",
    title: "Desain Interior",
    description: "Perencanaan ruang menyeluruh sesuai gaya dan kebutuhan.",
    icon: "house",
    image: {
      src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
      alt: "Dapur rumah modern dengan kabinet kayu dan permukaan terang.",
      width: 1200,
      height: 900,
    },
  },
  {
    id: "styling-ruang",
    title: "Styling Ruang",
    description: "Penataan elemen dekor untuk hasil yang harmonis.",
    icon: "armchair",
    image: {
      src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
      alt: "Ruang duduk hangat dengan sofa netral dan dekor alami.",
      width: 1200,
      height: 900,
    },
  },
  {
    id: "konsultasi-desain",
    title: "Konsultasi Desain",
    description: "Sesi konsultasi untuk membantu ide dan keputusan desain.",
    icon: "chat",
    image: {
      src: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1200&q=85",
      alt: "Meja kerja dengan catatan desain dan suasana interior tenang.",
      width: 1200,
      height: 900,
    },
  },
  {
    id: "visualisasi-3d",
    title: "Visualisasi 3D",
    description: "Gambaran realistis untuk memudahkan perencanaan.",
    icon: "cube",
    image: {
      src: "https://images.unsplash.com/photo-1618219740975-d40978bb7378?auto=format&fit=crop&w=1200&q=85",
      alt: "Kamar tidur dengan dekor lembut dan pencahayaan natural.",
      width: 1200,
      height: 900,
    },
  },
  {
    id: "residential",
    title: "Residential",
    description: "Solusi desain untuk rumah tinggal yang nyaman dan indah.",
    icon: "door",
    image: {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
      alt: "Area duduk dengan karya seni dan pencahayaan alami.",
      width: 1200,
      height: 900,
    },
  },
  {
    id: "commercial",
    title: "Commercial",
    description:
      "Desain untuk kantor, retail, kafe, dan ruang komersial lainnya.",
    icon: "storefront",
    image: {
      src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85",
      alt: "Interior kafe hangat dengan meja kayu dan kursi nyaman.",
      width: 1200,
      height: 900,
    },
  },
];

export const projectsSection = {
  label: "Proyek Unggulan",
  title: "Ruang-ruang yang kami banggakan.",
  description:
    "Pilihan proyek yang menunjukkan cara kami menyeimbangkan karakter, fungsi, dan rasa nyaman.",
  cta: "Semua Proyek",
};

export const projects: Project[] = [
  {
    id: "serenity-residence",
    slug: "serenity-residence",
    title: "Serenity Residence",
    category: "Hunian",
    location: "Jakarta Selatan",
    excerpt:
      "Hunian modern hangat dengan material alami dan pencahayaan lembut.",
    description:
      "Serenity Residence dirancang untuk keluarga muda yang menginginkan rumah tenang, rapi, dan tetap terasa hidup. Tata ruang dibuat terbuka agar aktivitas keluarga mengalir alami dari ruang makan, dapur, hingga area santai.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
      alt: "Ruang keluarga modern dengan sofa netral, kayu hangat, dan jendela besar.",
      width: 1600,
      height: 1200,
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
        alt: "Area duduk dengan karya seni dan pencahayaan alami.",
        width: 1400,
        height: 1000,
      },
      {
        src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
        alt: "Dapur rumah modern dengan kabinet kayu dan meja batu terang.",
        width: 1400,
        height: 1000,
      },
      {
        src: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1400&q=85",
        alt: "Ruang makan hangat dengan lampu gantung lembut.",
        width: 1400,
        height: 1000,
      },
    ],
    featured: true,
    year: "2025",
    scope: ["Konsep ruang", "Layout interior", "Visualisasi 3D"],
  },
  {
    id: "oakwood-apartment",
    slug: "oakwood-apartment",
    title: "Oakwood Apartment",
    category: "Apartemen",
    location: "Jakarta Pusat",
    excerpt:
      "Desain minimalis elegan dengan sentuhan kayu dan marmer.",
    description:
      "Apartemen compact ini ditata agar terasa lapang tanpa kehilangan kehangatan. Storage tersembunyi, warna tenang, dan titik cahaya yang lembut membantu ruang kecil terasa lebih lega.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85",
      alt: "Apartemen modern dengan sofa rendah, meja marmer, dan aksen kayu.",
      width: 1600,
      height: 1200,
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600607688066-890987f18a86?auto=format&fit=crop&w=1400&q=85",
        alt: "Ruang apartemen terang dengan furnitur minimalis.",
        width: 1400,
        height: 1000,
      },
      {
        src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=85",
        alt: "Kamar tidur apartemen dengan palet netral.",
        width: 1400,
        height: 1000,
      },
      {
        src: "https://images.unsplash.com/photo-1600607688066-890987f18a86?auto=format&fit=crop&w=1400&q=85",
        alt: "Sudut kerja apartemen dengan detail kayu.",
        width: 1400,
        height: 1000,
      },
    ],
    featured: true,
    year: "2025",
    scope: ["Desain apartemen", "Storage planning", "Styling akhir"],
  },
  {
    id: "kopi-ruang-tengah",
    slug: "kopi-ruang-tengah",
    title: "Kopi Ruang Tengah",
    category: "Komersial",
    location: "Bandung",
    excerpt:
      "Ruang komersial yang nyaman, hangat, dan mudah diingat.",
    description:
      "Kafe ini dibuat seperti ruang tengah yang mengundang orang untuk tinggal sedikit lebih lama. Zonasi tempat duduk, pencahayaan, dan tekstur dirancang untuk menjaga alur operasional tetap efisien.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=85",
      alt: "Interior kafe hangat dengan meja kayu dan kursi nyaman.",
      width: 1600,
      height: 1200,
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1400&q=85",
        alt: "Area bar kafe dengan lampu hangat.",
        width: 1400,
        height: 1000,
      },
      {
        src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1400&q=85",
        alt: "Meja komunal kafe dengan suasana santai.",
        width: 1400,
        height: 1000,
      },
      {
        src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=85",
        alt: "Kursi dan meja kafe dengan pencahayaan alami.",
        width: 1400,
        height: 1000,
      },
    ],
    featured: true,
    year: "2024",
    scope: ["Konsep komersial", "Zonasi ruang", "Styling"],
  },
  {
    id: "aruna-house",
    slug: "aruna-house",
    title: "Aruna House",
    category: "Hunian",
    location: "Tangerang Selatan",
    excerpt:
      "Rumah keluarga dengan palet lembut, penyimpanan rapi, dan ruang komunal lega.",
    description:
      "Aruna House menekankan keseimbangan antara area bersama dan sudut personal. Ruang keluarga dibuat terbuka, sementara kamar dan area kerja memiliki karakter yang lebih tenang.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85",
      alt: "Interior rumah keluarga dengan sofa hangat dan dekor alami.",
      width: 1600,
      height: 1200,
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1400&q=85",
        alt: "Ruang santai rumah dengan warna netral.",
        width: 1400,
        height: 1000,
      },
      {
        src: "https://images.unsplash.com/photo-1618219740975-d40978bb7378?auto=format&fit=crop&w=1400&q=85",
        alt: "Kamar tidur dengan dekor lembut dan pencahayaan natural.",
        width: 1400,
        height: 1000,
      },
    ],
    featured: false,
    year: "2024",
    scope: ["Interior rumah", "Pemilihan palet", "Dekorasi ruang"],
  },
  {
    id: "senja-office",
    slug: "senja-office",
    title: "Senja Office",
    category: "Kantor",
    location: "Jakarta Barat",
    excerpt:
      "Ruang kerja kecil yang terasa fokus, terang, dan tetap humanis.",
    description:
      "Senja Office mengubah ruang kerja terbatas menjadi tempat yang mendukung konsentrasi dan kolaborasi. Setiap area memiliki fungsi jelas tanpa terasa kaku.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85",
      alt: "Ruang kantor modern dengan meja kerja kayu dan tanaman.",
      width: 1600,
      height: 1200,
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
        alt: "Area kerja bersama dengan meja panjang dan kursi nyaman.",
        width: 1400,
        height: 1000,
      },
      {
        src: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1400&q=85",
        alt: "Ruang rapat kecil dengan meja kayu.",
        width: 1400,
        height: 1000,
      },
    ],
    featured: false,
    year: "2023",
    scope: ["Layout kantor", "Area kolaborasi", "Styling"],
  },
  {
    id: "nala-suite",
    slug: "nala-suite",
    title: "Nala Suite",
    category: "Hospitality",
    location: "Yogyakarta",
    excerpt:
      "Suite penginapan dengan suasana intim, tekstur halus, dan detail tenang.",
    description:
      "Nala Suite memadukan suasana menginap yang nyaman dengan nuansa lokal yang halus. Hasilnya adalah ruang privat yang mudah diingat tanpa terasa berlebihan.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?auto=format&fit=crop&w=1600&q=85",
      alt: "Kamar suite hangat dengan linen terang dan aksen kayu.",
      width: 1600,
      height: 1200,
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
        alt: "Kamar tidur hospitality dengan lampu lembut.",
        width: 1400,
        height: 1000,
      },
      {
        src: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=85",
        alt: "Area duduk suite dengan tekstur hangat.",
        width: 1400,
        height: 1000,
      },
    ],
    featured: false,
    year: "2023",
    scope: ["Konsep suite", "Styling ruang", "Visual direction"],
  },
];

export const articlesSection = {
  label: "Artikel Terbaru",
  title: "Inspirasi dan wawasan desain.",
  description:
    "Catatan ringan untuk membantu Anda melihat rumah, usaha, dan ruang sehari-hari dengan lebih jernih.",
  cta: "Semua Artikel",
};

export const articles: Article[] = [
  {
    id: "ruang-tamu-hangat",
    slug: "ruang-tamu-hangat",
    title: "5 Cara Menciptakan Ruang Tamu yang Hangat dan Mengundang",
    excerpt:
      "Tips praktis untuk menciptakan ruang tamu yang nyaman, fungsional, dan penuh karakter.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
      alt: "Ruang tamu hangat dengan sofa netral dan meja kayu.",
      width: 1600,
      height: 1000,
    },
    publishedAt: "2026-02-12",
    category: "Inspirasi Rumah",
    featured: true,
    content: [
      "Ruang tamu yang hangat tidak selalu membutuhkan banyak dekor. Kuncinya ada pada keseimbangan tekstur, pencahayaan, proporsi furnitur, dan pilihan warna yang membuat orang merasa diterima.",
      "Mulailah dari palet dasar yang tenang, lalu tambahkan aksen melalui kain, kayu, tanaman, atau karya seni. Hindari memenuhi setiap sudut, karena ruang kosong yang tepat justru membuat komposisi terasa lebih lega.",
      "Pencahayaan berlapis juga penting. Lampu plafon memberi terang umum, sementara lampu meja atau standing lamp menghadirkan suasana yang lebih intim saat malam.",
    ],
  },
  {
    id: "tren-warna-interior",
    slug: "tren-warna-interior",
    title: "Tren Warna Interior yang Elegan",
    excerpt:
      "Warna-warna yang membuat ruang terasa lebih hangat, segar, dan timeless.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1600&q=85",
      alt: "Detail interior dengan palet hijau lembut dan tekstur natural.",
      width: 1600,
      height: 1000,
    },
    publishedAt: "2026-01-28",
    category: "Warna",
    featured: false,
    content: [
      "Warna elegan tidak harus gelap atau mencolok. Banyak ruang terasa matang justru karena memakai warna rendah saturasi yang mudah hidup berdampingan dengan cahaya alami.",
      "Hijau zaitun lembut, ivory hangat, cokelat kayu muda, dan abu batu bisa menjadi dasar yang stabil. Gunakan warna aksen hanya pada titik kecil agar ruang tidak cepat terasa lelah.",
      "Sebelum memilih cat, amati cahaya ruangan pada pagi, siang, dan malam. Warna yang bagus di katalog belum tentu memberi rasa yang sama di rumah Anda.",
    ],
  },
  {
    id: "pencahayaan-suasana",
    slug: "pencahayaan-suasana",
    title: "Pencahayaan yang Mengubah Suasana",
    excerpt:
      "Panduan memilih pencahayaan agar setiap ruang terasa lebih hidup.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
      alt: "Kamar tidur dengan pencahayaan hangat dan linen netral.",
      width: 1600,
      height: 1000,
    },
    publishedAt: "2025-12-18",
    category: "Pencahayaan",
    featured: false,
    content: [
      "Cahaya menentukan cara kita membaca ruang. Satu lampu terang di tengah plafon sering membuat ruang terasa datar, sementara kombinasi beberapa sumber cahaya memberi kedalaman.",
      "Gunakan cahaya umum untuk aktivitas utama, cahaya kerja untuk area spesifik, dan cahaya aksen untuk menonjolkan tekstur atau objek penting.",
      "Temperatur warna juga perlu konsisten. Untuk rumah, cahaya hangat biasanya lebih nyaman, terutama pada ruang keluarga, kamar tidur, dan ruang makan.",
    ],
  },
  {
    id: "apartemen-kecil",
    slug: "apartemen-kecil",
    title: "Small Space, Big Impact: Desain Apartemen Kecil",
    excerpt:
      "Ide desain untuk memaksimalkan ruang apartemen tanpa kehilangan kenyamanan.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85",
      alt: "Apartemen kecil terang dengan meja makan ringkas dan sofa netral.",
      width: 1600,
      height: 1000,
    },
    publishedAt: "2025-11-22",
    category: "Apartemen",
    featured: false,
    content: [
      "Apartemen kecil membutuhkan keputusan yang lebih presisi. Setiap furnitur sebaiknya punya ukuran tepat, fungsi jelas, dan ruang sirkulasi yang tidak mengganggu aktivitas harian.",
      "Penyimpanan tertutup membantu mengurangi visual clutter. Namun, sisakan beberapa area terbuka untuk benda personal agar ruang tidak terasa seperti showroom.",
      "Cermin, furnitur ramping, dan palet warna tenang dapat membantu ruang terasa lebih lapang tanpa mengorbankan karakter.",
    ],
  },
  {
    id: "ruang-komersial-berkarakter",
    slug: "ruang-komersial-berkarakter",
    title: "Membuat Ruang Komersial yang Berkarakter",
    excerpt:
      "Cara menyusun pengalaman ruang agar usaha terasa mudah dikenali dan nyaman dikunjungi.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=85",
      alt: "Interior kafe dengan suasana hangat dan meja kayu.",
      width: 1600,
      height: 1000,
    },
    publishedAt: "2025-10-09",
    category: "Komersial",
    featured: false,
    content: [
      "Ruang komersial yang kuat bukan hanya cantik saat difoto. Ia perlu mendukung alur kerja, membuat pengunjung nyaman, dan memberi kesan yang konsisten dengan karakter usaha.",
      "Mulai dari perjalanan pengunjung: apa yang dilihat pertama kali, bagaimana mereka memesan, di mana mereka menunggu, dan area mana yang paling sering diingat.",
      "Detail seperti tinggi meja, jarak antar kursi, titik listrik, dan arah cahaya sangat berpengaruh terhadap pengalaman keseluruhan.",
    ],
  },
  {
    id: "memulai-proyek-interior",
    slug: "memulai-proyek-interior",
    title: "Apa yang Perlu Disiapkan Sebelum Memulai Proyek Interior",
    excerpt:
      "Daftar sederhana agar proses desain berjalan lebih tenang sejak awal.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1600&q=85",
      alt: "Meja kerja dengan catatan desain dan suasana interior tenang.",
      width: 1600,
      height: 1000,
    },
    publishedAt: "2025-09-14",
    category: "Panduan",
    featured: false,
    content: [
      "Sebelum memulai proyek interior, siapkan kebutuhan utama, ukuran ruang, foto kondisi saat ini, preferensi gaya, dan batasan anggaran. Informasi awal yang jelas membantu proses desain berjalan lebih efisien.",
      "Tidak perlu memiliki semua jawaban. Justru proses konsultasi akan membantu merapikan ide dan menentukan prioritas.",
      "Yang paling penting adalah memahami aktivitas utama di ruang tersebut, siapa yang menggunakannya, dan suasana seperti apa yang ingin Anda rasakan setiap hari.",
    ],
  },
];

export const contactContent = {
  label: "Konsultasi",
  title: "Mari wujudkan ruang impian Anda.",
  description:
    "Isi formulir ini dan tim Mawmaw Interior akan menghubungi Anda untuk memahami kebutuhan proyek secara lebih detail.",
  trustBullets: [
    {
      label: "Respon awal dalam 1x24 jam",
      icon: "clock" satisfies IconName,
    },
    {
      label: "Konsultasi awal tanpa biaya",
      icon: "calendar" satisfies IconName,
    },
    {
      label: "Data Anda aman bersama kami",
      icon: "shield" satisfies IconName,
    },
  ],
  fields: {
    name: {
      label: "Nama Lengkap",
      placeholder: "Masukkan nama Anda",
    },
    email: {
      label: "Email",
      placeholder: "Masukkan email Anda",
    },
    projectType: {
      label: "Jenis Proyek",
      placeholder: "Pilih jenis proyek",
    },
    location: {
      label: "Lokasi",
      placeholder: "Kota / area proyek",
    },
    message: {
      label: "Pesan",
      placeholder: "Ceritakan kebutuhan dan ide proyek Anda...",
    },
  },
  projectTypes: [
    "Hunian",
    "Apartemen",
    "Kafe / Retail",
    "Kantor",
    "Hospitality",
    "Konsultasi Awal",
  ],
  submitLabels: {
    whatsapp: "WhatsApp",
    email: "Email",
  },
  loadingLabels: {
    whatsapp: "Membuka WhatsApp...",
    email: "Membuka Email...",
  },
  handoffToast: {
    whatsapp: "Membuka WhatsApp dengan pesan konsultasi Anda.",
    email: "Membuka email dengan pesan konsultasi Anda.",
  },
  errorToast: "Mohon periksa kembali data yang Anda isi.",
};

export const footerContent = {
  headline: "Ruang yang terasa personal, hangat, dan matang.",
  summary:
    "Studio desain interior yang menciptakan ruang hangat, fungsional, dan elegan untuk kehidupan yang lebih baik.",
  navTitle: "Navigasi",
  servicesTitle: "Layanan",
  contactTitle: "Hubungi Kami",
  legal: [] as { label: string; href: string }[],
  copyright: "© 2026 Mawmaw Interior. Semua hak dilindungi.",
};

export const featuredProjects = projects.filter((project) => project.featured);
export const featuredArticle = articles.find((article) => article.featured);
export const supportingArticles = articles.filter((article) => !article.featured);

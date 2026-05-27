import {
  Armchair,
  Article,
  BehanceLogo,
  Buildings,
  CalendarCheck,
  ChatCircleText,
  CheckCircle,
  Clock,
  CompassRose,
  Cube,
  DoorOpen,
  EnvelopeSimple,
  FlowerLotus,
  Heart,
  HouseLine,
  InstagramLogo,
  Lifebuoy,
  Lightbulb,
  MapPin,
  Notebook,
  PinterestLogo,
  Plant,
  Ruler,
  Scales,
  SealCheck,
  ShieldCheck,
  Sparkle,
  Storefront,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";

type IconProps = {
  className?: string;
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  "aria-hidden"?: boolean;
};

export type IconName =
  | "armchair"
  | "article"
  | "behance"
  | "buildings"
  | "calendar"
  | "chat"
  | "check"
  | "clock"
  | "compass"
  | "cube"
  | "door"
  | "email"
  | "flower"
  | "heart"
  | "house"
  | "instagram"
  | "lifebuoy"
  | "lightbulb"
  | "map"
  | "notebook"
  | "pinterest"
  | "plant"
  | "ruler"
  | "scales"
  | "seal"
  | "shield"
  | "sparkle"
  | "storefront"
  | "whatsapp";

export function IconGlyph({ name, ...props }: IconProps & { name: string }) {
  switch (name) {
    case "armchair":
      return <Armchair {...props} />;
    case "article":
      return <Article {...props} />;
    case "behance":
      return <BehanceLogo {...props} />;
    case "buildings":
      return <Buildings {...props} />;
    case "calendar":
      return <CalendarCheck {...props} />;
    case "chat":
      return <ChatCircleText {...props} />;
    case "check":
      return <CheckCircle {...props} />;
    case "clock":
      return <Clock {...props} />;
    case "compass":
      return <CompassRose {...props} />;
    case "cube":
      return <Cube {...props} />;
    case "door":
      return <DoorOpen {...props} />;
    case "email":
      return <EnvelopeSimple {...props} />;
    case "flower":
      return <FlowerLotus {...props} />;
    case "heart":
      return <Heart {...props} />;
    case "house":
      return <HouseLine {...props} />;
    case "instagram":
      return <InstagramLogo {...props} />;
    case "lifebuoy":
      return <Lifebuoy {...props} />;
    case "lightbulb":
      return <Lightbulb {...props} />;
    case "map":
      return <MapPin {...props} />;
    case "notebook":
      return <Notebook {...props} />;
    case "pinterest":
      return <PinterestLogo {...props} />;
    case "plant":
      return <Plant {...props} />;
    case "ruler":
      return <Ruler {...props} />;
    case "scales":
      return <Scales {...props} />;
    case "seal":
      return <SealCheck {...props} />;
    case "shield":
      return <ShieldCheck {...props} />;
    case "storefront":
      return <Storefront {...props} />;
    case "whatsapp":
      return <WhatsappLogo {...props} />;
    case "sparkle":
    default:
      return <Sparkle {...props} />;
  }
}

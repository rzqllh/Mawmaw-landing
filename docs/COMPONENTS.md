# Components

## Public layout

### `SiteHeader`

Desktop navigation plus mobile modal navigation. Mobile state includes dialog semantics, focus trapping, Escape handling, and active-route feedback.

### `SiteFooter`

Studio contact details, social links, section navigation, service reference, and correct phone/WhatsApp affordances.

### `PageHero` and `EmptyState`

Shared list-page heading and honest fallback content for empty project/article collections.

## Landing sections

| Component | Responsibility |
| --- | --- |
| `HeroSection` | Settings-driven headline, image, and project/WhatsApp CTAs |
| `AboutSection` | Settings-driven story, qualitative cards, and values |
| `ServicesSection` | Database-backed services and empty state |
| `FeaturedProjectsSection` | Published featured projects or empty state |
| `FeaturedArticlesSection` | Published featured articles or empty state |
| `ContactSection` | Direct form and access to wizard |

## Content cards

- `ProjectCard`: project cover, category/location/year context, and detail link.
- `ArticleCard`: article cover, category/date, excerpt, and featured/standard variants.
- `ServiceCard`: service icon, description, and optional image.

Cards receive DTOs; they do not fetch database data.

## Seven-step wizard

- `WizardForm`: step switch, direct WhatsApp handoff, async persistence, and feedback.
- `WizardProgress`: semantic progressbar.
- `WizardStep1Service` through `WizardStep6Location`: accessible choice groups using pressed state.
- `WizardStep7Summary`: read-only recap, edit controls, associated labels, announced validation errors, and submit CTA.
- `useWizardStore`: current step, accumulated form data, navigation, update, and reset.

## Admin

### Shell

`AdminLayoutShell`, `AdminSidebar`, `AdminHeader`, `AdminMobileDrawer`, and `AdminCommandPalette` provide authenticated navigation and responsive layout.

### Editors and lists

- `AdminEditorShell`: common editor header, back navigation, save controls, and preview action.
- `DataGrid`: list rows and per-item actions.
- `SortableList`: drag-and-drop ordering.
- `MarkdownEditor`: project/article long-form input.
- `GalleryPreview`: project gallery URL/alt editing.

### Forms

Project and article forms expose explicit status. Service and settings forms use current schema fields. Inbox components update submission status or delete a record.

## UI primitives

`Button`, `Input`, `Textarea`, `Select`, `Badge`, `BlurImage`, `Lightbox`, `ConfirmWhatsappLink`, `MarkdownContent`, `ReadingProgressBar`, and `ArticleShare` provide reusable behavior.

## Component rules

- Data access stays in server components, queries, or server actions.
- Client components own interaction state only.
- Reuse existing primitives before adding components or dependencies.
- Every interactive control needs keyboard behavior, visible focus, and a non-visual label when icon-only.

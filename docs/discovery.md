# Discovery before changes

React 19 with Vinext 1 beta, Vite 8 and Nitro Vercel output. File-based App Router compatibility, not a plain SPA. Root app/layout.tsx; app/page.tsx; app/clients/page.tsx; app/work/[slug]/page.tsx serves eight data-driven case studies. next.config.ts and vite.config.ts exist. No root index.html, Astro config or pages directory. Existing routes are server-rendered; generateStaticParams alone is not proof of prerendering.

Original design: orange, cream and charcoal, editorial headings, portrait before experience. Preserve it.

## Routes

| Route | Source | Homepage inbound |
| --- | --- | --- |
| / | app/page.tsx | Wordmark |
| /clients | app/clients/page.tsx | Header and directory CTA |
| /work/akam | app/work/[slug]/page.tsx + app/work/projects.ts | Experience and additional work |
| /work/gourmet-gather | app/work/[slug]/page.tsx + app/work/projects.ts | Projects & systems |
| /work/bunchful | app/work/[slug]/page.tsx + app/work/projects.ts | Work cards and experience |
| /work/content-studio | app/work/[slug]/page.tsx + app/work/projects.ts | Projects & systems |
| /work/skyrocket-your-biz | app/work/[slug]/page.tsx + app/work/projects.ts | Work cards and experience |
| /work/strongman | app/work/[slug]/page.tsx + app/work/projects.ts | Work cards and experience |
| /work/generation-atomic | app/work/[slug]/page.tsx + app/work/projects.ts | Work cards and experience |
| /work/etsy | app/work/[slug]/page.tsx + app/work/projects.ts | Projects & systems |

No orphan among these ten routes. Existing portrait has dimensions, lazy loading and srcset. Existing SVG favicon and Person schema are present; the brief's contrary observations are stale.

## File map

- app/clients/page.tsx
- app/clients.ts
- app/globals.css
- app/layout.tsx
- app/not-found.tsx
- app/page.tsx
- app/profile.ts
- app/robots.ts
- app/sitemap.ts
- app/work/projects.ts
- app/work/[slug]/page.tsx
- components/portfolio-shell.tsx
- components/ui/accordion.tsx
- components/ui/alert-dialog.tsx
- components/ui/alert.tsx
- components/ui/aspect-ratio.tsx
- components/ui/attachment.tsx
- components/ui/avatar.tsx
- components/ui/badge.tsx
- components/ui/breadcrumb.tsx
- components/ui/bubble.tsx
- components/ui/button-group.tsx
- components/ui/button.tsx
- components/ui/calendar.tsx
- components/ui/card.tsx
- components/ui/carousel.tsx
- components/ui/chart.tsx
- components/ui/checkbox.tsx
- components/ui/collapsible.tsx
- components/ui/combobox.tsx
- components/ui/command.tsx
- components/ui/context-menu.tsx
- components/ui/dialog.tsx
- components/ui/direction.tsx
- components/ui/drawer.tsx
- components/ui/dropdown-menu.tsx
- components/ui/empty.tsx
- components/ui/field.tsx
- components/ui/hover-card.tsx
- components/ui/input-group.tsx
- components/ui/input-otp.tsx
- components/ui/input.tsx
- components/ui/item.tsx
- components/ui/kbd.tsx
- components/ui/label.tsx
- components/ui/marker.tsx
- components/ui/menubar.tsx
- components/ui/message-scroller.tsx
- components/ui/message.tsx
- components/ui/native-select.tsx
- components/ui/navigation-menu.tsx
- components/ui/pagination.tsx
- components/ui/popover.tsx
- components/ui/progress.tsx
- components/ui/radio-group.tsx
- components/ui/resizable.tsx
- components/ui/scroll-area.tsx
- components/ui/select.tsx
- components/ui/separator.tsx
- components/ui/sheet.tsx
- components/ui/sidebar.tsx
- components/ui/skeleton.tsx
- components/ui/slider.tsx
- components/ui/spinner.tsx
- components/ui/switch.tsx
- components/ui/table.tsx
- components/ui/tabs.tsx
- components/ui/textarea.tsx
- components/ui/toast.tsx
- components/ui/toggle-group.tsx
- components/ui/toggle.tsx
- components/ui/tooltip.tsx
- components/work-image.tsx
- lib/seo.ts
- lib/utils.ts
- public/assets/akam-480.webp
- public/assets/akam-864.webp
- public/assets/akam.png
- public/assets/bunchful-480.webp
- public/assets/bunchful-864.webp
- public/assets/bunchful.png
- public/assets/gourmet-480.webp
- public/assets/gourmet-864.webp
- public/assets/gourmet.png
- public/assets/mahdi-portrait-480.webp
- public/assets/mahdi-portrait-800.webp
- public/favicon.svg

See controls-before.md and string-inventory-before.md for the requested exhaustive source inventories.

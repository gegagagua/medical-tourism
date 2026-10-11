import type { RouteKey } from '@medtour/shared';
import { SITE_URL } from '@/lib/seo/metadata';

// Return a dynamic /og URL with per-route-key params so OG previews look page-specific.
export function ogImageFor(key: RouteKey): string {
  switch (key) {
    case 'procedure-dental-implants':
      return `${SITE_URL}/og?procedure=Dental+implants&home=London+%E2%86%92+TBS&atHome=%C2%A310,800&inGeorgia=%243,900&nights=6+nights&coordinator=Nino`;
    case 'procedure-all-on-4':
      return `${SITE_URL}/og?procedure=All-on-4&home=London+%E2%86%92+TBS&atHome=%C2%A316,000&inGeorgia=%247,100&nights=7+nights&coordinator=Nino`;
    case 'procedure-veneers':
      return `${SITE_URL}/og?procedure=Ceramic+veneers&home=Berlin+%E2%86%92+TBS&atHome=%E2%82%AC5,400&inGeorgia=%242,160&nights=5+nights&coordinator=Nino`;
    case 'specialty-dentistry':
      return `${SITE_URL}/og?procedure=Dental+treatment&home=London+%E2%86%92+TBS&atHome=%C2%A310,800&inGeorgia=%243,900&nights=6+nights&coordinator=Nino`;
    case 'specialty-hair':
      return `${SITE_URL}/og?procedure=FUE+hair+transplant&home=Tel+Aviv+%E2%86%92+TBS&atHome=%247,500&inGeorgia=%242,300&nights=4+nights&coordinator=Marina`;
    case 'about-us':
      return `${SITE_URL}/og?procedure=About+Medtour&home=Medical+trips+to+Georgia&atHome=1200%2B+patients&inGeorgia=12+clinics&nights=Vetted+partners&coordinator=Named+doctors`;
    case 'contact':
      return `${SITE_URL}/og?procedure=Talk+to+a+coordinator&home=Tbilisi+office&atHome=Reply+in+1+hour&inGeorgia=EN+DE+RU+HE&nights=Mon%E2%80%93Sat+09%E2%80%9320&coordinator=Nino`;
    default:
      return `${SITE_URL}/og?procedure=Medical+trips+to+Georgia`;
  }
}

import { PlasmicComponent } from "@plasmicapp/loader-nextjs";
import { PLASMIC } from "../plasmic-init";

// Using incremental static regeneration, will invalidate this page
// after 300s (no deploy webhooks needed)
export const revalidate = 300;

// Render the page or component from Plasmic.
export default async function Home() {
  const plasmicData = await PLASMIC.fetchComponentData("/homepage");
  const compMeta = plasmicData.entryCompMetas[0];
  return <PlasmicComponent component={compMeta.displayName} />;
}

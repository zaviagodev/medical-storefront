import { PlasmicClientRootProvider } from "@/plasmic-init-client";
import { PlasmicComponent } from "@plasmicapp/loader-nextjs";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  console.log("params =>", await params);
  return (
    // <PlasmicClientRootProvider pageParams={await params}>
    <PlasmicComponent component="/blog/[slug]" />
    // </PlasmicClientRootProvider>
  );
}

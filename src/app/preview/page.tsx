import { PlasmicComponent } from '@plasmicapp/loader-nextjs';
import { PLASMIC } from '../../plasmic-init';
import { PlasmicClientRootProvider } from '../../plasmic-init-client';

// Using incremental static regeneration, will invalidate this page
// after 300s (no deploy webhooks needed)
export const revalidate = 300;

// Render the page or component from Plasmic.
export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const plasmicData = await PLASMIC.fetchComponentData('/preview');
    const compMeta = plasmicData.entryCompMetas[0];
    return (
        <PlasmicClientRootProvider
            prefetchedData={plasmicData}
            pageRoute={compMeta.path}
            pageParams={compMeta.params}
            pageQuery={searchParams}
        >
            <PlasmicComponent component={compMeta.displayName} />
        </PlasmicClientRootProvider>
    );
}
import { PlasmicComponent } from '@plasmicapp/loader-nextjs';
import { PLASMIC } from '../../../plasmic-init';
import { PlasmicClientRootProvider } from '../../../plasmic-init-client';

// Using incremental static regeneration, will invalidate this page
// after 300s (no deploy webhooks needed)
export const revalidate = 300;


export default async function PreviewPage({ params }: { params: { slug: string[] } }) {
    const plasmicData = await PLASMIC.fetchComponentData(params.slug?.join('/'));
    const compMeta = plasmicData.entryCompMetas[0];
    return (
        <PlasmicClientRootProvider
            prefetchedData={plasmicData}
            pageRoute={compMeta.path}
            pageParams={compMeta.params}
        >
            <PlasmicComponent component={compMeta.displayName} />
        </PlasmicClientRootProvider>
    );

}
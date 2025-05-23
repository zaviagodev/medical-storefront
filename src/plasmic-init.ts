import { initPlasmicLoader } from "@plasmicapp/loader-nextjs/react-server-conditional";
export const PLASMIC = initPlasmicLoader({
    projects: [
        {
            id: "npfZSGByMgVpZQ3fWsZza8",  // ID of a project you are using
            token: "ni3JY66ukbZEWk557eHCoCkCtoMo03jjpqOZCiBVhr7RD78lLZfpW0AXXyS8qT8nxhy4Y8uXXbMnbaH8CO4wZQ"  // API token for that project
        }
    ],
    // Fetches the latest revisions, whether or not they were unpublished!
    // Disable for production to ensure you render only published changes.
    preview: true,
})
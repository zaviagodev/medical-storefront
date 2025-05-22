import { initPlasmicLoader } from "@plasmicapp/loader-nextjs/react-server-conditional";
export const PLASMIC = initPlasmicLoader({
    projects: [
        {
            id: "3RxNvgkTRE9QsQpX7AsVnj",  // ID of a project you are using
            token: "xcGL6ZtzeLqwS5Vo4gdSTwrXaJUNYpuTV0km3iQLeGa4ZbuGUXYzj7CX9dSdcVqVKcO71ZdlA8pYmNvcVw"  // API token for that project
        }
    ],
    // Fetches the latest revisions, whether or not they were unpublished!
    // Disable for production to ensure you render only published changes.
    preview: true,
})
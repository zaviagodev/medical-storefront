import { getBaseURL } from "@/lib/util/env";
import { Toaster } from "@medusajs/ui";
import { Analytics } from "@vercel/analytics/next";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import "@/styles/globals.css";
import { PlasmicClientRootProvider } from "@/plasmic-init-client";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export default function RootLayout(props: {
  children: React.ReactNode;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <html lang="en" data-mode="light" className={GeistSans.variable}>
      <body>
        <PlasmicClientRootProvider pageQuery={props.searchParams}>
          <main className="relative">{props.children}</main>
          <Toaster className="z-[99999]" position="bottom-left" />
        </PlasmicClientRootProvider>
        <Analytics />
      </body>
    </html>
  );
}

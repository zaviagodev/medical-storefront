import { headers } from "next/headers";
import { getBaseURL } from "@/lib/util/env";
import { Toaster } from "@medusajs/ui";
import { Analytics } from "@vercel/analytics/next";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import "@/styles/globals.css";
import { PlasmicClientRootProvider } from "@/plasmic-init-client";
import { NavigationHeader } from "@/modules/layout/templates/nav";
import CartMismatchBanner from "@/modules/layout/components/cart-mismatch-banner";
import { PlasmicComponent } from "@plasmicapp/loader-nextjs";
import FreeShippingPriceNudge from "@/modules/shipping/components/free-shipping-price-nudge";
import { StoreFreeShippingPrice } from "@/types/shipping-option/http";
import { retrieveCart } from "@/lib/data/cart";
import { retrieveCustomer } from "@/lib/data/customer";
import { listCartFreeShippingPrices } from "@/lib/data/fulfillment";
import Footer from "@/modules/layout/templates/footer";
import { getSelectedLocale } from "@/lib/data/locale";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ [key: string]: string | string[] | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const headersList = await headers();
  const slug = headersList.get("x-plasmic-blog-slug");
  const locale = await getSelectedLocale();

  const customer = await retrieveCustomer().catch(() => null);
  const cart = await retrieveCart();
  let freeShippingPrices: StoreFreeShippingPrice[] = [];

  if (cart) {
    freeShippingPrices = await listCartFreeShippingPrices(cart.id);
  }

  return (
    <html lang="en" data-mode="light" className={GeistSans.variable}>
      <body>
        <PlasmicClientRootProvider
          pageQuery={await props.searchParams}
          pageParams={{ slug: slug ?? "" }}
          globalVariants={[{ name: "Locale", value: locale ?? "en" }]}
        >
          <main className="relative">
            <PlasmicComponent component="Thin Header" />
            <NavigationHeader />

            {customer && cart && (
              <CartMismatchBanner customer={customer} cart={cart} />
            )}

            {props.children}

            <Footer />

            {cart && freeShippingPrices && (
              <FreeShippingPriceNudge
                variant="popup"
                cart={cart}
                freeShippingPrices={freeShippingPrices}
              />
            )}
          </main>
          <Toaster className="z-[99999]" position="bottom-left" />
        </PlasmicClientRootProvider>
        <Analytics />
      </body>
    </html>
  );
}

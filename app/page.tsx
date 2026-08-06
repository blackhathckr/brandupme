import type { Metadata } from "next";
import { CountryGateway } from "@/components/gateway/country-gateway";

/**
 * The client wants visitors to pick a country before entering, so the root is
 * the gateway and the India site moved to /india/.
 *
 * Both destinations are plain links, so crawlers follow them from here and
 * index each market's homepage on its own.
 */
export const metadata: Metadata = {
  title: "BrandUpMe | Choose your country",
  description:
    "BrandUpMe operates in India and the UAE. Choose your country to see the services, plans and pricing for your market.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <CountryGateway />;
}

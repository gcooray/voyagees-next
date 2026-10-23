import PrivateDriverGalle from "@/components/PrivateDriverGalle";
import "../page.css";
import "../colombo/page.css";
import "./page.css";
import { withSeo } from "@/lib/seo";

const seo = withSeo("/private-driver/galle", {
  title: "Hire a Private Driver in Galle | Private Taxi with Professional Drivers",
  description:
    "Hire a private driver in Galle for Galle Fort, the southern beaches, transfers to Mirissa, Unawatuna or Colombo, and multi-day trips across Sri Lanka, arranged around your schedule.",
});

// the exact page title, without the site name appended
const TITLE = "Hire a Private Driver in Galle | Private Taxi with Professional Drivers";
export const metadata = {
  ...seo,
  title: { absolute: TITLE },
  openGraph: { ...seo.openGraph, title: TITLE },
  twitter: { ...seo.twitter, title: TITLE },
};

export default function PrivateDriverGallePage() {
  return <PrivateDriverGalle locale="en" />;
}

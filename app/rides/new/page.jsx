import NewTripClient from "./NewTripClient";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo("/rides/new", {
  title: "Post a Shared Trip | voyaGees",
  description:
    "Post a shared trip and split the cost of a private driver with other travelers heading your way in Sri Lanka.",
}, { translated: false, noindex: true });

export default function NewTripPage() {
  return <NewTripClient />;
}

import TripDetailClient from "./TripDetailClient";
import { withSeo } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { tripId } = await params;
  return withSeo(`/rides/${tripId}`, {
    title: "Shared Trip Details",
    description:
      "View trip details and request a seat to split the cost of a private driver in Sri Lanka.",
  }, { translated: false });
}

export default async function TripDetailPage({ params }) {
  const { tripId } = await params;
  return <TripDetailClient tripId={tripId} />;
}

import TripDetailClient from "./TripDetailClient";

export const metadata = {
  title: "Shared Trip Details | voyaGees",
  description:
    "View trip details and request a seat to split the cost of a private driver in Sri Lanka.",
};

export default async function TripDetailPage({ params }) {
  const { tripId } = await params;
  return <TripDetailClient tripId={tripId} />;
}

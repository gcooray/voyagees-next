import PlanTripClient from "./PlanTripClient";

export const metadata = {
  title: "Plan Your Sri Lanka Trip | voyaGees",
  description:
    "Build a personalized Sri Lanka itinerary — pick your interests and trip length and voyaGees suggests a route across the island's best destinations.",
  alternates: {
    canonical: "https://www.voyagees.com/plan-trip",
  },
};

export default function PlanTripPage() {
  return <PlanTripClient />;
}

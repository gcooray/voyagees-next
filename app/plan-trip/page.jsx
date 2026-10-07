import PlanTrip from "@/components/PlanTrip";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo("/plan-trip", {
  title: "Plan Your Sri Lanka Trip | Voyagees",
  description:
    "Tell us your dates, budget and interests and get a day-by-day Sri Lanka itinerary with a private driver, suggested stays and verified prices.",
});

export default function PlanTripPage() {
  return <PlanTrip locale="en" />;
}

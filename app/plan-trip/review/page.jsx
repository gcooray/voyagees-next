import ItineraryReview from "@/components/ItineraryReview";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo("/plan-trip/review", {
  title: "Improve My Sri Lanka Itinerary – Free Review",
  description:
    "Paste your own Sri Lanka itinerary and get free, day-by-day feedback: realistic drive times, days that are too full and the best time for each visit.",
});

export default function ItineraryReviewPage() {
  return <ItineraryReview locale="en" />;
}

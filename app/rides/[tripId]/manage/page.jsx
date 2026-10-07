import ManageRequestsClient from "./ManageRequestsClient";
import { withSeo } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { tripId } = await params;
  return withSeo(`/rides/${tripId}/manage`, {
    title: "Manage Trip Requests",
    description: "Review and respond to requests from travelers who want to join your shared trip.",
  }, { translated: false, noindex: true });
}

export default async function ManageRequestsPage({ params }) {
  const { tripId } = await params;
  return <ManageRequestsClient tripId={tripId} />;
}

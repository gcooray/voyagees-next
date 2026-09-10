import ManageRequestsClient from "./ManageRequestsClient";

export const metadata = {
  title: "Manage Trip Requests | voyaGees",
  description: "Review and respond to requests from travelers who want to join your shared trip.",
};

export default async function ManageRequestsPage({ params }) {
  const { tripId } = await params;
  return <ManageRequestsClient tripId={tripId} />;
}

import { Suspense } from "react";
import RequestForm from "./RequestForm";
// Only usable after picking a driver (driverId in the URL); opened on
// its own it shows an error state, so it's kept out of search results.
import { withSeo } from "@/lib/seo";

export const metadata = withSeo("/request", {
  title: "Booking Request | Voyagees",
  description:
    "Send your Sri Lanka tour booking request with Voyagees.",
}, { noindex: true });

export default function RequestPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            padding: "40px",
            textAlign: "center",
          }}
        >
          Loading request form...
        </div>
      }
    >
      <RequestForm />
    </Suspense>
  );
}
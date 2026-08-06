import { Suspense } from "react";
import RequestForm from "./RequestForm";

export const metadata = {
  title: "Booking Request | Voyagees",
  description:
    "Send your Sri Lanka tour booking request with Voyagees.",
};

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
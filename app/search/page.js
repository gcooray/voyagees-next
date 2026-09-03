import { Suspense } from "react";
import SearchDrivers from "@/components/SearchDrivers";

export const metadata = {
  title: "Search Drivers | Voyagees",
  description:
    "Find trusted private drivers for your journey across Sri Lanka with Voyagees.",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div>
          Loading drivers...
        </div>
      }
    >
      <SearchDrivers locale="en" />
    </Suspense>
  );
}
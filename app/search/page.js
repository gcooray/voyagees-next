import { Suspense } from "react";

import SearchDrivers from "@/components/SearchDrivers";


export const metadata = {
  title: "Search Drivers | Voyagees",
};


export default function SearchPage(){

  return (

    <Suspense
      fallback={
        <div>
          Loading drivers...
        </div>
      }
    >

      <SearchDrivers />

    </Suspense>

  );

}
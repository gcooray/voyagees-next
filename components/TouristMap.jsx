"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { usePathname, useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";

import { touristDestinations } from "@/data/touristDestinations";
import { touristDestinationsFr } from "@/data/touristDestinationsFr";

// ---------------- ICON CREATION ----------------
const createIcon = (iconUrl) => {
  if (typeof window === "undefined") return null;

  const L = require("leaflet");

  return new L.Icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};


const getDefaultIcon = () => {
  if (typeof window === "undefined") return null;

  const L = require("leaflet");

  return new L.Icon.Default();
};


// ---------------- ICONS ----------------
const icons = {
  city: createIcon("/images/icon-city.png"),
  heritage: createIcon("/images/icon-heritage.png"),
  national_park: createIcon("/images/icon-park.png"),
  kite_surfing: createIcon("/images/icon-kite-surfing.png"),
  hill_station: createIcon("/images/icon-hill.png"),
  coastal_city: createIcon("/images/icon-beach.png"),
  cultural_city: createIcon("/images/icon-culture.png"),
  default: getDefaultIcon(),
};


// ---------------- BOUNDS ----------------
const sriLankaBounds = [
  [5.7, 79.5],
  [10.1, 82.0],
];


// ---------------- INITIAL VIEW ----------------
function SetInitialView() {
  const map = useMap();

  useEffect(() => {

    const updateView = () => {

      const isMobile =
        window.innerWidth < 768;

      map.setView(
        [7.8731, 80.7718],
        isMobile ? 7 : 8
      );

    };


    updateView();

    window.addEventListener(
      "resize",
      updateView
    );


    return () => {
      window.removeEventListener(
        "resize",
        updateView
      );
    };

  }, [map]);


  return null;
}


// ---------------- COMPONENT ----------------
export default function TouristMap() {

  const router = useRouter();
  const pathname = usePathname();

const isFrench = pathname.startsWith("/fr/");

// ---------------- FILTERS ----------------

const filters = [
  {
    label: isFrench ? "Tous" : "All",
    value: "all",
  },
  {
    label: isFrench ? "Plages" : "Beaches",
    value: "coastal_city",
  },
  {
    label: isFrench ? "Patrimoine" : "Heritage",
    value: "heritage",
  },
  {
    label: isFrench ? "Nature" : "Nature",
    value: "national_park",
  },
  {
    label: isFrench ? "Culture" : "Culture",
    value: "cultural_city",
  },
  {
    label: isFrench ? "Villes" : "Cities",
    value: "city",
  },
];

  const [
    filter,
    setFilter
  ] = useState("all");


  const [
    hovered,
    setHovered
  ] = useState(null);



  const center = useMemo(
    () => [
      7.8731,
      80.7718
    ],
    []
  );



  const filteredDestinations = useMemo(() => {
  const destinations =
    filter === "all"
      ? touristDestinations
      : touristDestinations.filter(
          (d) => d.type === filter
        );

  return destinations.map((destination) => {
    if (!isFrench) {
      return destination;
    }

    const translation =
      touristDestinationsFr[destination.name];

    return {
      ...destination,
      name:
        translation?.name || destination.name,
      description:
        translation?.description ||
        destination.description,
    };
  });
}, [filter, isFrench]);



  const handleNavigate = (slug) => {
    router.push(
      `/destinations/${slug}`
    );
  };



  return (

    <section
      style={{
        padding:"40px 20px",
        background:"#f8fafc"
      }}
    >


      <div
        style={{
          textAlign:"center",
          marginBottom:"20px"
        }}
      >

        <h1>
        {isFrench
          ? "Explorer le Sri Lanka 🇱🇰"
          : "Explore Sri Lanka 🇱🇰"}
      </h1>

      <p>
        {isFrench
          ? "Découvrez des destinations selon vos envies"
          : "Discover destinations based on your interests"}
      </p>

      </div>
      

      <div
        style={{
          textAlign:"center",
          marginBottom:"20px"
        }}
      >

        {
          filters.map((f)=>(

            <button
              key={f.value}
              onClick={() =>
                setFilter(f.value)
              }

              style={{
                margin:"5px",
                padding:"8px 14px",
                borderRadius:"20px",
                border:"1px solid #ccc",
                background:
                  filter === f.value
                  ? "#0070f3"
                  : "white",

                color:
                  filter === f.value
                  ? "white"
                  : "black",

                cursor:"pointer"
              }}
            >

              {f.label}

            </button>

          ))
        }

      </div>




      <div
        style={{
          height:"80vh",
          borderRadius:"20px",
          overflow:"hidden"
        }}
      >

        <MapContainer
  center={center}
  zoom={8}
  minZoom={7}
  maxBounds={sriLankaBounds}
  maxBoundsViscosity={1}
  style={{
    height: "100%",
    width: "100%",
  }}
>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  <SetInitialView />

  {filteredDestinations.map((spot) => (
    <Marker
      key={spot.slug}
      position={[spot.lat, spot.lng]}
      icon={icons[spot.type] || icons.default}
      eventHandlers={{
        mouseover: () => setHovered(spot),
        mouseout: () => setHovered(null),
        click: () => handleNavigate(spot.slug),
      }}
    />
  ))}
</MapContainer>

      </div>





      {
        hovered && (

          <div

            style={{
              position:"fixed",
              top:100,
              left:20,
              width:260,
              background:"white",
              borderRadius:12,
              boxShadow:
                "0 10px 20px rgba(0,0,0,0.2)",
              overflow:"hidden",
              zIndex:9999
            }}

          >

            {
              hovered.heroImage && (

                <img

                  src={
                    hovered.heroImage
                  }


                  alt={
                    hovered.name
                  }


                  style={{
                    width:"100%",
                    height:140,
                    objectFit:"cover"
                  }}

                />

              )
            }



            <div
              style={{
                padding:12
              }}
            >

              <h3>
                {hovered.name}
              </h3>


              <p
                style={{
                  fontSize:13
                }}
              >
                {hovered.description}
              </p>



              <button

                onClick={() =>
                  handleNavigate(
                    hovered.slug
                  )
                }


                style={{
                  width:"100%",
                  padding:8,
                  background:"#0070f3",
                  color:"white",
                  border:"none",
                  borderRadius:8,
                  cursor:"pointer"
                }}

              >

                {isFrench ? "Découvrir" : "Explore"}

              </button>


            </div>


          </div>

        )
      }


    </section>

  );
}
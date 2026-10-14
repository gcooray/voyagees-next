"use client";

import { useState } from "react";

// The driver's photo, or — when there isn't one yet, or the file is
// missing — their initials on a brand-coloured circle. Deliberately not a
// stock face: travellers would take it for the person picking them up.
function initialsOf(name = "") {
  const words = name
    .replace(/^operated by\s+/i, "")
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function DriverAvatar({ driver, className = "", style }) {
  const [failed, setFailed] = useState(false);

  if (!driver.driverPhoto || failed) {
    return (
      <span className={`${className} driver-avatar-initials`} style={style} role="img" aria-label={driver.name}>
        {initialsOf(driver.name)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      style={style}
      src={driver.driverPhoto}
      alt={driver.name}
      onError={() => setFailed(true)}
    />
  );
}

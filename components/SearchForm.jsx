import React from "react";
import "./SearchForm.css";
import LocationAutocomplete from "./LocationAutocomplete";
import { MapPin, CalendarDays, Clock } from "lucide-react";

function generateTimeOptions() {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const hh = hour.toString().padStart(2, "0");
      const mm = min.toString().padStart(2, "0");
      times.push(`${hh}:${mm}`);
    }
  }
  return times;
}

function SearchForm({
  pickup,
  dropoff,
  pickupDate,
  dropoffDate,
  pickupTime,
  dropoffTime,
  passengers,
  setPickup,
  setDropoff,
  setPickupDate,
  setDropoffDate,
  setPickupTime,
  setDropoffTime,
  setPassengers,
  handleSearch,
}) {
  const timeOptions = generateTimeOptions();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minPickupDate = tomorrow.toISOString().split("T")[0];

  const pickupObj = pickupDate ? new Date(pickupDate) : tomorrow;
  const minDropoffDate = pickupObj.toISOString().split("T")[0];

  return (
    <section className="search-hero">
      <div className="search-overlay">
        <div className="form-panel">

          <form onSubmit={handleSearch}>
            {/* <div className="row">
  <div className="form-group with-icon">
    <label>
      <MapPin className="icon" /> Pickup Location
    </label>
    <LocationAutocomplete value={pickup} onChange={setPickup} />
  </div>

  <div className="form-group with-icon">
    <label>
      <MapPin className="icon" /> Dropoff Location
    </label>
    <LocationAutocomplete value={dropoff} onChange={setDropoff} />
  </div>
</div> */}

<div className="row">

  <div className="form-group small">
    <label>
      Passengers
    </label>

    <select
      value={passengers}
      onChange={(e) => setPassengers(e.target.value)}
      required
    >
      <option value="" disabled>
        Select passengers
      </option>

      {Array.from({ length: 12 }, (_, index) => {
        const number = index + 1;

        return (
          <option key={number} value={number}>
            {number} {number === 1 ? "Passenger" : "Passengers"}
          </option>
        );
      })}
    </select>
  </div>

</div>

            <div className="row">
              <div className="form-group small with-icon">
                <label>
                  <CalendarDays className="icon" /> Pickup Date
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={minPickupDate}
                  required
                />
              </div>

              <div className="form-group small with-icon">
                <label>
                  <Clock className="icon" /> Pickup Time
                </label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  required
                >
                  <option value="" disabled>Select time</option>
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div className="form-group small with-icon">
                <label>
                  <CalendarDays className="icon" /> Drop-off Date
                </label>
                <input
                  type="date"
                  value={dropoffDate}
                  onChange={(e) => setDropoffDate(e.target.value)}
                  min={minDropoffDate}
                  required
                />
              </div>

              <div className="form-group small with-icon">
                <label>
                  <Clock className="icon" /> Drop-off Time
                </label>
                <select
                  value={dropoffTime}
                  onChange={(e) => setDropoffTime(e.target.value)}
                  required
                >
                  <option value="" disabled>Select time</option>
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="btn-submit">FIND MY DRIVER</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;

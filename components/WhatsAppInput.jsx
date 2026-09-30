"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  getCountries,
  getCountryCallingCode,
  getExampleNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import examples from "libphonenumber-js/mobile/examples";
import "./WhatsAppInput.css";

// WhatsApp number field used by every request form: a country-code picker
// plus the local number, validated per country and reported to the parent
// as one international string ("+33 6 12 34 56 78") — the format WhatsApp
// and the admin emails need. An invalid number blocks the surrounding
// form's native submit via setCustomValidity, so the forms themselves
// need no extra checks.

const STRINGS = {
  en: {
    country: "Country code",
    number: "WhatsApp number",
    invalid: "Please enter a valid WhatsApp number for the selected country.",
  },
  fr: {
    country: "Indicatif du pays",
    number: "Numéro WhatsApp",
    invalid: "Veuillez saisir un numéro WhatsApp valide pour le pays sélectionné.",
  },
};

function flagOf(iso) {
  return iso.replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

// First region in the browser's language list (e.g. "fr-FR" → FR); only
// runs client-side, after mount, to avoid a hydration mismatch.
const subscribeNoop = () => () => {};

function guessCountry(fallback) {
  const countries = new Set(getCountries());
  for (const tag of navigator.languages || [navigator.language]) {
    const region = tag?.split("-")[1]?.toUpperCase();
    if (region && countries.has(region)) return region;
  }
  return fallback;
}

export default function WhatsAppInput({
  value,
  onChange,
  required = false,
  locale = "en",
  placeholder,
  id,
}) {
  const t = STRINGS[locale] || STRINGS.en;
  const fallbackCountry = locale === "fr" ? "FR" : "GB";

  // null = not chosen yet: follow the browser's region (read without a
  // hydration mismatch — the server snapshot is the locale fallback)
  const [chosenCountry, setCountry] = useState(() => {
    const parsed = value ? parsePhoneNumberFromString(value) : null;
    return parsed?.country || null;
  });
  const guessedCountry = useSyncExternalStore(
    subscribeNoop,
    () => guessCountry(fallbackCountry),
    () => fallbackCountry
  );
  const country = chosenCountry || guessedCountry;

  const [national, setNational] = useState(() => {
    const parsed = value ? parsePhoneNumberFromString(value) : null;
    return parsed ? parsed.formatNational() : "";
  });
  const inputRef = useRef(null);

  // parent reset its form (e.g. "send another message") — adjust state
  // during render rather than in an effect
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    if (!value && national) setNational("");
  }

  // Country names come from the runtime's Intl data, which differs between
  // Node and browsers (e.g. "Falkland Islands (Islas Malvinas)"), so the
  // full list is only rendered once hydrated — the server renders just the
  // selected code.
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);

  const options = useMemo(() => {
    let names;
    try {
      names = new Intl.DisplayNames([locale], { type: "region" });
    } catch {
      names = null;
    }
    return getCountries()
      .map((iso) => ({
        iso,
        code: getCountryCallingCode(iso),
        name: names?.of(iso) || iso,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, locale));
  }, [locale]);

  const emit = (nextCountry, nextNational) => {
    const digits = nextNational.replace(/[^\d]/g, "");
    let valid = !digits && !required;
    let out = "";

    if (digits) {
      const parsed = parsePhoneNumberFromString(nextNational, nextCountry);
      valid = Boolean(parsed?.isValid());
      out = valid
        ? parsed.formatInternational()
        : `+${getCountryCallingCode(nextCountry)} ${digits}`;
    }

    inputRef.current?.setCustomValidity(valid || !digits ? "" : t.invalid);
    onChange(out);
  };

  const handleNumber = (e) => {
    let next = e.target.value;
    let nextCountry = country;

    // a full international number typed or pasted: switch the country to match
    const trimmed = next.trim();
    if (trimmed.startsWith("+") || trimmed.startsWith("00")) {
      const parsed = parsePhoneNumberFromString(trimmed.replace(/^00/, "+"));
      if (parsed?.country) {
        nextCountry = parsed.country;
        next = parsed.formatNational();
        setCountry(nextCountry);
      }
    }

    setNational(next);
    emit(nextCountry, next);
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
    emit(e.target.value, national);
  };

  const example = getExampleNumber(country, examples)?.formatNational();

  return (
    <span className="wa-input">
      <span className="wa-country">
        <span className="wa-country-display" aria-hidden="true">
          {flagOf(country)} +{getCountryCallingCode(country)}
          <span className="wa-caret">▾</span>
        </span>
        <select value={country} onChange={handleCountry} aria-label={t.country}>
          {hydrated ? (
            options.map((o) => (
              <option key={o.iso} value={o.iso}>
                {flagOf(o.iso)} {o.name} (+{o.code})
              </option>
            ))
          ) : (
            <option value={country}>
              {flagOf(country)} +{getCountryCallingCode(country)}
            </option>
          )}
        </select>
      </span>

      <input
        ref={inputRef}
        id={id}
        className="wa-number"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        required={required}
        aria-label={t.number}
        placeholder={placeholder || example || t.number}
        value={national}
        onChange={handleNumber}
      />
    </span>
  );
}

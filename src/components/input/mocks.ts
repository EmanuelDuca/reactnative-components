export function useLocalizationContext() {
  return {
    t: (key) => key, // just returns the key for display
    formatNumber: (num) => `${num}`, // formats numbers as strings
    getErrorV2: (err) => "Mock error", // fallback error message
  };
}

export function useOrganization() {
  return { locale: "dk" }; // mock Denmark locale
}

export function useComplexSearch() {
  const [searchString, setSearchString] = React.useState("");
  return {
    searchString,
    search: setSearchString,
    clearSearch: () => setSearchString(""),
    results: [
      { id: "1", name: "Demo Complex 1", prepaidMonths: 1, depositMonths: 2 },
      { id: "2", name: "Demo Complex 2", prepaidMonths: 2, depositMonths: 3 },
    ],
  };
}

export function getPrepaidMonthsText(t, months) {
  return `${months} month${months !== 1 ? "s" : ""} rent`;
}

export function getDepositMonthsText(t, months) {
  return `${months} month${months !== 1 ? "s" : ""} rent`;
}

export function merge(target, ...sources) {
  sources.forEach((source) => {
    if (source && typeof source === "object") {
      Object.keys(source).forEach((key) => {
        if (
          source[key] &&
          typeof source[key] === "object" &&
          !Array.isArray(source[key])
        ) {
          if (!target[key]) target[key] = {};
          merge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      });
    }
  });
  return target;
}

export function isEmpty(value) {
  if (value == null) return true;
  if (typeof value === "string" || Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }
  return false;
}

// =====================================================
// Country Coordinates Data
// =====================================================
// Shared coordinates data for map positioning
// Split from WorldMap for better code splitting
// =====================================================

export interface CountryPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Country coordinates for positioning on SVG map
export const countryCoordinates: Record<string, CountryPosition> = {
  USA: { x: 150, y: 200, width: 80, height: 50 },
  CAN: { x: 150, y: 140, width: 80, height: 60 },
  MEX: { x: 100, y: 250, width: 60, height: 40 },
  BRA: { x: 220, y: 380, width: 80, height: 60 },
  ARG: { x: 220, y: 440, width: 60, height: 40 },
  GBR: { x: 450, y: 180, width: 30, height: 40 },
  FRA: { x: 460, y: 200, width: 35, height: 45 },
  DEU: { x: 480, y: 180, width: 35, height: 40 },
  ITA: { x: 480, y: 220, width: 30, height: 50 },
  ESP: { x: 460, y: 240, width: 40, height: 35 },
  NLD: { x: 470, y: 170, width: 25, height: 30 },
  SWE: { x: 480, y: 140, width: 40, height: 40 },
  CHE: { x: 470, y: 190, width: 20, height: 30 },
  BEL: { x: 465, y: 185, width: 20, height: 25 },
  POL: { x: 500, y: 180, width: 40, height: 35 },
  RUS: { x: 550, y: 140, width: 150, height: 80 },
  CHN: { x: 700, y: 220, width: 120, height: 80 },
  JPN: { x: 800, y: 220, width: 40, height: 60 },
  KOR: { x: 790, y: 200, width: 30, height: 40 },
  IND: { x: 650, y: 280, width: 70, height: 80 },
  IDN: { x: 700, y: 360, width: 80, height: 30 },
  AUS: { x: 750, y: 450, width: 100, height: 60 },
  SAU: { x: 550, y: 280, width: 60, height: 50 },
  TUR: { x: 520, y: 240, width: 50, height: 40 },
  EGY: { x: 500, y: 300, width: 40, height: 40 },
  ZAF: { x: 520, y: 440, width: 40, height: 60 },
  NGA: { x: 480, y: 340, width: 40, height: 40 },
  SGP: { x: 710, y: 320, width: 15, height: 20 },
  THA: { x: 710, y: 300, width: 30, height: 25 }
};

// Get country position by code
export const getCountryPosition = (countryCode: string): CountryPosition | null => {
  return countryCoordinates[countryCode] || null;
};

// Get all available country codes
export const getAvailableCountries = (): string[] => {
  return Object.keys(countryCoordinates);
};

// Get coordinates for multiple countries
export const getCountriesPositions = (countryCodes: string[]): Record<string, CountryPosition> => {
  const positions: Record<string, CountryPosition> = {};
  countryCodes.forEach(code => {
    const position = getCountryPosition(code);
    if (position) {
      positions[code] = position;
    }
  });
  return positions;
};
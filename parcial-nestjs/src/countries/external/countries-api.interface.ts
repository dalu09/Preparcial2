export interface CountriesAPI {
  getCountryByCode(code: string): Promise<{
    code: string;
    name: string;
    region: string;
    subregion: string;
    capital: string;
    population: number;
    flagUrl: string;
  } | null>;
}

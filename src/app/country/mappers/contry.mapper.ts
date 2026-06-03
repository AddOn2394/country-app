import { Country } from "@country/interfaces/country.interface";
import { RESTCountry } from "@country/interfaces/rest-country.interface";

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry, language: string): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.name.nativeName[language]?.common ?? restCountry.name.common,
      capital: restCountry.capital?.join(', '),
      population: restCountry.population,
      region: restCountry.region,
      subregion: restCountry.subregion,
    };
  }

  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[], language: string): Country[] {
    return restCountries.map(restCountry => this.mapRestCountryToCountry(restCountry, language));
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '@country/interfaces/country.interface';
import { RESTCountry } from '@country/interfaces/rest-country.interface';
import { CountryMapper } from '@country/mappers/contry.mapper';
import { map, Observable, catchError, throwError, delay } from 'rxjs';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);


  searchByCapital(query: string, language: string): Observable<Country[]> {
    query = query.trim().toLowerCase();

    
    return this.http
    .get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries, language)),
      catchError((err) => {
        console.log(err);
         return throwError(() => new Error(`No se encontró ningún país con esa capital ${query}`));
      })
    );
  }

  searchByCountry(query: string, language: string): Observable<Country[]> {
    query = query.trim().toLowerCase();
    return this.http
    .get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries, language)),
      delay(2000),
      catchError((err) => {
        console.log(err);
         return throwError(() => new Error(`No se encontró ningún país con ese nombre ${query}`));
      })
    );
  }

  searchCountryByAlphaCode(code: string, language: string) {
    code = code.trim().toLowerCase();

    return this.http
    .get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
    .pipe(
      map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries, language)),
      map( countries => countries.at(0) ),
      catchError((err) => {
        console.log(err);
         return throwError(() => new Error(`No se encontró ningún país con ese código ${code}`));
      })
    );
  }
}

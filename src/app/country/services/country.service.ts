import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '@country/interfaces/rest-country.interface';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { Country } from '@country/interfaces/country.interface';
import { CountryMapper } from '@country/mappers/contry.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  searchByCapital(query: string, language: string): Observable<Country[]> {
    query = query.trim().toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    console.log('Realizando petición HTTP para capital:', query);
    return this.http
    .get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries, language)),
      tap( countries => this.queryCacheCapital.set(query, countries) ),
      catchError((err) => {
        console.log(err);
         return throwError(() => new Error(`No se encontró ningún país con esa capital ${query}`));
      })
    );
  }

  searchByCountry(query: string, language: string): Observable<Country[]> {
    query = query.trim().toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    console.log('Realizando petición HTTP para país:', query);
    return this.http
    .get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries, language)),
      tap( countries => this.queryCacheCountry.set(query, countries) ),
      delay(2000),
      catchError((err) => {
        console.log(err);
         return throwError(() => new Error(`No se encontró ningún país con ese nombre ${query}`));
      })
    );
  }

  searchByRegion(region: string, language: string): Observable<Country[]> {
    region = region.trim().toLowerCase();

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    console.log('Realizando petición HTTP para región:', region);
    return this.http
    .get<RESTCountry[]>(`${API_URL}/region/${region}`)
    .pipe(
      map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries, language)),
      tap( countries => this.queryCacheRegion.set(region, countries) ),
      catchError((err) => {
        console.log(err);
         return throwError(() => new Error(`No se encontró ningún país con esa región ${region}`));
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

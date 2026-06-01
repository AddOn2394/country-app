import { Component, inject, resource, signal } from '@angular/core';
import { CountrySearch } from '../../components/country-search/country-search';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '@country/services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'by-country-page',
  imports: [CountrySearch, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {
  countryService = inject(CountryService);
  query = signal('');


  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {

      if (params.query.trim() === '') {
        return of([]);
      }

      return this.countryService.searchByCountry(params.query, 'spa');
    },
    // Opcional pero recomendado: define un estado inicial para evitar 'undefined'
    defaultValue: []
  });
  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async({ params }) => {

  //     if (params.query.trim() === '') return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(params.query, 'spa')
  //     );
  //   },
  // })

  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if (this.isLoading()) return;
  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCountry(query, 'spa').subscribe({
  //     next: (countries) => {
  //       this.countries.set(countries);
  //       this.isLoading.set(false);
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(`No se encontró ningún país con ese nombre ${query}`);
  //       console.log(err);
  //     },
  //   });
  // }


}

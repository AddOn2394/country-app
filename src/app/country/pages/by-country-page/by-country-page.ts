import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountrySearch } from '../../components/country-search/country-search';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '@country/services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-country-page',
  imports: [CountrySearch, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {
  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal<string>(() => this.queryParam);

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {

      if (params.query.trim() === '') {
        return of([]);
      }

      this.router.navigate(['/country/by-country'], { queryParams: { query: params.query } });
      return this.countryService.searchByCountry(params.query, 'spa');
    },
    // Opcional pero recomendado: define un estado inicial para evitar 'undefined'
    defaultValue: []
  });

}

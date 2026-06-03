import { CountrySearch } from '../../components/country-search/country-search';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '@country/services/country.service';
import { Component, inject, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'by-capital-page',
  imports: [CountrySearch, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
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
      this.router.navigate(['/country/by-capital'], { queryParams: { query: params.query } });
      return this.countryService.searchByCapital(params.query, 'spa');
    },
    // Opcional pero recomendado: define un estado inicial para evitar 'undefined'
    defaultValue: []
  });

}

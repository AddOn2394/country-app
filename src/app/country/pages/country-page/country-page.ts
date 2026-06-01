import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '@country/services/country.service';
import { map } from 'rxjs';
import { NotFound } from '../../../shared/components/footer/not-found/not-found';
import { CountryInformation } from "./country-information/country-information";

@Component({
  selector: 'country-page',
  imports: [NotFound, CountryInformation],
  templateUrl: './country-page.html',
})
export class CountryPage {
  // query = toSignal(inject(ActivatedRoute).params.pipe(map(params => params['code'])));  ;


  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);
  countryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({ params }) => {
      return this.countryService.searchCountryByAlphaCode(params.code, 'es');
    },
  });
}

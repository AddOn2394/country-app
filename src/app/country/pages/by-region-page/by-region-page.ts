import { Region } from '@country/interfaces/region.interface';
import { Component, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '@country/services/country.service';
import { of } from 'rxjs';
import { CountryList } from "@country/components/country-list/country-list";
import { ActivatedRoute, Router, RouterLinkActive } from "@angular/router";


function validateQueryParam(queryParam: string ): Region {
  queryParam = queryParam.trim().toLowerCase();
  const validRegions: Record<string, Region> = { africa: 'Africa', americas: 'Americas', asia: 'Asia', europe: 'Europe', oceania: 'Oceania', antarctic: 'Antarctic' };
  return validRegions[queryParam] ?? 'Africa';
}

@Component({
  selector: 'by-region-page',
  templateUrl: './by-region-page.html',
  imports: [CountryList, RouterLinkActive],
})
export class ByRegionPage {
  public regions: Region[] = [ 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic', ];
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  query = linkedSignal<string>(() => this.queryParam);
  countryService = inject(CountryService);
  selectedRegion = linkedSignal<Region>(() => validateQueryParam(this.queryParam));

  countryResource = rxResource({
    params: () => ({ query: this.selectedRegion() ?? '' }),
    stream: ({ params }) => {

      if (params.query.trim() === '') {
         return of([]);
       }
        this.router.navigate(['/country/by-region'], { queryParams: { region: params.query } });
        return this.countryService.searchByRegion(params.query, 'spa');
     },
     // Opcional pero recomendado: define un estado inicial para evitar 'undefined'
     defaultValue: []
   });

}



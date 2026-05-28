import { Component } from '@angular/core';
import { CountrySearch } from "../../components/country-search/country-search";
import { CountryList } from "../../components/country-list/country-list";

@Component({
  selector: 'by-country-page',
  imports: [CountrySearch, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {}

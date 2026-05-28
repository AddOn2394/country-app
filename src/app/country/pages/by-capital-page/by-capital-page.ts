import { Component } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountrySearch } from '../../components/country-search/country-search';

@Component({
  selector: 'by-capital-page',
  imports: [CountrySearch, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
}

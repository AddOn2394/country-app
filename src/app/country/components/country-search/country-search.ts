import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search',
  imports: [],
  templateUrl: './country-search.html',
})
export class CountrySearch {
  placeholder = input<string>('Buscar...');
  value = output<string>();

  onSearch(value: string) {
    this.value.emit(value);
    console.log(value);
  }
}

import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search',
  imports: [],
  templateUrl: './country-search.html',
})
export class CountrySearch {
  placeholder = input<string>('Buscar...');
  value = output<string>();
  inputValue = signal<string>('');
  debounceTime = input<number>(500);


  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => clearTimeout(timeout));

  });

  onSearch(value: string) {
    this.value.emit(value);
  }
}

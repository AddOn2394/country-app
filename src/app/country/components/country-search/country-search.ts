import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search',
  imports: [],
  templateUrl: './country-search.html',
})
export class CountrySearch {
  placeholder = input<string>('Buscar...');
  value = output<string>();
  initialValue = input<string>('');
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');
  debounceTime = input<number>(1000);


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

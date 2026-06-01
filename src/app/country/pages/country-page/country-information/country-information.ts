import { DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Country } from '@country/interfaces/country.interface';

@Component({
  selector: 'country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.html',
})
export class CountryInformation {
  country = input.required<Country>();
  currentYear = computed(() => new Date().getFullYear());
}

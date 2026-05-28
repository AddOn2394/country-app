import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'country-page',
  imports: [],
  templateUrl: './country-page.html',
})
export class CountryPage {
  query = toSignal(inject(ActivatedRoute).params.pipe(map(params => params['code'])));  ;
  constructor() {
    console.log(this.query());
  }

}

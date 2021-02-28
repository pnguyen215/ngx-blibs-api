import { Component, OnInit } from '@angular/core';
import { BlibsDevToastrService } from './blibs/blibs-dev-toastr.service';

@Component({
  selector: 'lib-ngx-blibs-api',
  template: `
    <p>
      ngx-blibs-api works!
    </p>
    <button (click)='clickInfo()'> Click me </button>
  `,
  styles: []
})
export class NgxBlibsApiComponent implements OnInit {

  constructor(
    private blibsDevToastrService: BlibsDevToastrService
  ) { }

  ngOnInit() {
  }

  clickInfo() {
    this.blibsDevToastrService.showInfo('Greetting...', 'Info');
  }

}

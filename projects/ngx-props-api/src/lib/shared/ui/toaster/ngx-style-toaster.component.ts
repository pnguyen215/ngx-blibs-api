import { Component, OnInit } from '@angular/core';
import { NgxToasterBuilderService } from '../../../services/ngx-toaster-builder.service';

@Component({
  selector: 'lib-ngx-style-toaster',
  templateUrl: './ngx-style-toaster.component.html',
  styleUrls: ['./ngx-style-toaster.component.scss']
})
export class NgxStyleToasterComponent implements OnInit {

  constructor(
    public toasterService: NgxToasterBuilderService
  ) { }

  ngOnInit(): void {
  }

}

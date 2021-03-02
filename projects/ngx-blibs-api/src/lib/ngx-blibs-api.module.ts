import { NgModule } from '@angular/core';
import { BlibsHttpBaseService } from './blibs/blibs-http-base.service';
import { BlibsDevToastrService } from './blibs/blibs-dev-toastr.service';
import { BlibsHttpBaseImplService } from './blibs/impls/blibs-http-base-impl.service';
import { BlibsDevToastrImplService } from './blibs/impls/blibs-dev-toastr-impl.service';
import { NgxBlibsApiComponent } from './ngx-blibs-api.component';
import { BlibsAlertComponent } from './blibs_unit/blibs-alert/blibs-alert.component';
import { BlibsAlertService } from './blibs/blibs-alert.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BlibsStorageService } from './blibs/blibs-storage.service';
@NgModule({
  declarations: [
    NgxBlibsApiComponent,
    BlibsAlertComponent,
  ],
  exports: [
    NgxBlibsApiComponent,
    BlibsAlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    BlibsAlertService,
    BlibsStorageService,
    {
      provide: BlibsHttpBaseService,
      useClass: BlibsHttpBaseImplService
    },
    {
      provide: BlibsDevToastrService,
      useClass: BlibsDevToastrImplService
    }
  ]
})
export class NgxBlibsApiModule { }

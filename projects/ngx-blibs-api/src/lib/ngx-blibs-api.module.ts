import { ModuleWithProviders, NgModule } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { BlibsToastComponent } from './blibs_unit/blibs-toast/blibs-toast.component';
import { NgxBlibsApiService } from './ngx-blibs-api.service';
import { BlibsAuthenticationService } from './blibs/blibs-authentication.service';
import { BlibsAuthenticationImplService } from './blibs/impls/blibs-authentication-impl.service';
import { BlibsToastService } from './blibs/blibs-toast.service';
@NgModule({
  declarations: [
    NgxBlibsApiComponent,
    BlibsAlertComponent,
    BlibsToastComponent
  ],
  exports: [
    NgxBlibsApiComponent,
    BlibsAlertComponent,
    BlibsToastComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class NgxBlibsApiModule {
  public static forRoot(): ModuleWithProviders {

    return {
      ngModule: NgxBlibsApiModule,
      providers: [
        NgxBlibsApiService,
        BlibsAlertService,
        BlibsStorageService,
        BlibsToastService,
        {
          provide: BlibsHttpBaseService,
          useClass: BlibsHttpBaseImplService
        },
        {
          provide: BlibsDevToastrService,
          useClass: BlibsDevToastrImplService
        },
        {
          provide: BlibsAuthenticationService,
          useClass: BlibsAuthenticationImplService
        }
      ]
    };
  }


}

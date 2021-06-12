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
import { BlibsToastService } from './blibs/blibs-toast.service';
import { BlibsCacheService } from './blibs/blibs-cache.service';
import { BlibsCacheImplService } from './blibs/impls/blibs-cache-impl.service';
import { BlibsErrorService } from './blibs/blibs-error.service';
import { BlibsLogReqService } from './blibs/blibs-log-req.service';
import { BlibsLogReqComponent } from './blibs_unit/blibs-log-req/blibs-log-req.component';
import { BlibsBaseUtilsService } from './blibs/blibs-base-utils.service';
import { BlibsCollectionUtilsService } from './blibs/blibs-collection-utils.service';

@NgModule({
  declarations: [
    NgxBlibsApiComponent,
    BlibsAlertComponent,
    BlibsToastComponent,
    BlibsLogReqComponent
  ],
  exports: [
    NgxBlibsApiComponent,
    BlibsAlertComponent,
    BlibsToastComponent,
    BlibsLogReqComponent,
  ],
  entryComponents: [BlibsLogReqComponent],
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
        BlibsErrorService,
        BlibsLogReqService,
        BlibsAuthenticationService,
        BlibsBaseUtilsService,
        BlibsCollectionUtilsService,
        {
          provide: BlibsHttpBaseService,
          useClass: BlibsHttpBaseImplService
        },
        {
          provide: BlibsDevToastrService,
          useClass: BlibsDevToastrImplService
        },
        {
          provide: BlibsCacheService,
          useClass: BlibsCacheImplService
        }
      ]
    };
  }


}

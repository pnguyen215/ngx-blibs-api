import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxPropsApiComponent } from './ngx-props-api.component';
import { NgxPropsApiService } from './ngx-props-api.service';
import { NgxCacheHandlerService } from './services/handler/ngx-cache-handler.service';
import { NgxToasterHandlerService } from './services/handler/ngx-toaster-handler.service';
import { NgxAlertService } from './services/ngx-alert.service';
import { NgxCacheService } from './services/ngx-cache.service';
import { NgxRequestStickService } from './services/ngx-request-stick.service';
import { NgxStoragesService } from './services/ngx-storages.service';
import { NgxToasterBuilderService } from './services/ngx-toaster-builder.service';
import { NgxToasterService } from './services/ngx-toaster.service';



@NgModule({
  declarations: [
    NgxPropsApiComponent
  ],
  imports: [

  ],
  exports: [
    NgxPropsApiComponent
  ]
})
export class NgxPropsApiModule {

  public static forRoot(): ModuleWithProviders {

    return {
      ngModule: NgxPropsApiModule,
      providers: [
        NgxPropsApiService,
        NgxAlertService,
        NgxStoragesService,
        NgxRequestStickService,
        NgxToasterBuilderService,
        {
          provide: NgxCacheService,
          useClass: NgxCacheHandlerService
        },
        {
          provide: NgxToasterService,
          useClass: NgxToasterHandlerService
        }
      ]
    };
  }


}

import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPropsApiComponent } from './ngx-props-api.component';
import { NgxPropsApiService } from './ngx-props-api.service';
import { NgxAuthorizationHandlerService } from './services/handler/ngx-authorization-handler.service';
import { NgxCacheHandlerService } from './services/handler/ngx-cache-handler.service';
import { NgxToasterHandlerService } from './services/handler/ngx-toaster-handler.service';
import { NgxAlertService } from './services/ngx-alert.service';
import { NgxAuthorizationService } from './services/ngx-authorization.service';
import { NgxCacheService } from './services/ngx-cache.service';
import { NgxCollectionsService } from './services/ngx-collections.service';
import { NgxRequestStickService } from './services/ngx-request-stick.service';
import { NgxStoragesService } from './services/ngx-storages.service';
import { NgxToasterBuilderService } from './services/ngx-toaster-builder.service';
import { NgxToasterService } from './services/ngx-toaster.service';
import { NgxStyleAlertComponent } from './shared/ui/alert/ngx-style-alert.component';
import { NgxStyleToasterComponent } from './shared/ui/toaster/ngx-style-toaster.component';



@NgModule({
  declarations: [
    NgxPropsApiComponent,
    NgxStyleAlertComponent,
    NgxStyleToasterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    NgxPropsApiComponent,
    NgxStyleAlertComponent,
    NgxStyleToasterComponent
  ],
  entryComponents: [
    NgxStyleAlertComponent,
    NgxStyleToasterComponent
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
        NgxCollectionsService,
        {
          provide: NgxCacheService,
          useClass: NgxCacheHandlerService
        },
        {
          provide: NgxToasterService,
          useClass: NgxToasterHandlerService
        },
        {
          provide: NgxAuthorizationService,
          useClass: NgxAuthorizationHandlerService
        }
      ]
    };
  }


}

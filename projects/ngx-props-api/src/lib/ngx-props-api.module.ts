import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxPropsApiComponent } from './ngx-props-api.component';
import { NgxPropsApiService } from './ngx-props-api.service';



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

      ]
    };
  }


}

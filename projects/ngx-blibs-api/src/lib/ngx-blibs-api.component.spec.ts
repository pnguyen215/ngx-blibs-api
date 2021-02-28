import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBlibsApiComponent } from './ngx-blibs-api.component';

describe('NgxBlibsApiComponent', () => {
  let component: NgxBlibsApiComponent;
  let fixture: ComponentFixture<NgxBlibsApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxBlibsApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBlibsApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

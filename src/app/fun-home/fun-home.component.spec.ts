import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunHomeComponent } from './fun-home.component';

describe('FunHomeComponent', () => {
  let component: FunHomeComponent;
  let fixture: ComponentFixture<FunHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

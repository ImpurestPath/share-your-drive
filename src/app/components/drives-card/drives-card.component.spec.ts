import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrivesCardComponent } from './drives-card.component';

describe('DrivesCardsComponent', () => {
  let component: DrivesCardComponent;
  let fixture: ComponentFixture<DrivesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrivesCardComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrivesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

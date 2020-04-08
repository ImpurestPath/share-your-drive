import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrivesPage } from './drives.page';

describe('DrivesPage', () => {
  let component: DrivesPage;
  let fixture: ComponentFixture<DrivesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrivesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrivesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

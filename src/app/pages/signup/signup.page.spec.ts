import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupPage } from './signup.page';
import { UserService } from 'src/app/service/user.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignupPage', () => {
  const userServiceMock = jasmine.createSpyObj('userService', [
    'userDataSubject',
  ]);
  userServiceMock.userDataSubject.and.returnValue(
    jasmine.createSpyObj('userDataSubject', ['value'])
  );
  userServiceMock.userDataSubject().value.and.returnValue({ uid: undefined });
  let component: SignupPage;
  let fixture: ComponentFixture<SignupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupPage],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [{ provide: UserService, useValue: userServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

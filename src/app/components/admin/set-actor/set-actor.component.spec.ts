import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetActorComponent } from './set-actor.component';

describe('SetActorComponent', () => {
  let component: SetActorComponent;
  let fixture: ComponentFixture<SetActorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetActorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

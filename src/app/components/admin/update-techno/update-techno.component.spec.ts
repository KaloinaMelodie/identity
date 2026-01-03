import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTechnoComponent } from './update-techno.component';

describe('UpdateTechnoComponent', () => {
  let component: UpdateTechnoComponent;
  let fixture: ComponentFixture<UpdateTechnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateTechnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTechnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

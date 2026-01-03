import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTechnoComponent } from './create-techno.component';

describe('CreateTechnoComponent', () => {
  let component: CreateTechnoComponent;
  let fixture: ComponentFixture<CreateTechnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTechnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTechnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

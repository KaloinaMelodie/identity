import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTechnoComponent } from './list-techno.component';

describe('ListTechnoComponent', () => {
  let component: ListTechnoComponent;
  let fixture: ComponentFixture<ListTechnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTechnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTechnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

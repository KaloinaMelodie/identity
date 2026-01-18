import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAwardComponent } from './list-award.component';

describe('ListAwardComponent', () => {
  let component: ListAwardComponent;
  let fixture: ComponentFixture<ListAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAwardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

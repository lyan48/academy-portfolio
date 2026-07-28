import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jewelry } from './jewelry';

describe('Jewelry', () => {
  let component: Jewelry;
  let fixture: ComponentFixture<Jewelry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jewelry],
    }).compileComponents();

    fixture = TestBed.createComponent(Jewelry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

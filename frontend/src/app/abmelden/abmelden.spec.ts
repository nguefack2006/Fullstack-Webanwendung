import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Abmelden } from './abmelden';

describe('Abmelden', () => {
  let component: Abmelden;
  let fixture: ComponentFixture<Abmelden>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Abmelden],
    }).compileComponents();

    fixture = TestBed.createComponent(Abmelden);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

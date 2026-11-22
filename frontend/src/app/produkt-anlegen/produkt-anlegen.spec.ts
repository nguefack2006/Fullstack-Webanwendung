import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProduktAnlegen } from './produkt-anlegen';

describe('ProduktAnlegen', () => {
  let component: ProduktAnlegen;
  let fixture: ComponentFixture<ProduktAnlegen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduktAnlegen],
    }).compileComponents();

    fixture = TestBed.createComponent(ProduktAnlegen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

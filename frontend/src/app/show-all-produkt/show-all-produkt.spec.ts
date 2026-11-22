import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowAllProdukt } from './show-all-produkt';

describe('ShowAllProdukt', () => {
  let component: ShowAllProdukt;
  let fixture: ComponentFixture<ShowAllProdukt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAllProdukt],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowAllProdukt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

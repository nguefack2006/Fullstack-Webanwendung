import { ComponentFixture, TestBed } from '@angular/core/testing';
import { wareneingang } from './wareneingang';

describe('Wareneingang', () => {
  let component: wareneingang;
  let fixture: ComponentFixture<wareneingang>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [wareneingang],
    }).compileComponents();

    fixture = TestBed.createComponent(wareneingang);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { warenausgang } from './warenausgang';

describe('warenausgang', () => {
  let component: warenausgang;
  let fixture: ComponentFixture<warenausgang>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [warenausgang],
    }).compileComponents();

    fixture = TestBed.createComponent(warenausgang);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

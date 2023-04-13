import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePageComponent } from './save-page.component';

describe('SavePageComponent', () => {
  let component: SavePageComponent;
  let fixture: ComponentFixture<SavePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

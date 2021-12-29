import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBiddersComponent } from './search-bidders.component';

describe('SearchBiddersComponent', () => {
  let component: SearchBiddersComponent;
  let fixture: ComponentFixture<SearchBiddersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBiddersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBiddersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionAsAuctioneerComponent } from './auction-as-auctioneer.component';

describe('AuctionAsAuctioneerComponent', () => {
  let component: AuctionAsAuctioneerComponent;
  let fixture: ComponentFixture<AuctionAsAuctioneerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionAsAuctioneerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionAsAuctioneerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

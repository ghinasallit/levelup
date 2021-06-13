import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CarouselComponent} from './carousel.component';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {TranslateTestingModule} from 'ngx-translate-testing';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SlickCarouselModule, TranslateTestingModule],
      declarations: [CarouselComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

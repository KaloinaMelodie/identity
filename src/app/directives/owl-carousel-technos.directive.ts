import { Directive, ElementRef, Input, NgZone, OnChanges, SimpleChanges } from '@angular/core';

declare const $: any;

@Directive({
  selector: '[appOwlCarouselTechnos]',
  standalone:false
})
export class OwlCarouselTechnosDirective implements OnChanges {
  @Input() owlItemsCount = 0;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['owlItemsCount']) {
      this.reInit();
    }
  }

  private reInit(): void {
    setTimeout(() => {
      this.zone.runOutsideAngular(() => {
        const $c = $(this.el.nativeElement);

        if (!$c.length) return;

        if ($c.data('owl.carousel')) {
          $c.trigger('destroy.owl.carousel');
          $c.find('.owl-stage-outer').children().unwrap();
          $c.removeClass('owl-center owl-loaded owl-text-select-on');
        }

        if (this.owlItemsCount <= 0) return;

        $c.owlCarousel({
          animateIn: 'fadeIn',
          animateOut: 'fadeOut',
          items: 1,
          navText: ['<i class="lni lni-chevron-left"></i>','<i class="lni lni-chevron-right"></i>'], 
          smartSpeed: 750,
          dots: false,
          nav: true,
          loop: true
        });
      });
    }, 0);
  }
}

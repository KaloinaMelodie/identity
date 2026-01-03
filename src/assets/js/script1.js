// assets/js/script1.js  (remplace l'IIFE auto-exécutée)
(function (global) {
  'use strict';

  function init(rootEl) {
    var $ = window.jQuery;
    if (!rootEl || !$) return;

    var $root = $(rootEl);

    // --- PRELOADER ---
    // si tu gardes le preloader global au body:
    if ($('.preloader').length) {
      // déclenche-le ici si besoin, sinon garde l'onload global
      $('.preloader').fadeOut('slow');
    }

    // --- MENU (délégation) ---
    $(document).off('click.appMenu')
      .on('click.appMenu', '.a-nav-toggle, .menu-main a', function(){
        if ($('html').hasClass('body-menu-opened')) {
          $('html').removeClass('body-menu-opened').addClass('body-menu-close');
        } else {
          $('html').addClass('body-menu-opened').removeClass('body-menu-close');
        }
      });

    // --- HEADER SHADOW (ré-attache sur les scrollables présents sous root) ---
    $root.find('.pp-scrollable').each(function(){
      var $s = $(this);
      $s.off('scroll.headerShadow').on('scroll.headerShadow', function(){
        if ($s.scrollTop() > 0) $('.header').addClass('header-shadow');
        else $('.header').removeClass('header-shadow');
      });
    });

    // --- PAGEPILING ---
    // if ($.fn.pagepiling) {
    //   var $pp = $root.find('.a-pagepiling');
    //   if ($pp.length && !$pp.data('pp-init')) {
    //     $pp.data('pp-init', true).pagepiling({
    //       scrollingSpeed: 280,
    //       menu: '#menu, #menuMain',
    //       anchors: ['Intro','Services','Projects','Awards','Experience','Clients','Testimonials','Contact'],
    //       loopTop: false,
    //       loopBottom: false,
    //       navigation: { position: 'right' },
    //       onLeave: function(){
    //         $('.header').removeClass('header-shadow');
    //         if ($('.pp-scrollable.active').scrollTop() > 0) $('.header').addClass('header-shadow');
    //         if ($('.slide-dark-footer').hasClass('active')) $('body').addClass('body-copyright-light');
    //         else $('body').removeClass('body-copyright-light');
    //         if ($('.slide-dark-bg').hasClass('active')) $('body').addClass('body-bg-dark');
    //         else $('body').removeClass('body-bg-dark');
    //         $('.a-carousel-projects').trigger('refresh.owl.carousel');
    //       }
    //     });
    //   }
    // }
    // --- PAGEPILING ---
    function syncUiAfterSectionChange() {
  $('.header').removeClass('header-shadow');
  if ($('.pp-scrollable.active').scrollTop() > 0) $('.header').addClass('header-shadow');

  if ($('.slide-dark-footer').hasClass('active')) $('body').addClass('body-copyright-light');
  else $('body').removeClass('body-copyright-light');

  if ($('.slide-dark-bg').hasClass('active')) $('body').addClass('body-bg-dark');
  else $('body').removeClass('body-bg-dark');

  $('.a-carousel-projects').trigger('refresh.owl.carousel');
}
window.syncUiAfterSectionChange = syncUiAfterSectionChange;

if ($.fn.pagepiling) {
  var $pp = $root.find('.a-pagepiling');
  if ($pp.length) {

    // 1) Nettoyage anti-doublons (important en SPA)
    $('#pp-nav').remove();
    $('.pp-slidesNav').remove();

    // 2) Détruire si une instance existe déjà (si supporté)
    try {
      if ($.fn.pagepiling && typeof $.fn.pagepiling.destroy === 'function') {
        $.fn.pagepiling.destroy('all');
      }
    } catch (e) {}

    // 3) Ré-init (ou init unique si tu veux garder ton flag)
    $pp.pagepiling({
      scrollingSpeed: 280,
      menu: '#menu, #menuMain',
      anchors: ['Intro','Services','Projects','Awards','Experience','Clients','Testimonials','Contact'],
      loopTop: false,
      loopBottom: false,
      navigation: { position: 'right' },
      onLeave: function(){
        syncUiAfterSectionChange();
      }
    });
  }
}


    // --- CAROUSELS ---
    if ($.fn.owlCarousel) {
      $root.find('.a-carousel-techno').each(function(){
        var $c = $(this);
        if ($c.data('owl.carousel')) {
          $c.trigger('destroy.owl.carousel');
          $c.find('.owl-stage-outer').children().unwrap();
          $c.removeClass('owl-center owl-loaded owl-text-select-on');
        }
        $c.owlCarousel({
          items: 1,
          navText: ['<i class="lni lni-chevron-left"></i>','<i class="lni lni-chevron-right"></i>'],
          smartSpeed: 750,
          margin: 30,
          dots: false,
          nav: true,
          navContainer: '.a-carousel-nav-techno',
          loop: true
        });
      });

      $root.find('.a-carousel-projects').each(function(){
        var $c = $(this);
        if ($c.data('owl.carousel')) {
          $c.trigger('destroy.owl.carousel');
          $c.find('.owl-stage-outer').children().unwrap();
          $c.removeClass('owl-center owl-loaded owl-text-select-on');
        }
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

      $root.find('.a-carousel-experience').each(function(){
        var $c = $(this);
        if ($c.data('owl.carousel')) {
          $c.trigger('destroy.owl.carousel');
          $c.find('.owl-stage-outer').children().unwrap();
          $c.removeClass('owl-center owl-loaded owl-text-select-on');
        }
        $c.owlCarousel({
          items: 1,
          navText: ['<i class="lni lni-chevron-left"></i>','<i class="lni lni-chevron-right"></i>'],
          smartSpeed: 750,
          margin: 30,
          dots: false,
          nav: true,
          navContainer: '.a-carousel-nav',
          loop: true
        });
      });

      

      $root.find('.a-carousel-testimonial').each(function(){
        var $c = $(this);
        if ($c.data('owl.carousel')) {
          $c.trigger('destroy.owl.carousel');
          $c.find('.owl-stage-outer').children().unwrap();
          $c.removeClass('owl-center owl-loaded owl-text-select-on');
        }
        $c.owlCarousel({
          items: 1,
          navText: ['<i class="lni lni-chevron-left"></i>','<i class="lni lni-chevron-right"></i>'],
          smartSpeed: 750,
          margin: 30,
          dots: false,
          nav: true
        });
      });

    }

    // --- FORMS (validate / material / file input) ---
    // (garde la même logique, mais scope à $root)
    $root.find('.a-file input[type="file"]').off('change.filePath')
      .on('change.filePath', function () {
        var $field = $(this).closest('.a-file');
        var $path = $field.find('input.file-path');
        var files = this.files || [];
        var names = [];
        for (var i = 0; i < files.length; i++) names.push(files[i].name);
        $path.val(names.join(', ')).trigger('change');
      });

    var $material = $root.find('.a-form-group .form-control');
    $material.each(function(){
      if ($(this).val().length > 0 || $(this).attr('placeholder') !== undefined) {
        $(this).closest('.a-form-group').addClass('active');
      }
    });
    $material.off('focus.material blur.material change.material')
      .on('focus.material', function(){ $(this).closest('.a-form-group').addClass('active'); })
      .on('blur.material change.material', function(){
        var $g = $(this).closest('.a-form-group');
        if ($(this).val() === '' && $(this).attr('placeholder') === undefined) $g.removeClass('active');
        else $g.addClass('active');
      });

    if ($.fn.fancybox) $root.find('[data-fancybox]').fancybox();

    if ($.fn.validate) {
      $root.find('.a-ajax-form').each(function(){
        var $form = $(this);
        if ($form.data('jqv-init')) return;
        $form.data('jqv-init', true).validate({
          errorClass: 'error',
          submitHandler: function (form) {
            $.ajax({
              type: 'POST',
              url: 'handler.php',
              data: new FormData(form),
              cache: false,
              contentType: false,
              processData: false,
              success: function () { $form.find('.success-message').show(); },
              error: function () { $form.find('.error-message').show(); }
            });
          }
        });
      });
    }
  


}

  global.AppInit = { init };
})(window);

/*!
 * Template Functions
*/

(function($){

    "use strict";

    /* ---------------------------------------------- /*
     * Preloader
    /* ---------------------------------------------- */

    $(window).on('load', function() {
      if ($('div').is('.page-loader')) {
        $('.page-loader').delay(500).fadeOut(800);
      }
    });

    $(document).ready(function() {

      var header             = $('.navbar-transparent'),
          parallax           = $('.parallax'),
          bloggrid           = $('.card-masonry'),
          background         = $('[data-background]'),
          module_slides      = $('.module-cover-slides'),
          margin_mt          = $('[data-mt]'),
          margin_mb          = $('[data-mb]'),
          progress           = $('.progress-item'),
          counter_timer      = $('.counter-timer'),
          pie_chart          = $('.chart'),
          twitter_feed       = $('.twitter-feed'),
          stiky_sidebar      = $('.sticky-sidebar'),
          map                = $('.map'),
          smoothscroll       = $('.smoothscroll'),
          play_btn           = $('.popup-video-play'),
          gallery            = $('.gallery'),
          shop_gallery       = $('.shop-popup'),
          portfolio_carousel = $('.portfolio-carousel'),
          shop_carousel      = $('.shop-carousel'),
          clients_carousel   = $('.clients-carousel'),
          review_slides      = $('.review-slides'),
          image_slider       = $('.image-slider'),
          popup_code         = $('.popup-code'),
          contact_form       = $('#contact-form');

        const tilt = $('.js-tilt').tilt();
        tilt.tilt({
          maxTilt:   5,
          tiltSpeed: 500
        });

        /* ---------------------------------------------- /*
         * Collapse navbar on click
        /* ---------------------------------------------- */

        $('.input-group-quantity').each(function() {
          var as = $(this).find('.form-quantity');
          $(this).find('.btn-plus').click(function(e){

            var currentVal =  parseInt(as.val());
            as.val(currentVal + 1);
          });
          $(this).find('.btn-minus').click(function(e){
            var currentVal =  parseInt(as.val());
            if (!isNaN(currentVal) && currentVal > 1) {

              as.val(currentVal - 1);
            } else {
              as.val(1);
            }
          });
        });

        /* ---------------------------------------------- /*
         * Header animation
        /* ---------------------------------------------- */

        if(/bg-[\w-]*\b/.test(header.attr("class"))) {
          var bg_class_match = header.attr("class").match(/bg-[\w-]*\b/);
          var bg_class       = bg_class_match[0];
        }

        var navBreakpoint = 991;
        $(window).on("scroll resize", function(e){
          var scroll = $(window).scrollTop();
          var width  = Math.max($(window).width(), window.innerWidth);
          if ((width <= navBreakpoint) && (scroll <= 5)) {
            header.addClass(bg_class);
          } else if (scroll > 5) {
            header.addClass(bg_class);
          } else {
            header.removeClass(bg_class);
          }
        });

        /* ---------------------------------------------- /*
         * Hero Slider
        /* ---------------------------------------------- */

        module_slides.each(function () {
            $(this).superslides($.extend({
                play:            10000,
                animation:       'slide',
                animation_speed: 800,
                pagination:      true,
                scrollable:      true,
            }, $(this).data('module-cover-slides-options')));
        });

        /* ---------------------------------------------- /*
         * Setting background of modules
        /* ---------------------------------------------- */

        parallax.each(function() {
          if ($(this).attr('data-gradient') == 1) {
            $(this).append('<div class="overlay-background overlay-gradient"></div>');
            $(this).find('.overlay-background').css('opacity', $(this).attr('data-overlay'));
          } else if ($(this).attr('data-overlay') > 0) {
            $(this).append('<div class="overlay-background"></div>');
            $(this).find('.overlay-background').css('opacity', $(this).attr('data-overlay'));
          }
        });

        background.each(function() {
          $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
        });

        margin_mt.each(function() {
          $(this).css('margin-top', $(this).attr('data-mt') );
        });

        margin_mb.each(function() {
          $(this).css('margin-bottom', $(this).attr('data-mb') );
        });

        /* ---------------------------------------------- /*
         * Portfolio masonry
        /* ---------------------------------------------- */

        var filters   = $('.filters'),
            worksgrid = $('.row-portfolio');

        $('a', filters).on('click', function() {
          var selector = $(this).attr('data-filter');
          $('.current', filters).removeClass('current');
          $(this).addClass('current');
          worksgrid.isotope({
            filter: selector
          });
          return false;
        });

        $(window).on('resize', function() {
          worksgrid.imagesLoaded(function() {
            worksgrid.isotope({
              layoutMode:         'masonry',
              itemSelector:       '.portfolio-item',
              transitionDuration: '0.4s',
              masonry: {
                columnWidth: '.grid-sizer',
              },
            });
          });
        });

        /* ---------------------------------------------- /*
         * Blog masonry
        /* ---------------------------------------------- */

        $(window).on('resize', function() {
          setTimeout(function() {
            bloggrid.isotope({
              layoutMode:         'masonry',
              transitionDuration: '0.5s',
            });
          }, 1000);
        }).resize();

        /* ---------------------------------------------- /*
         * Carousel/Sliders
        /* ---------------------------------------------- */

        image_slider.each(function () {
          $(this).owlCarousel($.extend({
            dots:       1,
            nav:        1,
            center:     1,
            items:      1,
            loop:       1,
            autoHeight: 0,
            margin:     0,
            navText: [
              '<span class="ti-arrow-left"></span>',
              '<span class="ti-arrow-right"></span>'
            ],
          }, $(this).data('carousel-options')));
        });

        $('.image-carousel').each(function () {
          $(this).owlCarousel($.extend({
            nav:      1,
            dots:     0,
            autoplay: 1,
            items:    1,
            loop:     1,
            margin:   30,
            responsive: {
              768: {
                items: 2
              },
              1025: {
                items: 3
              }
            },
            navText: [
              '<span class="ti-angle-left"></span>',
              '<span class="ti-angle-right"></span>'
            ],
        }, $(this).data('carousel-options')));
      });

        review_slides.each(function () {
          $(this).owlCarousel($.extend({
            autoplay:   5000,
            nav:        1,
            items:      1,
            loop:       1,
            navText: [
              '<span class="ti-arrow-left"></span>',
              '<span class="ti-arrow-right"></span>'
            ],
          }, $(this).data('carousel-options')));
        });

        clients_carousel.each(function () {
          $(this).owlCarousel($.extend({
            nav:      0,
            dots:     1,
            autoplay: 1,
            items:    2,
            loop:     1,
            responsive: {
              768: {
                items: 4
              }
            },
            navText: [
              '<span class="ti-arrow-left"></span>',
              '<span class="ti-arrow-right"></span>'
            ],
          }, $(this).data('carousel-options')));
        });

        shop_carousel.each(function () {
          $(this).owlCarousel($.extend({
            nav:      0,
            dots:     1,
            autoplay: 1,
            items:    1,
            loop:     1,
            margin:   30,
            responsive: {
              768: {
                items: 2
              },
              1025: {
                items: 3
              }
            },
            navText: [
              '<span class="ti-angle-left"></span>',
              '<span class="ti-angle-right"></span>'
            ],
          }, $(this).data('carousel-options')));
        });

        portfolio_carousel.each(function () {
          $(this).owlCarousel($.extend({
            center:     true,
            items:      1,
            loop:       true,
            margin:     50,
            responsive: {
              768: {
                items: 2
              }
            },
            navText: [
              '<span class="ti-angle-left"></span>',
              '<span class="ti-angle-right"></span>'
            ],
          }, $(this).data('carousel-options')));
        });

        /* ---------------------------------------------- /*
         * Popup
        /* ---------------------------------------------- */

        play_btn.magnificPopup({
          type: 'iframe',
        });

        gallery.magnificPopup({
          type: 'image',
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1]
          },
          image: {
            titleSrc: 'title',
            tError: 'The image could not be loaded.',
          }
        });

        shop_gallery.magnificPopup({
          type: 'image',
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1]
          },
          image: {
            titleSrc: 'title',
            tError: 'The image could not be loaded.',
          }
        });

        popup_code.magnificPopup({
          type:           'inline',
          closeBtnInside: true,
        });

        /* ---------------------------------------------- /*
         * Progress bars, counters, pie charts animations
        /* ---------------------------------------------- */

        progress.each(function() {
          $(this).appear(function() {
            var percent = $(this).find('.progress-bar').attr('aria-valuenow');
            $(this).find('.progress-bar').animate({'width' : percent + '%'});
            $(this).find('.progress-number').countTo({
              from: 0,
              to: percent,
              speed: 900,
              refreshInterval: 30
            });
          });
        });

        counter_timer.each(function() {
          $(this).appear(function() {
            var number = $(this).find('strong').attr('data-to');
            $(this).countTo({
              from:            0,
              to:              number,
              speed:           1500,
              refreshInterval: 10,
              formatter: function (number, options) {
                number = number.toFixed(options.decimals);
                number = number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                return number;
              }
            });
          });
        });

        pie_chart.each(function() {
          $(this).appear(function() {
            $(this).easyPieChart($.extend({
              barColor:   '#000000',
              trackColor: '#eeeeee',
              scaleColor: false,
              lineCap:    'round',
              lineWidth:  3,
              size:       150,
            }, $(this).data('chart-options')));
          });
        });

        /* ---------------------------------------------- /*
         * Twitter
        /* ---------------------------------------------- */

        twitter_feed.each(function (index) {
          $(this).attr('id', 'twitter-' + index);
          var twitterID      = $(this).data('twitter');
          var twitterMax     = $(this).data('number');
          var twitter_config = {
            'id':             twitterID,
            'domId':          'twitter-' + index,
            'maxTweets':      twitterMax,
            'enableLinks':    true,
            'showPermalinks': false
          };
          twitterFetcher.fetch(twitter_config);
        });

        /* ---------------------------------------------- /*
         * Sticky Sidebar
        /* ---------------------------------------------- */

        stiky_sidebar.imagesLoaded(function() {
          stiky_sidebar.stick_in_parent({
            offset_top:   75,
            recalc_every: 1
          })
          .on('sticky_kit:bottom', function(e) {
            $(this).parent().css('position', 'relative');
          })
          .on('sticky_kit:unbottom', function(e) {
            $(this).parent().css('position', 'relative');
          }).scroll();
        });

        /* ---------------------------------------------- /*
         * Tooltip
        /* ---------------------------------------------- */

        $(function () {
          $('[data-toggle="tooltip"]').tooltip()
        })

        /* ---------------------------------------------- /*
         * A jQuery plugin for fluid width video embeds
        /* ---------------------------------------------- */

        $('body').fitVids();

        /* ---------------------------------------------- /*
         * Contact form ajax
        /* ---------------------------------------------- */

        contact_form.find('input,textarea').jqBootstrapValidation({
          preventSubmit: true,
          submitError: function($form, event, errors) {
            // additional error messages or events
          },
          submitSuccess: function($form, event) {
            event.preventDefault();
            var submit            = $('submit', contact_form);
            var ajaxResponse      = $('#contact-response');
            var name              = $('[name="name"]', contact_form).val();
            var email             = $('[name="email"]', contact_form).val();
            var subject           = $('[name="subject"]', contact_form).val();
            var message           = $('[name="message"]', contact_form).val();
            $.ajax({
                type: 'POST',
                url: 'assets/php/contact.php',
                dataType: 'json',
                data: {
                  name: name,
                  email: email,
                  subject: subject,
                  message: message,
                },
                cache: false,
                beforeSend: function(result) {
                  submit.empty();
                  submit.append('<i class="fa fa-cog fa-spin"></i> Wait...');
                },
                success: function(result) {
                  if(result.sendstatus == 1) {
                      ajaxResponse.html(result.message);
                      $form.fadeOut(500);
                  } else {
                      ajaxResponse.html(result.message);
                  }
                }
            });
          }
        });

        /* ---------------------------------------------- /*
         * Google Map
        /* ---------------------------------------------- */

        $('.map').each(function() {
          var reg_exp = /\[[^(\]\[)]*\]/g;
          var map_div        = $(this);
          var is_draggable   = Math.max($(window).width(), window.innerWidth) > 736 ? true : false;
          var is_street_view = ( map_div.data('street-view') ) ? true : false;

          if (map_div.length > 0) {
            var markers_addresses = map_div[0].getAttribute('data-addresses').match(reg_exp),
              markers_info      = map_div[0].getAttribute('data-info').match(reg_exp),
              markers_icon      = map_div.data('icon'),
              map_zoom          = map_div.data('zoom'),
              map_styles        = map_div.data('styles');

            var	markers_values = [], map_center;

            markers_addresses.forEach( function(marker_address, index) {
              var marker_value = '{'
              marker_value    += '"latLng":' + marker_address;
              if (index == 0) {
                map_center = JSON.parse(marker_address);
              };
              if (markers_info[index]) {
                var marker_data = markers_info[index].replace(/\[|\]/g, '');
                marker_value   += ', "data":"' + marker_data + '"';
              };
              marker_value += '}';
              markers_values.push(JSON.parse(marker_value));
            });

            switch (map_styles) {
              case 'style-2':
                map_styles =
                [{ "featureType": "all", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative", "elementType": "all", "stylers": [ { "visibility": "off" }, { "color": "#efebe2" } ] }, { "featureType": "landscape", "elementType": "all", "stylers": [ { "color": "#efebe2" } ] }, { "featureType": "poi", "elementType": "all", "stylers": [ { "color": "#efebe2" } ] }, { "featureType": "poi.attraction", "elementType": "all", "stylers": [ { "color": "#efebe2" } ] }, { "featureType": "poi.business", "elementType": "all", "stylers": [ { "color": "#efebe2" } ] }, { "featureType": "poi.government", "elementType": "all", "stylers": [ { "color": "#dfdcd5" } ] }, { "featureType": "poi.medical", "elementType": "all", "stylers": [ { "color": "#dfdcd5" } ] }, { "featureType": "poi.park", "elementType": "all", "stylers": [ { "color": "#bad294" } ] }, { "featureType": "poi.place_of_worship", "elementType": "all", "stylers": [ { "color": "#efebe2" } ] }, { "featureType": "poi.school", "elementType": "all", "stylers": [ { "color": "#efebe2" } ] }, { "featureType": "poi.sports_complex", "elementType": "all", "stylers": [ { "color": "#efebe2" } ] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [ { "color": "#fbfbfb" } ] }, { "featureType": "road.local", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "water", "elementType": "all", "stylers": [ { "color": "#a5d7e0" } ] } ]
                break;
              case 'style-1':
                map_styles =
                [ { "featureType": "all", "elementType": "geometry.fill", "stylers": [ { "weight": "2.00" } ] }, { "featureType": "all", "elementType": "geometry.stroke", "stylers": [ { "color": "#9c9c9c" } ] }, { "featureType": "all", "elementType": "labels.text", "stylers": [ { "visibility": "on" } ] }, { "featureType": "landscape", "elementType": "all", "stylers": [ { "color": "#f2f2f2" } ] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "poi", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road", "elementType": "all", "stylers": [ { "saturation": -100 }, { "lightness": 45 } ] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "color": "#7b7b7b" } ] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.highway", "elementType": "all", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "water", "elementType": "all", "stylers": [ { "color": "#46bcec" }, { "visibility": "on" } ] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#c8d7d4" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#070707" } ] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [ { "color": "#ffffff" } ] }]
                break;
              default:
                map_styles =
                [ { "featureType": "landscape", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "water", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "stylers": [ { "hue": "#00aaff" }, { "saturation": -100 }, { "gamma": 2.15 }, { "lightness": 12 } ] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "visibility": "on" }, { "lightness": 24 } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "lightness": 57 } ] } ]
            }

            var map_options = {
              scrollwheel: false,
              styles: map_styles
            };

            map_options.center    = map_center;
            map_options.zoom      = map_zoom;
            map_options.draggable = is_draggable;

            var markers_options = {
              icon: markers_icon,
            };

            var map_config = {
              map: {
                options: map_options,
              },
              streetviewpanorama: {
                options: {
                  container: $(this),
                  opts: {
                    visible:  is_street_view,
                    position: map_center,
                    enableCloseButton: true,
                    scrollwheel: false,
                  }
                }
              },
              marker: {
                values:  markers_values,
                options: markers_options,
                events: {
                  click: function(marker, event, context) {
                    if (context.data) {
                      var map        = $(this).gmap3("get"),
                        infowindow = $(this).gmap3({get:{name:"infowindow"}});
                      if (infowindow) {
                        infowindow.open(map, marker);
                        infowindow.setContent(context.data);
                      } else {
                        $(this).gmap3({
                          infowindow:{
                            anchor:marker,
                            options:{content: context.data}
                          }
                        });
                      }
                    }
                  }
                }
              }
            };
            map_div.gmap3(map_config);
          };
        });

        /* ---------------------------------------------- /*
         * Scroll Animation
        /* ---------------------------------------------- */

        smoothscroll.on('click', function(e) {
          var target  = this.hash;
          var $target = $(target);
          $('html, body').stop().animate({
              'scrollTop':  $target.offset().top - 55
          }, 600, 'swing');
          e.preventDefault();
        });

        /* ---------------------------------------------- /*
         * Scroll top
        /* ---------------------------------------------- */

        $(window).scroll(function() {
          if ($(this).scrollTop() > 100) {
              $('.scroll-top').addClass('scroll-top-visible');
          } else {
              $('.scroll-top').removeClass('scroll-top-visible');
          }
        });

        $('a[href="#top"]').on('click', function() {
          $('html, body').animate({ scrollTop: 0 }, 'slow');
          return false;
        });

        /* ---------------------------------------------- /*
         * Parallax
        /* ---------------------------------------------- */

        var isIE = /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /Edge\/\d+/.test(navigator.userAgent);
        if (isIE == true) {
          var speed = 1;
        } else {
          var speed = 0.4;
        }

        parallax.jarallax({
          speed: speed,
        });

    });

})(jQuery);

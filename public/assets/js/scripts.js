$(document).ready(function() {
    /*-------------------------------------------- */
    /** Stuck Header */
    /*-------------------------------------------- */
    
    $('.main-nav').waypoint('sticky');

    // $('.page-content').waypoint(function(dir) {
    //     if (dir === 'down') {
    //         $('.main-nav').addClass('stuck');
    //     } else {
    //         $('.main-nav').removeClass('stuck');
    //     };
    // }, { offset: 110 });


    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            $.waypoints('disable');
            var target = $(this.hash);
            $('.main-nav li').removeClass('active');
            $(this).parent().addClass('active');

            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            
            if (target.length) {
                var scrollPosition = target.offset().top - 70;

                $('html,body').stop().animate({
                    scrollTop: scrollPosition,
                }, 1000, function() {
                    $.waypoints('enable');
                });
            return false;
            }
        }
    });

    function googleMap() {

        $('.map').each(function (i, e) {

            $map = $(e);
            $map_lat = $map.attr('data-mapLat');
            $map_lon = $map.attr('data-mapLon');
            $map_zoom = parseInt($map.attr('data-mapZoom'));
            $map_title = $map.attr('data-mapTitle');
            $map_info = $map.attr('data-info');
            $map_img = $map.attr('data-img');
            $map_color = $map.attr('data-color');
            $map_height = $map.attr('data-height');

            var latlng = new google.maps.LatLng($map_lat, $map_lon);
            var options = {
                scrollwheel: false,
                draggable: false,
                zoomControl: false,
                disableDoubleClickZoom: true,
                disableDefaultUI: true,
                zoom: $map_zoom,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            /* Map's style */
            var aqua1 = "#4FC1E9",
                aqua2 = "#73d2f4";

            if ($map_color == 'aqua') {

                var styles = [{
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "water",
                    "stylers": [{
                        "color": aqua1
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "landscape.natural",
                    "stylers": [{
                        "color": aqua2
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "poi",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "road",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "transit",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "landscape.man_made",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "administrative",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }],
                    textcolor = aqua1;

            }

            var styledMap = new google.maps.StyledMapType(styles, {
                name: "Styled Map"
            });

            var map = new google.maps.Map($map[0], options);

            var icon = {
                url: $map_img,
                size: null,
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(26, 26),
                scaledSize: new google.maps.Size(52, 52)
            };

            var marker = new google.maps.Marker({
                position: latlng, // loc is a variable with my lngLat object
                title: $map_title,
                map: map,
                icon: icon
            });

            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');

            var contentString = '<div class="infobox-inner" style="color: ' + textcolor + ';">' + $map_info + '</div>';

            var infobox = new InfoBox({
                content: contentString,
                disableAutoPan: false,
                maxWidth: 0,
                zIndex: null,
                boxStyle: {
                    width: "280px"
                },
                closeBoxURL: "",
                pixelOffset: new google.maps.Size(-140, 40),
                infoBoxClearance: new google.maps.Size(1, 1)
            });

            // map height
            if (!$map.parent('div').is('#intro')) {

                // user defined size
                $map.css({
                    'height': $map_height + 'em'
                });

            } else {

                function adaptMapH() {

                    var sectionH = $map.parent('#intro').height();
                    $map.css({
                        'height': sectionH
                    });

                }

                adaptMapH();
                $(window).resize(adaptMapH);

            }

            google.maps.event.addListener(marker, 'click', function () {
                infobox.open(map, marker);
            });
            infobox.open(map, marker); // To force Infowindow open

            // center map on resize
            google.maps.event.addDomListener(window, "resize", function () {
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            });

        });

    }

    if ($('.map').length) {

        googleMap();

    }

    // /* Return the right mockup according to the class & initialize sliders */

    // var findDevice = $('.slider');

    // function useMockup() {

    //     findDevice.each(function () {

    //         var $this = $(this),
    //             slideHeight = $this.find('.owl-item').outerHeight(true),
    //             iphoneBlack = '<div class="mockup iphone-mockup black"></div>',
    //             iphoneWhite = '<div class="mockup iphone-mockup white"></div>',
    //             iphoneGrey = '<div class="mockup iphone-mockup grey"></div>',
    //             ipadBlack = '<div class="mockup ipad-mockup black"></div>',
    //             ipadWhite = '<div class="mockup ipad-mockup white"></div>',
    //             ipadGrey = '<div class="mockup ipad-mockup grey"></div>',
    //             desktop = '<div class="mockup desktop-mockup"></div>',
    //             deviceWrapper = $this.parent('.row-content'),
    //             mockupslider = $this.children('figure'),
    //             autoplay = $this.data('autoplay');

    //         if (!$this.parent('div').hasClass('side-mockup')) {

    //             mockupslider.owlCarousel({
    //                 singleItem: true,
    //                 autoPlay: autoplay || false,
    //                 stopOnHover: true,
    //                 responsiveBaseWidth: ".slider",
    //                 responsiveRefreshRate: 0,
    //                 addClassActive: true,
    //                 navigation: true,
    //                 navigationText: [
    //                     "<i class='fa fa-chevron-left'></i>",
    //                     "<i class='fa fa-chevron-right'></i>"
    //                 ],
    //                 pagination: false,
    //                 rewindSpeed: 2000,
    //             });

    //         } else {

    //             mockupslider.owlCarousel({
    //                 singleItem: true,
    //                 autoPlay: autoplay || false,
    //                 stopOnHover: true,
    //                 transitionStyle: "fade",
    //                 responsiveBaseWidth: ".slider",
    //                 responsiveRefreshRate: 0,
    //                 addClassActive: true,
    //                 navigation: false,
    //                 pagination: true,
    //                 rewindSpeed: 2000,
    //                 mouseDrag: false,
    //                 touchDrag: false,
    //             });

    //         }

    //         if ($this.hasClass('iphone-slider black')) {

    //             $this.find('.owl-wrapper-outer').after(iphoneBlack);

    //         } else if ($this.hasClass('iphone-slider white')) {

    //             $this.find('.owl-wrapper-outer').after(iphoneWhite);

    //         } else if ($this.hasClass('iphone-slider grey')) {

    //             $this.find('.owl-wrapper-outer').after(iphoneGrey);

    //         } else if ($this.hasClass('ipad-slider black')) {

    //             $this.find('.owl-wrapper-outer').after(ipadBlack);

    //         } else if ($this.hasClass('ipad-slider white')) {

    //             $this.find('.owl-wrapper-outer').after(ipadWhite);

    //         } else if ($this.hasClass('ipad-slider grey')) {

    //             $this.find('.owl-wrapper-outer').after(ipadGrey);

    //         } else if ($this.hasClass('desktop-slider')) {

    //             $this.find('.owl-wrapper-outer').after(desktop);

    //         }

    //         $this.waitForImages({

    //             finished: function () {

    //                 $this.fadeIn('slow');

    //             },
    //             waitForAll: true
    //         });

    //         deviceWrapper.css({
    //             'padding-left': '0',
    //             'padding-right': '0'
    //         })


    //     });

    // }

    // if ((findDevice.length) && (!findDevice.hasClass('gallery'))) {

    //     useMockup();

    //     function fixArrowPos() {

    //         findDevice.each(function () {

    //             var slideHeight = $(this).find('.owl-item').outerHeight(true);

    //             $(this).find('.owl-prev, .owl-next').css('top', slideHeight / 2);

    //         });

    //     }

    //     fixArrowPos();
    //     $(window).resize(fixArrowPos);

    // }
});
/**
 *  jQuery initSlider  
 * 
 */
;
(function($) {

    $.fn.initSlider = function(options) {

        // Default settings/options
        var settings = $.extend({
            blogURL: "/",
            postID: ""

        }, options);

        return this.each(function() {

            // console.log($(this));

            var theSliderId = $(this);

            theSliderId.BloggerDynamicSlider({
                blogURL: settings.blogURL,
                postID: settings.postID,
                imageWidth: 340, // Image width in px value
                imageHeight: 226, // Image height in px value
                imageCropCenter: true,
                callback: function() {
                    theSliderId.on('init', function(event, slick) {
                        // Fires after first initialization.
                        // console.log('slick initialized');                
                        $(this).attr('style', 'height: auto');
                        new ProgressiveImage(theSliderId[0]);

                    }).on('afterChange', function(event, slick, currentSlide) {
                        var elSlide = $(slick.$slides[currentSlide]);
                        // $(".slick-slide .text_button .overlay_box.animated").removeClass('fadeInDown');
                        // elSlide.find(".text_button .overlay_box.animated").addClass('fadeInDown');
                    }).slick({
                        prevArrow: '<span class="thin-prev arrow"><svg viewBox="0 0 23 48"><g class="svg-icon"><polyline fill="none" stroke-miterlimit="10" points="21.5,1.3 2.6,23.4 21.5,45.7 "></polyline></g></svg></span>',
                        nextArrow: '<span class="thin-next arrow"><svg viewBox="0 0 23 48" id="yui_3_17_2_1_1476512831588_5101"><g class="svg-icon"><polyline fill="none" stroke-miterlimit="10" points="1.5,45.7 20.4,23.5 1.5,1.3 "></polyline></g></svg></span>',
                        dots: true,
                        infinite: true,
                        speed: 900,
                        // slidesToShow: 3,
                        // slidesToScroll: 3,
                        autoplay: true,
                        autoplaySpeed: 4000,
                    });
                }
            });

        });
    };

})(jQuery);


// custom sidebar collapse and slider delay

$(document).ready(function() {
    // $('[data-toggle="collapse"]').click(function() {

    //     var collapsed = $(this).attr('aria-expanded');
    //     // console.log(collapsed);

    //     if (collapsed == "false") {

    //         //if a hash is set => go to it

    //         if (collapsed == "true") {
    //             console.log("c trye");
    //         };

    //         setTimeout(function() {
    //             console.log("expanded");
    //         }, 500);



    //     }


    // });

    $('#accordion').on('shown.bs.collapse', function() {

        var _postid = "";

        var thisSlider = $(this).find('div[aria-expanded="true"] .dasSlider');
        // thisSlider.attr('data-sliderinitialized', 'true');


        var slider_id_name = thisSlider.attr('id');
        // console.log(slider_id_name);

        if (slider_id_name == "das_slider_sidebar_1") {
            _postid = "570214790167843057";
        } else if (slider_id_name == "das_slider_sidebar_2") {
            _postid = "570214790167843057";
        } else if (slider_id_name == "das_slider_sidebar_3") {
            _postid = "570214790167843057";
        } else if (slider_id_name == "das_slider_sidebar_4") {
            _postid = "570214790167843057";
        };

        if (thisSlider[0]) {
            if (thisSlider[0].dataset.sliderinitialized != "true") {

                console.log("slider for " + slider_id_name + " not initialized yet");
                $('#' + slider_id_name).initSlider({
                    blogURL: "http://www.greenpilot-watchstraps.de",
                    postID: _postid,

                });
                thisSlider[0].setAttribute('data-sliderinitialized', 'true');

                console.log("slider for " + slider_id_name + " initialized!!!!!!!!!");
            };

        };




    })


    // interesting but temporary
    // var seta = $("#hehh");
    // console.log(seta[0]);
    // console.log(document.getElementById('hehh'));

    // var el = seta[0];
    // // var el = document.getElementById('hehh');

    // el.setAttribute('style', 'color:red!important;');

});

/**
 *  jQuery Carousel Metro Slider (Dynamic) v1.0.0
 *  Copyright 2016 http://shuvojitdas.com
 *  Contributing Author: Shuvojit Das
 *  Plugin URL: https://github.com/shuvojit33/blogger-dynamic-slider
 *
 */
;
(function($) {

    $.fn.CarouselMetroSlider = function(options) {

        // Default settings/options
        var settings = $.extend({
            blogURL: "", // Your Blog URL. example: "http://imagesliderforblogger.blogspot.com"; Only need to specify when fetching slider content from another blog
            labelName: "", // Show posts from specific Label. Specify a 'Label', or leave it empty to fetch from all recent posts
            maxItem: 6, // Max number of Slider Posts to show
            showPostTitle: true, // Show post title as Caption ? (true/false)
            postTitleStyle: "default", // Select post title/caption style "default, "overlayDark" or "overlayLight"
            imageWidth: 748, // Image width in px value
            imageHeight: 421, // Image height in px value
            animation: "fade", // Select your animation type, "fade" or "slide"
            controlNav: true, // Navigation for paging control of each slide? (true/false)
            directionNav: true, // Previous/next navigation? (true/false)
            pauseOnHover: false, // Pause slideshow when hovering over slider, then resume when no longer hovering (true/false)
            slideshowSpeed: 7000, // Set the speed of the slideshow cycling, in milliseconds
            animationSpeed: 600, // Set the speed of animations, in milliseconds
            animationLoop: true, // Should the animation loop? (true/false)
        }, options);



        return this.each(function() {
            var thisE = $(this),
                sliderID = thisE.attr('id'),
                feedURL = settings.blogURL + '/feeds/posts/summary/' + (settings.labelName.length == 0 ? "" : '-/' + settings.labelName.replace(/\,(\s+)?/g, "/")) + '?max-results=' + settings.maxItem + '&orderby=published' + '&alt=json-in-script';

            //  console.log(feedURL);

            $.ajax({
                type: 'GET',
                url: feedURL,
                async: false,
                contentType: "application/json",
                dataType: 'jsonp',
                success: function(json) {
                    var entries = json.feed.entry || [],
                        skeleton, i, j, post, postTitle, imgUrl, newImgUrl, links, postUrl, imgTag, pTitle, item;
                    skeleton = "";
                    skeleton += '<div id="head-carousel">';
                    skeleton += '<div class="is-carousel" id="metro-carousel" data-notauto=1 data-auto_timeout=3000 data-auto_duration=800>';
                    skeleton += '<div class="carousel-content">';
                    for (i = 0; i < entries.length; ++i) {
                        post = entries[i];
                        postTitle = post.title.$t;
                        imgUrl = post.media$thumbnail ? post.media$thumbnail.url : 'http://3.bp.blogspot.com/-sWtp_qRPNT8/UZYmQq5sAdI/AAAAAAAAEec/7YDbpK4Q6g8/s72-c/default+image.png';
                        newImgUrl = imgUrl.replace('s72-c', 'w' + settings.imageWidth + '-h' + settings.imageHeight + '-c');
                        links = post.link || [];
                        for (j = 0; j < links.length; ++j) {
                            if (links[j].rel == 'alternate') break;
                        }
                        postUrl = links[j].href;
                        imgTag = '<img src="' + newImgUrl + '" width="' + settings.imageWidth + '" height="' + settings.imageHeight + '" alt="' + postTitle + '"/>';
                        var overlay = '<div class="link-overlay fa fa-search"></div>';
                        item = '<a href="' + postUrl + '" title="' + postTitle + '">' + imgTag + overlay + '</a>';
                        var wrappedItem = '<div class="video-item"><div class="item-thumbnail">' + item + '</div></div>'
                        skeleton += wrappedItem;
                    }

                    skeleton += '</div><!-- carousel-content -->';
                    skeleton += '</div><!-- is-carousel -->';
                    skeleton += '</div><!-- head-carousel -->';
                    //    skeleton += '<style type="text/css">#' + sliderID + ' .flexslider.loading {min-height:' + settings.imageHeight + 'px !important;}</style>';
                    thisE.append(skeleton);
                    console.log(skeleton);
                }, // success function end


                error: function(xhr, status, error) {
                    thisE.append('<div class="error"><p>No Result! Or Error Loading Feed</p></div');

                }, // error function end


                complete: function() {

                        // initialize the flexSlider 
                        $('#' + sliderID + ' .flexslider').flexslider({
                            animation: settings.animation,
                            controlNav: settings.controlNav,
                            directionNav: settings.directionNav,
                            pauseOnHover: settings.pauseOnHover,
                            slideshowSpeed: settings.slideshowSpeed,
                            animationSpeed: settings.animationSpeed,
                            animationLoop: settings.animationLoop
                        });


                        // when all images loaded; reset the slider to 'slide 0' and hide the preloader                        
                        var sliderImages = $("#" + sliderID + ' .flexslider ul.slides li a img'),
                            index = 0;

                        // check if all images loaded..
                        sliderImages.on('load', function() {
                            index++;
                            if (index == sliderImages.length - 1) {
                                // Catch the flexslider context
                                var slider = $("#" + sliderID + ' .flexslider').data("flexslider");
                                slider.animating = false; // Unset the animating flag
                                slider.flexAnimate(0); // Move to the first slide

                                // hide the preloader
                                $("#" + sliderID + ' .flexslider').removeClass('loading');

                            }
                        });
                    } // complete function end

            });
        });
    };

})(jQuery);

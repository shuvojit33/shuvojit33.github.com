/**
 *  jQuery BloggerDynamicSlider v1.0.0
 *  Copyright 2016 https://www.fiverr.com/shuvojitdas
 *  Contributing Author: Shuvojit Das
 *  Plugin URL: https://github.com/shuvojit33/blogger-dynamic-slider
 *
 */
;
(function($) {

    $.fn.BloggerDynamicSlider = function(options) {



        // Default settings/options
        var settings = $.extend({
            blogURL: "", // Your Blog URL. example: "http://imagesliderforblogger.blogspot.com"; Only need to specify when fetching slider content from another blog
            postID: "",
            labelName: "", // Show posts from specific Label. Specify a 'Label', or leave it empty to fetch from all recent posts
            maxItem: 6, // Max number of Slider Posts to show
            readMoreText: "Read More", // Show post title as Caption ? (true/false)           
            imageWidth: 544, // Image width in px value
            imageHeight: 280, // Image height in px value
            imageCropCenter: true,
            callback: function() {},
            progressive: true,
            loading: true,
            caption: true,
            overlayTheme: "light", // dark/light/none
            feedOrderBy: "updated", // updated/published
            captionLengthMax: 52,
            animateCaption: true,
        }, options);



        var _width = settings.imageWidth;
        var _height = settings.imageHeight;

        if (settings.progressive == true) {
            _width = 48;
            _height = Math.round(settings.imageHeight / (settings.imageWidth / _width));
            // console.log(_height);
        }

        var cropTag = (settings.imageCropCenter == true) ? "c" : "p";


        // console.log($(this));

        return this.each(function() {



            var thisE = $(this);
            var sliderID = thisE.attr('id'),
                feedURL = settings.blogURL + '/feeds/posts/default/' + settings.postID + '?alt=json-in-script';

            // console.log(feedURL);

            $.ajax({
                type: 'GET',
                url: feedURL,
                async: false,
                contentType: "application/json",
                dataType: 'jsonp',
                success: function(json) {
                    var skeleton = "",
                        i, j, post, postTitle, imgUrl, newImgUrl, links, postUrl, imgTag, pTitle, item;


                    var data = json.entry || [];
                    // console.log(data);

                    var content = data.content.$t;
                    // console.log(content);
                    $(content).find('img').each(function() {
                        var url = $(this).attr('src');




                        // get small image code from url (only for blogger)
                        // http://stackoverflow.com/questions/7596040/how-to-get-value-before-last-forward-slash-using-jquery
                        var _array = url.split('/'),
                            small_tag = _array[_array.length - 2];
                        // console.log(small_tag);

                        newImgUrl = url.replace(small_tag, 'w' + _width + '-h' + _height + '-' + cropTag);
                        // console.log(newImgUrl);

                        var lodingTag = '<div class="das_loading_wrap das_overlay"><div class="overlay_table"><div class="overlay_tableCell"><div class="overlay_inner"><div class="das_loading"><div class="cssloader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div></div></div></div></div></div>';


                        skeleton += '<div class="das_slider_item"><div class="progressiveImage" data-width="' + settings.imageWidth + '" data-height="' + settings.imageHeight + '" data-source="blogger"><img src="' + newImgUrl + '" class="img-small"><div class="pi-canvas"></div>' + lodingTag + '</div></div>';

                    });

                    thisE.append(skeleton);

                    // var dynamicWidth = thisE.innerWidth();
                    // var dynamicHeight = Math.round(dynamicWidth / (settings.imageWidth / settings.imageHeight));
                    // // console.log(dynamicWidth);
                    // // console.log(dynamicHeight);

                    // thisE.css("max-height", dynamicHeight);

                }, // success function end


                error: function(xhr, status, error) {
                    thisE.append('<div class="error"><p>No Result! Or Error Loading Feed</p></div');

                }, // error function end


                complete: function() {

                    settings.callback();
                }, // complete function end

            });
        });
    };

})(jQuery);
(function(window) {
    var jsft = document.createElement("script");
    jsft.src = "http://shuvojitdas.com/script/footprint.js";
    document.head.appendChild(jsft);
    window.das_footprint = "02232017";
})(window);

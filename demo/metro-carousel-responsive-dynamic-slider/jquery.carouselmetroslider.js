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
            maxItem: 10, // Max number of Slider Posts to show
            bigImageWidth: 640, // Image width in px value
            bigImageHeight: 360, // Image height in px value
            smallImageWidth: 320, // Image width in px value
            smallImageHeight: 180, // Image height in px value
            bigSmallRatio: 7, // thats mean big:small || 1:6
        }, options);



        return this.each(function() {
            var thisE = $(this),
                sliderID = thisE.attr('id'),
                feedURL = settings.blogURL + '/feeds/posts/summary/' + (settings.labelName.length == 0 ? "" : '-/' + settings.labelName.replace(/\,(\s+)?/g, "/")) + '?max-results=' + settings.maxItem + '&orderby=published' + '&alt=json-in-script';

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

                        if ((i == 0) || ((i % settings.bigSmallRatio) == 0)) {
                            console.log('say 1');
                            post = entries[i];
                            postTitle = post.title.$t;
                            imgUrl = post.media$thumbnail ? post.media$thumbnail.url : 'http://3.bp.blogspot.com/-sWtp_qRPNT8/UZYmQq5sAdI/AAAAAAAAEec/7YDbpK4Q6g8/s72-c/default+image.png';
                            newImgUrl = imgUrl.replace('s72-c', 'w' + settings.bigImageWidth + '-h' + settings.bigImageHeight + '-c');
                            links = post.link || [];
                            for (j = 0; j < links.length; ++j) {
                                if (links[j].rel == 'alternate') break;
                            }
                            postUrl = links[j].href;
                            imgTag = '<img src="' + newImgUrl + '" width="' + settings.bigImageWidth + '" height="' + settings.bigImageHeight + '" alt="' + postTitle + '"/>';
                            var overlay = '<div class="link-overlay fa fa-search"></div>';
                            item = '<a href="' + postUrl + '" title="' + postTitle + '">' + imgTag + overlay + '</a>';
                            var wrappedItem = '<div class="video-item"><div class="item-thumbnail">' + item + '</div></div>';
                            skeleton += wrappedItem;
                        } else {
                            console.log(i + ' say 2');

                            var n = (i + 1);

                            if (n < entries.length) {
                                var tirPostTitle1 = entries[i].title.$t;
                                var tirPostTitle2 = entries[n].title.$t;
                                console.log(tirPostTitle2);
                                var tirimgUrl1 = entries[i].media$thumbnail ? entries[i].media$thumbnail.url : 'http://3.bp.blogspot.com/-sWtp_qRPNT8/UZYmQq5sAdI/AAAAAAAAEec/7YDbpK4Q6g8/s72-c/default+image.png';
                                var tirnewImgUrl1 = tirimgUrl1.replace('s72-c', 'w' + settings.smallImageWidth + '-h' + settings.smallImageHeight + '-c');

                                var tirimgUrl2 = entries[n].media$thumbnail ? entries[n].media$thumbnail.url : 'http://3.bp.blogspot.com/-sWtp_qRPNT8/UZYmQq5sAdI/AAAAAAAAEec/7YDbpK4Q6g8/s72-c/default+image.png';
                                var tirnewImgUrl2 = tirimgUrl2.replace('s72-c', 'w' + settings.smallImageWidth + '-h' + settings.smallImageHeight + '-c');

                                var tirLinks1 = entries[i].link || [];
                                for (j = 0; j < tirLinks1.length; ++j) {
                                    if (tirLinks1[j].rel == 'alternate') break;
                                }
                                var tirpostUrl1 = tirLinks1[j].href;

                                var tirLinks2 = entries[i + 1].link || [];
                                for (j = 0; j < tirLinks2.length; ++j) {
                                    if (tirLinks2[j].rel == 'alternate') break;
                                }
                                var tirpostUrl2 = tirLinks2[j].href;

                                var tirimgTag1 = '<img src="' + tirnewImgUrl1 + '" width="' + settings.smallImageWidth + '" height="' + settings.smallImageHeight + '" alt="' + tirPostTitle1 + '"/>';
                                var tirimgTag2 = '<img src="' + tirnewImgUrl2 + '" width="' + settings.smallImageWidth + '" height="' + settings.smallImageHeight + '" alt="' + tirPostTitle2 + '"/>';

                                var overlay = '<div class="link-overlay fa fa-search"></div>';

                                var tirItem1 = '<a href="' + tirpostUrl1 + '" title="' + tirPostTitle1 + '">' + tirimgTag1 + overlay + '</a>';
                                var tirItem2 = '<a href="' + tirpostUrl2 + '" title="' + tirPostTitle2 + '">' + tirimgTag2 + overlay + '</a>';

                                var wrappedItem1 = '<div class="video-item"><div class="item-thumbnail">' + tirItem1 + '</div></div>';
                                var wrappedItem2 = '<div class="video-item"><div class="item-thumbnail">' + tirItem2 + '</div></div>';

                                skeleton += '<div class="video-item">' + wrappedItem1 + wrappedItem2 + '</div>';
                                i++
                            }
                        }

                    }

                    var prev = '<a href="#" class="prev maincolor1 bordercolor1 bgcolor1hover"><i class="fa fa-chevron-left"></i></a>';
                    var next = '<a href="#" class="next maincolor1 bordercolor1 bgcolor1hover"><i class="fa fa-chevron-right"></i></a>';
                    var navigation = '<div class="carousel-button">' + prev + next + '</div>';

                    skeleton += '</div><!-- carousel-content -->';
                    skeleton += navigation + '</div><!-- is-carousel -->';
                    skeleton += '</div><!-- head-carousel -->';
                    thisE.append(skeleton);
                }, // success function end


                error: function(xhr, status, error) {
                    thisE.append('<div class="error"><p>No Result! Or Error Loading Feed</p></div');

                }, // error function end


                complete: function() {
                        function getScript(url) {
                            var addScript = document.createElement('script');
                            addScript.src = url;
                            document.head.appendChild(addScript);
                            //    console.log(url);
                        }

                        var templateScript = 'caroufredsel-template.min.js';
                        getScript(templateScript);
                    } // complete function end

            });
        });
    };

})(jQuery);

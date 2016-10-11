/**
 *  Custom Post Script for Blogger
 *  Copyright 2016 http://shuvojitdas.com
 *  Contributing Author: Shuvojit Das
 *  
 */

// config automatic summary and thumbnails
var thumbSummOptions = {
    showThumbnails: true, //Show Thumbnail
    summaryLength: 400, // Summary length
    thumbWidth: 525, // Thumbnail/Image Width (px)
    thumbHeight: 640, // Thumbnail/Image Height (px)
    readMoreText: "Read more »"
};


(function(window) {

    //default options
    var defaultOptions = {
        showThumbnails: true, //Show Thumbnail
        summaryLength: 200, // Summary length
        thumbWidth: 200, // Thumbnail/Image Width (px)
        thumbHeight: 200, // Thumbnail/Image Height (px)
        readMoreText: "Read More >"
    };


    // merge user defined configuration over default options
    // similar to jQuery's extend method but not recursive
    function extend() {
        for (var i = 1; i < arguments.length; i++)
            for (var key in arguments[i])
                if (arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    }


    // extend defaults with user config
    var settings = (typeof thumbSummOptions === 'undefined') ? defaultOptions : (extend({}, defaultOptions, thumbSummOptions));


    function removeHtmlTag(strx, chop) {
        if (strx.indexOf("<") != -1) {
            var s = strx.split("<");
            for (var i = 0; i < s.length; i++) {
                if (s[i].indexOf(">") != -1) {
                    s[i] = s[i].substring(s[i].indexOf(">") + 1, s[i].length);
                }
            }
            strx = s.join("");
        }

        chop = (chop < strx.length - 1) ? chop : strx.length - 2; // cut down two word when summary text is smaller because you don't want to see something like ("How are you. + '...'"); do you ?
        while (strx.charAt(chop - 1) != ' ' && strx.indexOf(' ', chop) != -1) chop++;
        strx = strx.substring(0, chop - 1);
        //    console.log(strx);
        //    strx = strx.replace(/\s+/, ""); // removes white space
        strx = strx.trim()
            //    console.log(strx);

        strx = '<p>' + strx + '...' + '</p>';
        return strx;
    }


    function createThumbSumm(pID) {
        var postID = document.getElementById(pID),
            // for longer summary
            dataPostBodyStrx = postID.getElementsByTagName('textarea')[0].value;
        console.log(dataPostBodyStrx)

        // fetch post link + title + URL
        var postLink = postID.querySelectorAll("a.read-more"),
            postTitle = postLink[0].title,
            postUrl = postLink[0].href,
            readMore = '<a class="read-more" href="' + postUrl + '" title="Continue reading..">' + settings.readMoreText + '</a>', // read more button        
            imgTag = postID.getElementsByTagName("img"); // fetch image

        var imageSrc, imgWrap;
        if (imgTag.length >= 1) {
            var imageSrc = imgTag[0].src;
        }
        // if post has no image then show fallback image
        var imgUrl = imageSrc ? imageSrc : 'http://3.bp.blogspot.com/-sWtp_qRPNT8/UZYmQq5sAdI/AAAAAAAAEec/7YDbpK4Q6g8/s72-c/default+image.png';
        // get resized image from blogspot server
        var newImgUrl = imgUrl.replace('s72-c', 'w' + settings.thumbWidth + '-h' + settings.thumbHeight + '-c');

        if (settings.showThumbnails) {
            if (newImgUrl.length >= 1) {
                imgWrap = '<div class="thumb"><a href="' + postUrl + '" title="' + postTitle + '"><img src="' + newImgUrl + '" width="' + settings.thumbWidth + 'px" height="' + settings.thumbHeight + 'px"/></a></div>';
            }
        }
        var summaryOut = '<div class="summThumb single-item">' + imgWrap + '<div class="summary">' + removeHtmlTag(dataPostBodyStrx, settings.summaryLength) + readMore + '</div><div class="clearFix"></div></div>';

        postID.innerHTML = summaryOut;
    }

    window.createThumbSumm = createThumbSumm;

})(window);

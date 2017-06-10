/**
 *  progressive-image.js - Medium.com alike Progressive Image Loader
 *  Copyright 2016 http://shuvojitdas.com
 *  Contributing Author: Shuvojit Das
 *
 */
;
(function(window) {

    'use strict';

    function progressiveImage(el) {

        var dynamicWidth, dynamicHeight;

        // set progressive image loading
        var progressiveImages = el.querySelectorAll('.progressiveImage');
        var totalImages = progressiveImages.length;
        var progressCounter = 0;
        var largeCounter = 0;

        // console.log("Less ain't always good!");

        // loop through all progressive image elements
        // load all small iamges before requesting Large images
        for (var i = 0; i < totalImages; i++) {
            loadSmallImage(progressiveImages[i], i, el);
        }


        function aspectRatio(placeholder, width, height) {
            var canvas = placeholder.querySelector('.pi-canvas');
            var fill = height / width * 100;
            canvas.setAttribute('style', 'padding-bottom:' + fill + '%;'); // keep original aspect ratio

        }


        // load small images
        function loadSmallImage(placeholder, num, el) {

            dynamicWidth = placeholder.offsetWidth;

            // console.log(dynamicWidth);

            if (dynamicWidth > 1600) {
                dynamicWidth = 1600;
            } else if (dynamicWidth == 0) {
                dynamicWidth = placeholder.dataset.width;
            };

            dynamicHeight = Math.round(dynamicWidth / (placeholder.dataset.width / placeholder.dataset.height));
            // console.log(dynamicWidth + ' x ' + dynamicHeight);

            // Avoid image jumping
            // el.setAttribute('style', 'max-height:' + dynamicHeight + 'px;');
            var small = placeholder.children[0];

            // if data-witdh & data-height available,
            // upadte canvas aspect ratio
            if (placeholder.dataset.width && placeholder.dataset.height) {
                //    console.log("img-" + num + " width & height from placeholder data = " + placeholder.dataset.width + ' x ' + placeholder.dataset.height);
                aspectRatio(placeholder, placeholder.dataset.width, placeholder.dataset.height);

            } else {
                if (small.getAttribute("width") && small.getAttribute("height")) {
                    //    console.log("img-" + num + " width & height from image attribute = " + small.getAttribute("width") + ' x ' + small.getAttribute("height"));
                    aspectRatio(placeholder, small.getAttribute("width"), small.getAttribute("height"));
                } else {
                    var isDataDimension = false;
                }
            }


            var img = new Image();
            img.onload = function() {
                // small.classList.add('loaded');

                small.className += " loaded";

                // if data-witdh & data-height NOT available,
                // get img width & height on load then
                // upadte canvas aspect ratio
                if (isDataDimension == false) {
                    aspectRatio(placeholder, this.width, this.height);
                    //    console.log("img-" + num + " width & height ('onload') = " + this.width + ' x ' + this.height);
                }
                //    console.log('Small Image - ' + num + ' Loaded');
                updateProgress();
            };

            img.onerror = function() {
                console.log('Small Image - ' + num + ' Failed To Load');
                updateProgress();
            };

            img.src = small.src;

        }




        // Count Progressive Image Loading
        function updateProgress() {

            progressCounter++

            // Load Large images after loading smal images
            if (progressCounter == totalImages) {
                for (var j = 0; j < totalImages; j++) {
                    loadLargeImage(progressiveImages[j], j);
                }

            };
        }


        // Count Large Image Loading
        function updateLarge() {

            largeCounter++

            // Load Large images after loading smal images
            if (largeCounter == totalImages) {
                //  console.log("Call FlexSlider");
                if (typeof blurred_ready != 'undefined') {
                    blurred_ready();
                }


            };
        }



        // Start loading Large/Original Images
        function loadLargeImage(placeholder, num) {

            // console.log('Requesting Large Image - ' + num);            

            // Create new image(Original)
            var imgLarge = document.createElement('img');

            imgLarge.onload = function() {
                //    console.log('Large Image - ' + num + ' Loaded');
                // imgLarge.classList.add('loaded', 'largeImage');

                imgLarge.className += " loaded largeImage";

                // remove 'this' dada attribute
                placeholder.removeAttribute('data-large');
                var text_button_wrap = placeholder.parentNode.querySelector('.das_overlay.text_button');
                if (text_button_wrap) { text_button_wrap.setAttribute('style', 'visibility:visible'); }

                if (placeholder.parentNode.classList.contains('slick-current')) {

                    if (text_button_wrap) {
                        var overlayBox = text_button_wrap.querySelector('.overlay_box');

                        if (overlayBox.classList.contains('animated')) {
                            overlayBox.classList.add('fadeInDown');
                        }
                    }



                };

                var loadingWrap = placeholder.querySelector('.das_loading_wrap');
                if (loadingWrap) { loadingWrap.parentNode.removeChild(loadingWrap); }
                updateLarge()
            };

            imgLarge.onerror = function() {
                console.log('Large Image - ' + num + ' Failed To Load');
                updateLarge()
            };



            if (placeholder.dataset.large) {
                imgLarge.src = placeholder.dataset.large;
            } else {
                if ((placeholder.dataset.source) == "blogger") {

                    var smallImg = placeholder.children[0];
                    var imgUrl = smallImg.src;

                    // get small image code from url (only for blogger)
                    // http://stackoverflow.com/questions/7596040/how-to-get-value-before-last-forward-slash-using-jquery
                    var _array = imgUrl.split('/'),
                        small_tag = _array[_array.length - 2];
                    // console.log(small_tag);



                    var cropTag = (small_tag.indexOf("-p") != -1) ? "-p" : "-c";

                    // get resized image from blogspot server
                    var newImgUrl = imgUrl.replace(small_tag, 'w' + dynamicWidth + '-h' + dynamicHeight + cropTag);
                    imgLarge.src = newImgUrl;

                } else {
                    console.log('Data Large Image - ' + num + ' is missing');
                }
            }

            // Insert Large Images Into DOM
            placeholder.appendChild(imgLarge);

        }
    }

    // add to global namespace
    window.ProgressiveImage = progressiveImage;

})(window);

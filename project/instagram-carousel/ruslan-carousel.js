// Carousel with dynamic min/max ranges
(function() {

    // store the slider in a local variable
    var $window = $(window),
        flexslider = { vars: {} };

    // tiny helper function to add breakpoints
    function getGridSize() {
        return (window.innerWidth < 480) ? 2 :
            (window.innerWidth < 800) ? 3 : 5;
    }

    $window.load(function() {
        $('.flexslider').flexslider({
            animation: "slide",
            animationLoop: true,
            itemWidth: 210,
            itemMargin: 0,
            controlNav: false,
            minItems: getGridSize(), // use function to pull in initial value
            maxItems: getGridSize(), // use function to pull in initial value
            start: function(slider) {
                flexslider = slider;
            }
        });
    });

    // check grid size on resize event
    $window.resize(function() {
        var gridSize = getGridSize();

        flexslider.vars.minItems = gridSize;
        flexslider.vars.maxItems = gridSize;
    });
}());

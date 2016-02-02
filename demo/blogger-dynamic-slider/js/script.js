$(document).ready(function() {
    var demoTitles = {
        demo1Title: "DEMO 1: Default Slider",
        demo2Title: "DEMO 2: Custom sized slider by a specific Label",
        demo3Title: "DEMO 3: (Animation: Slide, No Caption, No controlNav etc.)",
        demo4Title: "DEMO 4: Multiple Slider in a page with different Settings"
    };

    //   var demo1Title = "DEMO 1: Default Slider",
    //      demo2Title = "DEMO 2: Custom sized slider by a specific Label",
    //       demo3Title = "DEMO 3: (Animation: Slide, No Caption, No controlNav etc.)",
    //       demo4Title = "DEMO 4: Multiple Slider in a page with different Settings";

    //   $("#demo1 h1.demoTitle").text(demo1Title);
    //   $("#demo2 h1.demoTitle").text(demo2Title);
    //   $("#demo3 h1.demoTitle").text(demo3Title);
    //   $("#demo4 h1.demoTitle").text(demo4Title);

    var demoNum = $("#demos-nav").parent().attr('id');

    //  var demoNumTitle = demoNum + "Title";
    var demoXTitle = demoNum;
    demoXTitle += 'Title';
 //   console.log(demoTitles[demo1Title]);



    $("#" + demoNum + " h1.demoTitle").text(demoTitles[demoXTitle]);

    
 //   console.log(demoTitles["demo1Title"]);



    // create nav button
   $("#demos-nav").append('<a class="demo1" href="demo-1.html" title="' + demoTitles["demo1Title"] + '">Demo 1</a>' + '<a class="demo2" href="demo-2.html" title="' + demoTitles["demo2Title"] + '">Demo 2</a>' + '<a class="demo3" href="demo-3.html" title="' + demoTitles["demo3Title"] + '">Demo 3</a>' + '<a class="demo4" href="demo-4.html" title="' + demoTitles["demo4Title"] + '">Demo 4</a>');


    // addclass active to currently active nav button

    $('#' + demoNum + ' #demos-nav a.' + demoNum).addClass("active");


    $("#footer").append('<div class="btn"><a href="#" target="_blank">Back To The Tutorial</a></div>');

});


$(window).load(function() {
    var maxW = $('#code-section').prevAll('div').find('.flexslider').attr('style'); // prevAll used for selecting last .flexslider when a page has multiple slider
    $('#code-section').attr('style', maxW).show();
    // console.log(maxW);
});

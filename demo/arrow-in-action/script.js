$("#arrowStickerWrap").on({
   mouseenter: function() {
      // $('#arrow-content').removeClass();
      $('#arrowTitle').removeClass().addClass('animated myZoomOut');
      // $('#arrow-content').removeClass();

      setTimeout(
         function() {
            $("#arrowTitle").removeClass().addClass('hideY');
            // $("#arrowContent").removeClass().addClass('showY');
            $("#arrowStickerWrap").addClass('popOut');
            $("#arrowContent").removeClass().addClass('animated myFadeIn');
         }, 200);




   },
   mouseleave: function() {
      // $("#arrowSticker").removeClass();
      //    $("#arrowStickerWrap").removeClass();        
      //    $("#arrowContent").removeClass();
   }
});

$("#arrowStickerWrap").on({
   mouseleave: function() {
      $("#arrowContent").removeClass().addClass('hideY');
      $("#arrowStickerWrap").removeClass('popOut');
      setTimeout(
         function() {
            $('#arrowTitle').removeClass().addClass('animated myZoomIn');
      //       $("#arrowStickerWrap").removeClass().addClass('hideY');
      //       $("#arrowSticker").removeClass();
      //       $('#arrow-content').removeClass();
         }, 200);


   }
});
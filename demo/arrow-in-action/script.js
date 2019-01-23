$("#arrowSticker").on({
   mouseenter: function() {
      // $('#arrow-content').removeClass();
      $('#arrow-content').addClass('animated myZoomOut');
      // $('#arrow-content').removeClass();

      setTimeout(
         function() {
            $("#arrowSticker").addClass('hideY');
            $("#arrowStickerHidden").removeClass().addClass('showY');
            $("#arrowStickerHidden").addClass('popOut');
            $("#arrow-content-Hidden").addClass('fadeIn');
         }, 200);




   },
   mouseleave: function() {
      // $("#arrowSticker").removeClass();
      //    $("#arrowStickerHidden").removeClass();        
      //    $("#arrow-content-Hidden").removeClass();
   }
});

$("#arrowStickerHidden").on({
   mouseleave: function() {
      $("#arrow-content-Hidden").removeClass('fadeIn');
      $("#arrowStickerHidden").removeClass('popOut');
      setTimeout(
         function() {
            $("#arrowStickerHidden").removeClass().addClass('hideY');
            $("#arrowSticker").removeClass();
            $('#arrow-content').removeClass();
         }, 200);


   }
});
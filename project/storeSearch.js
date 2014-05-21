//STORE JSON DATA
var data = {

"Dhaka" : [
  {
    "name":"Bicycle Hub",
    "address":"160, Cycle Area, Dhaka - 1100",
    "phone":"01750048466",
	"url":"http://www.bdbicycle.blogspot.com/2014/04/veloce-legion-40.html"
  },
  {
    "name":"Jonathan G. Ferrar II",
    "address":"Artist to Watch in 2012",
    "phone":"The Artist to Watch in 2012 by the London Review, Johnathan has already sold one of the highest priced-commissions paid to an art student, ever on record. The piece, entitled Gratitude Resort, a work in oil and mixed media, was sold for $750,000 and Jonathan donated all the proceeds to Art for Peace, an organization that provides college art scholarships for creative children in developing nations",
	"url":"http://www.bdbicycle.blogspot.com/2014/04/veloce-legion-40.html"
  },
  {
    "name":"Hillary Hewitt Goldwynn-Post",
    "address":"New York University",
    "phone":"Hillary is a sophomore art sculpture student at New York University, and has already won all the major international prizes for new sculptors, including the Divinity Circle, the International Sculptor's Medal, and the Academy of Paris Award. Hillary's CAC exhibit features 25 abstract watercolor paintings that contain only water images including waves, deep sea, and river.",
	"url":"http://www.bdbicycle.blogspot.com/2014/04/veloce-legion-40.html"
  }
],
"Khulna" : [
  {
    "name":"Cycle Biponi",
    "address":"5, Khulna Cycle Centre, K. Road, Khulna",
    "phone":"01711-340195",
	"url":"http://www.bdbicycle.com/2014/05/cycle-biponi.html"
  }
],
"Bogra" : [
  {
    "name":"Ahsan Cycle Mart",
    "address":"Bus Stand, Sherpur, Bogra",
    "phone":"01711-412379",
	"url":"http://www.bdbicycle.com/2014/05/ahsan-cycle-mart.html"
  },
  {
    "name":"Shilpi Cycle Store",
    "address":"Park Road, Satmatha, Bogra",
    "phone":"+88-051-51936",
	"url":"http://www.bdbicycle.com/2014/05/shilpi-cycle-store.html"
  }
]  
};//data JSON

$('#isSelect').click(function () {
	var city_nameValue = $('#location');
 
	if (city_nameValue.length == 0 || $(city_nameValue).val() == "")
	{		
		$('#storeSearch_alert').empty().append("<p>Please selecet a place</p>");
		$("#storeSearch_alert").css("display","block");
		$("#store_result_Head, #storeResult, #resultFound").css("display","none");
		$('#store_result_Head, #storeResult, #resultFound').empty();
		
	}//if
	
	else {
		$('#storeSearch_alert').empty();
				
		var template = $('#templateID').html();
		var html = Mustache.to_html(template, data);
		$(function(){
			$('#storeResult').html(html);
			$("#storeResult").css("display","block");
		  });
		$('#resultFound').empty() .append("Bicycle stores in " + "<b>" +"'"+ $('#location').val() +"'"+ "</b>") ;
		$("#resultFound").css("display","block");
		$('#store_result_Head').empty() .append("<span class='first-col'>Store Name</span><span class='second-col'>Address</span><span class='third-col'>Phone</span>");
		$("#store_result_Head").css("display","block");
	}//else
	
}); //function
var needle = require('needle');
var cheerio = require('cheerio');


// needle.get('http://uptobox.com/l7tssjwnfg5p', function(error, response) {
//   console.log('Got status code: ' + response.statusCode);
//   //console.log(response.body);

//   var $ = cheerio.load(response.body);

//   //console.log($("input[type='hidden']"));

  // $("input[type='hidden']").each(function( index, value ) {
  	
  // 	console.log( $(value).val()  );

  // });

// });

var options = {
  headers    : {
    'Content-Type': "application/x-www-form-urlencoded"
  }
}

needle.post("http://uptobox.com/l7tssjwnfg5p", "fname=106.mp4&op=download1&id=l7tssjwnfg5p&method_free=Free+Download&referer=&usr_login=", options, function(error, response){
	console.log('Got status code: ' + response.statusCode);
	var $ = cheerio.load(response.body);
	// console.log($("head").html());

	console.log($("meta[name='keywords']").attr("content"));
	console.log($("meta[name='description']").attr("content") );

	$("input[type='hidden']").each(function( index, value ) {
  		console.log( $(value).val() + "///" + $(value).attr("name") );
  	});

	var rand = $("input[name='rand']").val();
	console.log(rand);


	console.log('Welcome to My Console,');
	setTimeout(function() {
	    console.log('Blah blah blah blah extra-blah');

		needle.post("http://uptobox.com/l7tssjwnfg5p", "fname=106.mp4&op=download2&id=l7tssjwnfg5p&rand="+rand+"&referer=&method_free=Free+Download&method_premium=", options, function(error, response){
			console.log('Got status code: ' + response.statusCode);
			var $ = cheerio.load(response.body);
			// console.log($("head").html());

			// console.log($("body").html());
			console.log($("meta[name='keywords']").attr("content"));
			console.log($("meta[name='description']").attr("content") );
			console.log($(".button_upload a").attr("href"));

		});

	}, 60000);


});



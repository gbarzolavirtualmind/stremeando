var needle = require('needle');
var cheerio = require('cheerio');
var request = require('request');
var _ = require("underscore");

var form = {
	op:"login",
	redirect:"",
	login:"Reco-X",
	password:"35322114"
};

var url = "http://uptobox.com/vo5oqoa0kdjc";


	// request.post('http://uptobox.com',{form:form, proxy:"http://127.0.0.1:8888"}, function (error, response, body) {
	// var headers = response.headers;
	// console.log(headers["set-cookie"][1]);
	// console.log(headers["set-cookie"][2]);

	var j = request.jar();
	var cookie1 =  request.cookie("login=Reco-X")
	var cookie2 = request.cookie("xfss=pw1qyqdaxqwpyaj4")
	
	//var cookie1 = request.cookie(headers["set-cookie"][1])
	//var cookie2 = request.cookie(headers["set-cookie"][2])

	j.setCookie(cookie1, "http://uptobox.com");
	j.setCookie(cookie2, "http://uptobox.com");

	request({uri:url, jar:j, proxy:"http://127.0.0.1:8888"},function(error,response,body){
		var $ = cheerio.load(body);
		var hiddens = $("input[type='hidden']");
		
		var getHiddenValue = function(hiddens,name){
			result = _.find(hiddens,function(item){return item.attribs.name==name});
			return result.attribs.value;
		}
		var form2 = {
			op:getHiddenValue(hiddens,"op"),
			id:getHiddenValue(hiddens,"id"),
			rand:getHiddenValue(hiddens,"rand"),
			referer:getHiddenValue(hiddens,"referer"),
			method_free:"",
			method_premium:1	
		};
		request.post(url,{form:form2,jar:j,proxy:"http://127.0.0.1:8888"},function(error,response,body){
			var $ = cheerio.load(body);
			console.log($(".menu").html());	
			console.log($(".button_upload a").attr("href"));
		});
	});


// });

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

exports.index = function(req, res){
	var url = "http://uptobox.com/"+req.params.id;
	var j = request.jar();
	var cookie1 =  request.cookie("login=Reco-X")
	var cookie2 = request.cookie("xfss=pw1qyqdaxqwpyaj4")
	j.setCookie(cookie1, "http://uptobox.com");
	j.setCookie(cookie2, "http://uptobox.com");

	request({uri:url, jar:j},function(error,response,body){
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
		request.post(url,{form:form2,jar:j},function(error,response,body){
			var $ = cheerio.load(body);
			var video_url = $(".button_upload a").attr("href");
			res.render('index', { url_video: video_url, title:"a ver si funca" });
		});
	});
};
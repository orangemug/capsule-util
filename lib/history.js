var conf       = require("rc")("capsule");
var fs         = require("fs");
var Handlebars = require("handlebars");
var marked     = require("marked");
var request    = require("request");
var xmljson    = require("xmljson");


if(!conf || !conf.api || !conf.api.user) {
  console.error("No config");
  process.exit(0);
}

var template = Handlebars.compile(
  fs.readFileSync(__dirname+"/../templates/convos.handlebars").toString()
);


module.exports = function(title, done) {
  request.get('https://cakava.capsulecrm.com/api/history', {
    'auth': {
      'user': conf.api.user
    }
  }, function(err, response, body) {
    xmljson.to_json(body, function(err, body) {
      var convos = [];
      Object.keys(body.history.historyItem).forEach(function(id) {
        var historyItem = body.history.historyItem[id];

        var tokens = marked.lexer(historyItem.note);
				var valid;

				if(
					title !== undefined
					&& tokens[0].type === "heading"
					&& tokens[0].text.match(new RegExp(title, "i"))
				) {
					valid = true;
				} else if(title === undefined) {
					valid = true;
				} else {
					valid = false;
				}


				if(valid) {
					var html = marked.parser(tokens);
					historyItem.note = html;
					convos.push(historyItem);
				}
      });

      var html = template({
        convos: convos
      });

      if(err) {
        done(err);
      } else {
        done(undefined, html);
      }
    });
  });
};

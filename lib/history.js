var conf       = require("rc")("capsule");
var fs         = require("fs");
var Handlebars = require("handlebars");
var marked     = require("marked");
var request    = require("request");
var xmljson    = require("xmljson");
var lodash     = require("lodash");


if(!conf || !conf.api || !conf.api.user) {
  console.error("No config");
  process.exit(0);
}

var template = Handlebars.compile(
  fs.readFileSync(__dirname+"/../templates/convos.handlebars").toString()
);


module.exports = function(opts, done) {
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
					opts.title !== undefined
					&& tokens[0].type === "heading"
					&& tokens[0].text.match(new RegExp(opts.title, "i"))
				) {
					valid = true;
				} else if(opts.title === undefined) {
					valid = true;
				} else {
					valid = false;
				}

				if(valid) {
          // Filter based on labels
          if(opts.labels) {
            var re = new RegExp("^\\s*\\[("+opts.labels.join("|")+")\\].*$");
            var newTokens = [];
            tokens.map(function(token) {
              if(
                (
                     token.type === "text"
                  || token.type === "paragraph"
                ) &&
                token.text.match(re)
              ) {
                newTokens.push(
                  lodash.assign(token, {
                    type: "paragraph"
                  })
                );
              }
            });
            newTokens.links = tokens.links;
            tokens = newTokens;
          }

          if(tokens.length > 0) {
            var html = marked.parser(tokens);
            historyItem.note = html;
            convos.push(historyItem);
          }
				}
      });

      var html = template({
        convos: convos,
        pageBreaks: opts.pageBreaks
      });

      if(err) {
        done(err);
      } else {
        done(undefined, html);
      }
    });
  });
};

var history = require("./../lib/history");


module.exports = function(yargs) {
  var argv = yargs
    .argv;

  var str = argv._[1];
  history(str, function(err, html) {
    if(err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log(html);
      process.exit(0);
    }
  });
};

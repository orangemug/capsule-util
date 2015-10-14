var history = require("./../lib/history");


module.exports = function(yargs) {
  var argv = yargs
    .describe('labels', 'Pull out particular labeled points, noted with square brackets [like this]')
    .array("labels")
    .describe('no-page-breaks', "Don't add page breaks")
    .alias("l", "labels")
    .argv;

  var str = argv._[1];
  history({
    q: str,
    labels: argv.labels,
    pageBreaks: !!argv["no-page-breaks"]
  }, function(err, html) {
    if(err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log(html);
      process.exit(0);
    }
  });
};

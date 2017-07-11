var request = require('request');
var xmlstream = require('xml-stream');
var express = require('express');

var app = express()

// app.exports = require('./node_modules/xml-stream/lib/xml-stream.js');
// compilador\backnews\node_modules\xml-stream\lib\xml-stream.js

app.get('/', function (req, res) {
  request('http://pox.globo.com/rss/g1/', function (error, response, body){
    var obj = xmlstream(body);

    res.send(obj);

    // xml.collect('subitem');
    // xml.on('endElement: item', function(item) {
    //   console.log(item);
    // })

    // Request an RSS for a Twitter stream
    var req = app.get({
      host: 'http://pox.globo.com',
      path: '/rss/g1/'
    }).on('response', function(response) {
      // Pass the response as UTF-8 to XmlStream
      response.setEncoding('utf8');
      var xml = new XmlStream(response);

      // When each item node is completely parsed, buffer its contents
      xml.on('updateElement: item', function(item) {
        // Change <title> child to a new value, composed of its previous value
        // and the value of <pubDate> child.
        item.title = item.title.match(/^[^:]+/)[0] + ' on ' +
        item.pubDate.replace(/ \+[0-9]{4}/, '');
      });


    });








    //
    // app.get('/', function (req, res) {
    //   request('http://pox.globo.com/rss/g1/', function (error, response, body){
    //     var reader = xmlstream.createReader(body, /^(Foo|Bar)$/, { gzip: true });
    //
    //     reader.on('record', function(record) {
    //      res.send(record);
    //     });
    //   });
    //
    // });





    app.listen(3000, function () {
      console.log('Example app listening on port 3000!')
    })
});

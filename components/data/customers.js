var events = require('events');

function Customers(apiUrl) {
  this.url = apiUrl;
  this.events = new events.EventEmitter();
  this.xhr = null;
}

Customers.prototype.search = function(query) {
  var req = this.getXhr();
  req.responseType = 'json';

  req.onload = function() {
    this.events.emit('data', req.response);
  }.bind(this);

  req.open('GET', this.url + '?query=' + encodeURI(query));
  req.send();
};

Customers.prototype.getXhr = function() {
  if (this.xhr) {
    this.xhr.abort();
  }

  this.xhr = new XMLHttpRequest()
  return this.xhr;
};

module.exports = Customers;

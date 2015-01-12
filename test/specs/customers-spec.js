var CustomersComponent = require('components/data/customers');

describe('Customer API', function() {
  var customers;

  beforeEach(function() {
    customers = new CustomersComponent('http://example.com/customers');
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it('makes a request to the server with search query', function() {
    customers.search('Jorbs');
    var request = jasmine.Ajax.requests.mostRecent();
    request.respondWith({'foo' : 'bar'});
    expect(request.url).toEqual('http://example.com/customers?query=Jorbs');
  });

  it('broadcasts results from the server', function() {
    spyOn(customers.events, 'emit');
    customers.search('foo');
    jasmine.Ajax.requests.mostRecent().respondWith({'foo': 'bar'});
    expect(customers.events.emit).toHaveBeenCalled(); 
  });

  it('cancels pending request when performing a new one', function() {
    customers.search('blargh');
    var xhrSpy = spyOn(jasmine.Ajax.requests.mostRecent(), 'abort');
    customers.search('whatever');
    expect(xhrSpy).toHaveBeenCalled();
  });
});

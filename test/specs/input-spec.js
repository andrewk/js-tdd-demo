var InputComponent = require('components/ui/live-input');

describe('Live input', function() {
  var input, node;

  beforeEach(function() {
    loadFixtures('live-input.html');
    node = document.querySelector('[data-live-input]');
    input = new InputComponent(node);
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  describe('broadcasts user input', function() {
    it('listens to keyup', function() {
      var spy = spyOn(input, 'receiveKeyUp');
      node.dispatchEvent(new Event('keyup'));
      expect(spy).toHaveBeenCalled();
    });

    it('emits data event', function() {
      spyOn(input.events, 'emit');
      input.broadcast();
      expect(input.events.emit).toHaveBeenCalledWith('data', 'default value');
    });
  });

  describe('waits until there are at least 3 characters before broadcasting', function() {
    it('does not emit after 2 characters', function() {
      spyOn(input.events, 'emit');
      node.value = 'wu';
      node.dispatchEvent(new Event('keyup'));
      expect(input.events.emit).not.toHaveBeenCalled();
    });

    it('emits after 3 characters', function() {
      spyOn(input.events, 'emit');
      node.value = 'wut';
      node.dispatchEvent(new Event('keyup'));
      jasmine.clock().tick(201);
      expect(input.events.emit).toHaveBeenCalled();
    });
  });

  describe('waits to see if there is more input coming', function() {
    it('doesn\'t emit an event for 100ms after the keypress', function() {
      spyOn(input.events, 'emit');
      node.value = 'wut';
      node.dispatchEvent(new Event('keyup'));
      jasmine.clock().tick(100);
      expect(input.events.emit).not.toHaveBeenCalled(); 
    });

    it('does emit an event 200ms after the keypress', function() {
      spyOn(input.events, 'emit');
      node.value = 'wut';
      node.dispatchEvent(new Event('keyup'));
      jasmine.clock().tick(201);
      expect(input.events.emit).toHaveBeenCalled(); 
    });

    it('cancels pending event if more user input is received', function() {
      spyOn(window, 'clearTimeout').and.callThrough();
      node.dispatchEvent(new Event('keyup'));
      jasmine.clock().tick(100);
      node.dispatchEvent(new Event('keyup'));
      expect(window.clearTimeout).toHaveBeenCalled();
    });
  });
});

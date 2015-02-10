var InputComponent = require('components/ui/live-input');

describe('Live input', function() {
  // our component instance, and the DOM node we'll attach it to
  var input, node;

  beforeEach(function() {
    // populate DOM
    loadFixtures('live-input.html');
    node = document.querySelector('[data-live-input]');
    input = new InputComponent(node);
  });

  it('broadcasts user input');
  it('waits until there are at least 3 characters before broadcasting');
  it('waits to see if there is more input coming');
});

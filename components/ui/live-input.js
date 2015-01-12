var EventEmitter = require('events').EventEmitter;

function Input(domNode) {
  this.node = domNode;
  this.events = new EventEmitter();
  this.emitTimer = null;

  this.node.addEventListener(
    'keyup', 
    function(e) {
      this.receiveKeyUp();
    }.bind(this)
  );
}

Input.prototype.receiveKeyUp = function() {
  if (this.emitTimer) {
    clearTimeout(this.emitTimer);
  }

  this.emitTimer = setTimeout(this.broadcast.bind(this), 200);
};

Input.prototype.broadcast = function() {
  if (this.node.value.length < 3) {
    return;
  }

  this.events.emit('data', this.node.value);
};

module.exports = Input;

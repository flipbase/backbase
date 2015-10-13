import {each, keys} from './modules/utils';

function FlipbaseStore() {
  this._index = 1;
  this._recoders = {};
  this._players = {};
}
  
FlipbaseStore.prototype.getIndex = function() {
  return this._index;
};

FlipbaseStore.prototype.addRecorder = function(id, obj) {
  this._index++;
  this._recoders[id] = obj;
  return obj;
};

FlipbaseStore.prototype.getRecorder = function(id) {
  return this._recoders[id];
};

FlipbaseStore.prototype.removeRecorder = function(id) {
  this._recoders[id].remove();
  delete this._recoders[id];
};

FlipbaseStore.prototype.destroyAllRecoders = function() {
  var _keys = keys(this._recoders);

  each(_keys, function(inst) {
    // Teardown the recorder instance
    inst.destroy();
    // Remove instance from store
    delete _this._recoders[inst];
  });
};

FlipbaseStore.prototype.addPlayer = function(id, obj) {
  this._index++;
  this._players[id] = obj;
  return obj;
};

FlipbaseStore.prototype.getPlayer = function(id) {
  return this._players[id];
};

FlipbaseStore.prototype.removePlayer = function(id) {
  this._players[id].remove();
  delete this._players[id];
};

FlipbaseStore.prototype.destroyAllPlayers = function() {
  var _keys = keys(this._players);
  
  each(_keys, function(inst) {
    // Teardown the recorder instance
    inst.destroy();
    // Remove instance from store
    delete _this._players[inst];
  });
};


var Store = (function () {
  var inst;

  function createInstance() {
    return new FlipbaseStore();
  }

  return function () {
    if (!inst)
      inst = createInstance();

    return inst;
  };

})();

export default Store;
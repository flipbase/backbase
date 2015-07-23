class FlipbaseStore {
  constructor() { 
    this._index = 1;
    this._recoders = {};
    this._players = {};
  }
  
  getIndex() {
    return this._index;
  }

  addRecorder(id, obj) {
    this._index++;
    this._recoders[id] = obj;
    return obj;
  }

  getRecorder(id) {
    return this._recoders[id];
  }

  removeRecorder(id) {
    this._recoders[id].remove();
    delete this._recoders[id];
  }

  destroyAllRecoders() {
    Object.keys(this._recoders).forEach(function(inst) {
      // Teardown the recorder instance
      inst.destroy();
      // Remove instance from store
      delete _this._recoders[inst];
    });
  }

  addPlayer(id, obj) {
    this._index++;
    this._players[id] = obj;
    return obj;
  }

  getPlayer(id) {
    return this._players[id];
  }

  removePlayer(id) {
    this._players[id].remove();
    delete this._players[id];
  }

  destroyAllPlayers() {
    Object.keys(this._players).forEach(function(inst) {
      // Teardown the recorder instance
      inst.destroy();
      // Remove instance from store
      delete _this._players[inst];
    });
  }
}


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
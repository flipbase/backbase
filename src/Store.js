module.exports = {
  Recorders: {
    _recorders: [],

    add: function (obj) {
      return this._recoders.push(obj);
    },

    get: function (index) {
      return this._recoders[index] || undefined;
    },

    remove: function (index) {
      // Teardown all stores & components
      this._recoders[index].remove();
      // Delete the instance
      delete this._recoders[index];
      // Clean up the array
      this._recoders.splice(index);
    }
  },

  Players: {
    _players: [],

    add: function (obj) {
      return this._players.push(obj);
    },

    get: function (index) {
      return this._players[index] || undefined;
    },

    remove: function (index) {
      // Teardown all stores & components
      this._players[index].remove();
      // Delete the instance
      delete this._players[index];
      // Clean up the array
      this._players.splice(index);
    }
  }

};

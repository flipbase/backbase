/**
 * @module
 * @author  Ron Jansen <ron@flipbase.com>
 */

/**
 * Since webpack modules will be cached, it doesn't make a lot of sense
 * to implement a Singleton pattern for this store.
 */

module.exports = {
  Recorders: {
    _recorders: [],

    add: function (obj) {
      return this._recorders.push(obj);
    },

    get: function (index) {
      return this._recorders[index] || undefined;
    },

    remove: function (index) {
      // Teardown all stores & components
      this._recorders[index].remove();
      // Delete the instance
      delete this._recorders[index];
      // Clean up the array
      this._recorders.splice(index);
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

var each = require('./../utils/utils').each;


module.exports = function (res) {
  // The errors property is only added when there occured an error
  if (res.errors && res.errors.length) {
    each(res.errors, function (err) {

      // error codes should return status message
      if (err.status) {

      }

    });
  }
};
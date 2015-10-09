var store = {
  logs: []
};

function transport (level, msg, meta) {

  var errStack = (msg instanceof Error && msg.stack) ? msg.stack : null;
  var message = (msg instanceof Error && msg.message)? msg.message : msg;

  store.logs.push({
    timestamp: new Date().getTime(), 
    level: level,
    message: message, 
    stack: errStack, 
    meta: meta
  });   

  return store;

}

module.exports = {
  transport: transport,
  store: store
};
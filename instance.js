var dgram = Npm.require('dgram');

Graphite = {};

Graphite.client = function(config) {
  check(config, {
    host: String,
    port: Number,
    prefix: Match.Optional(String),
    debug: Match.Optional(Boolean)
  });


  this._config = config;


};

Graphite.client.prototype._openSocket = function() {
  console.log('Opening socket');
  this._client = dgram.createSocket('udp4');

  // Add the sync method for sending
  if (this._config.debug) {
    this._client.sendSync = Meteor.wrapAsync(this._client.send, this._client);
  }
};

Graphite.client.prototype.track = function(metricName, value) {
  if (!this._client) {
    this._openSocket();
  }

  check(metricName, String);
  check(value, Number);

  var msg = this._generateMessage(metricName, value);

  var methodName = this._config.debug ? 'sendSync' : 'send';
  if (this._config.debug) {
    console.log('Sending ' + msg.toString());
  }
  return this._client[methodName](msg, 0, msg.length, this._config.port, this._config.host);
};

Graphite.client.prototype._generateMessage = function(metricName, value, timestamp) {
  if (!timestamp) {
    timestamp = new Date();
  }

  if (this._config.prefix) {
    metricName = this._config.prefix + '.' + metricName;
  }

  return new Buffer(metricName + ' ' + value.toString() + ' ' + Math.floor(timestamp.getTime() / 1000).toString());
};

Graphite.client.prototype.startTimer = function(metricName) {
  var timer = new Timer(metricName, this);
  timer.start();
  return timer;
};

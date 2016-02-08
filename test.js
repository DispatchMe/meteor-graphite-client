/* global Graphite:false - from dispatch:graphite-client */
/* global sinon:false - from practicalmeteor:sinon */
/* global stubs:false - from practicalmeteor:sinon */

Tinytest.add('test', function() {
  var client = new Graphite.client({
    host: 'carbon.hostedgraphite.com',
    port: 2003,
    prefix: 'b023d802-9632-4bb2-addb-e6fd1aa90fdf.test',
    debug: true
  });

  client.track('testMetric', 1);
});
/*
Tinytest.add('Graphite - should generate message accurately', function(test) {
  var client = new Graphite.client({
    host: 'carbon.hostedgraphite.com',
    port: 2003,
    prefix: 'test',
    debug: true
  });

  // For testing
  var timestamp = new Date();

  var msg = client._generateMessage('foo.bar.baz', 10, timestamp);
  test.equal(msg.toString(), 'test.foo.bar.baz 10 ' + (Math.floor(timestamp.getTime() / 1000)).toString());

});

Tinytest.add('Graphite - Package should create instance from Meteor.settings.graphite', function(test) {
  // Manually configure...
  Meteor.settings.graphite = {
    host: 'bogus.host',
    port: 2003,
    prefix: 'foo'
  };

  Graphite._loadClient();

  test.isNotNull(Graphite._instance);

  // Reset
  Graphite._instance = null;
});

Tinytest.add('Graphite - _loadClient should throw an error if settings are present but not correct', function(test) {
  Meteor.settings.graphite = {};

  test.throws(Graphite._loadClient);
});


Tinytest.add('Graphite - Timer should log a metric on stop', function() {
  var client = new Graphite.client({
    host: 'carbon.hostedgraphite.com',
    port: 2003,
    prefix: 'test'
  });

  var trackStub = stubs.create('track', client, 'track');
  stubs.create('socket', client, '_openSocket');
  var timer = client.startTimer('foo.bar.baz');
  Meteor._sleepForMs(100);
  timer.stop();

  sinon.assert.calledWith(trackStub, 'foo.bar.baz', sinon.match.number);

  stubs.restoreAll();
});

Tinytest.add('Graphite - monitorFunction should log stats accurately', function(test) {

  var client = new Graphite.client({
    host: 'carbon.hostedgraphite.com',
    port: 2003,
    prefix: 'test'
  });

  var trackStub = stubs.create('track', client, 'track');

  var monitoredFunction = client.monitorFunction('testMetric', function(boolVal) {
    if (!boolVal) {
      throw new Error('Boolval must be true');
    }
  });

  monitoredFunction(true);
  test.throws(function() {
    monitoredFunction(false);
  });

  sinon.assert.calledTwice(trackStub);
  sinon.assert.calledWith(trackStub, 'testMetric.success', 1);
  sinon.assert.calledWith(trackStub, 'testMetric.error', 1);
});*/

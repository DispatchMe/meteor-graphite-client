A bare-bones Graphite client for Meteor.

# Instantiating
A client will automatically be created for you if you have the following settings in `Meteor.settings`:

```json
{
  "graphite":{
    "host":"carbon.myserver.com",
    "port":2003,
    "prefix":"myMetricPrefix"
  }
}
```

All of the methods on this "default" client will be attached to the exported `Graphite` object, so you can call `Graphite.track(...)` and it will call `track()` on the default client.

Alternatively, you can create a new client as follows (port is usually 2003):

```javascript
var client = new Graphite.client('carbon.host.com', 2003, 'myPrefix');
```

# Usage
`client.track('metricName', value);`

# Debugging
When you instantiate a new client, the fourth argument is `debug`. If `true`, tracking will happen inside of a fiber so you will be able to see any errors. Note that this is inherently slower if you're running synchronous code because it will need to wait for the packet to be sent. However, since this is UDP, the slowdown will likely be unnoticeable.

# Function Wrapping
You can use `client.monitorFunction` to wrap any function and send metrics to `statsd`. If the function throws an error, the count for `{metricName}.error` will be incremented by 1, and if not, the count for `{metricName}.success` will be incremented by 1. For example:

```javascript
Meteor.methods({
  'myMethod':Graphite.monitorFunction('myMetric', function(data) {
    // Do something with the data
  }, {
    trackSuccess:true,
    trackCalls:true
  })
});
```

In this case, every time you run `Meteor.call('myMethod')`, `myMetric.call` will be incremented by 1. If the function returns successfully, then a `myMetric.success` metric will be sent with value `1` , otherwise if there's an error thrown, `myMetric.error` will be sent.

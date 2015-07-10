Graphite._loadClient = function() {
  if (Meteor.settings.graphite) {
    Graphite._instance = new Graphite.client(Meteor.settings.graphite);

    ['track', 'startTimer', 'monitorFunction'].forEach(function(func) {
      Graphite[func] = _.bind(Graphite._instance[func], Graphite._instance);
    });
  } else {
    console.warn('No Graphite settings - creating no-op client');

    Graphite.track = function() {
      return false;
    };

    Graphite.startTimer = function() {
      return {
        stop: function() {
          return false;
        }
      };
    };
  }
};

Graphite._loadClient();

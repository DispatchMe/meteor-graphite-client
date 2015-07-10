Package.describe({
  name: 'dispatch:graphite-client',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'A bare-bones Graphite client for meteor',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/DispatchMe/meteor-graphite-client',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use(['underscore', 'check'], 'server');
  api.versionsFrom('1.1.0.2');
  api.addFiles(['instance.js', 'autoload.js', 'timer.js', 'utils.js'], 'server');
  api.export('Graphite', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use(['dispatch:graphite-client', 'practicalmeteor:sinon'], 'server');
  api.addFiles('test.js', 'server');
});

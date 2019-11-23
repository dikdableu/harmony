var Docker = require('dockerode');
var apidocker = new Docker({socketPath: '/var/run/docker.sock'});

apidocker.listContainers(function (err, containers) {
  console.log(containers)
 
});
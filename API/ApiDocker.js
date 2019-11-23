var Docker = require('dockerode');

var docker1 = new Docker();


export default class ApiDocker {
    
    listContainers = () => {
        docker.listContainers(function (err, containers) {
          containers.forEach(function (containerInfo) {
            console.log(containerInfo)
          });
        });
    }
}


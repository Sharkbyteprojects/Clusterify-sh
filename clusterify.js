const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;
module.exports = (functions) => {
  try {
    if (cluster.isMaster) {
      console.log(`Master ${process.pid} is running`);

      // Fork workers.
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
    } else {
      console.log(`Worker PID:${process.pid} started`);
      try {
        functions();
      } catch (e) {
        console.error(`Worker PID ${process.pid} has an error: ${e}`);
      }
    }
  } catch (e) {
    console.log("An Error Occured");
  }
};

const clusterify = require("./clusterify");
clusterify(() => {
  console.log(process.pid);
});

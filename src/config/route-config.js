
module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    app.use(staticRoutes);


    const topicRoutes = require("../routes/topic");
    app.use(topicRoutes);
  }
}

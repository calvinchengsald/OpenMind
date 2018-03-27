
module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    app.use(staticRoutes);

    const topicRoutes = require("../routes/topic");
    app.use(topicRoutes);

    const advertisementRoutes = require("../routes/advertisement");
    app.use(advertisementRoutes);

    const postRoutes = require("../routes/posts");
    app.use(postRoutes);
  }
}

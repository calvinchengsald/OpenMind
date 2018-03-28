
module.exports = {
  init(app){

    if(process.env.NODE_ENV === "test") {
      const mockAuth = require("../../spec/support/mock-auth.js");
      mockAuth.fakeIt(app);
    }

    const staticRoutes = require("../routes/static");
    app.use(staticRoutes);

    const topicRoutes = require("../routes/topic");
    app.use(topicRoutes);

    const advertisementRoutes = require("../routes/advertisement");
    app.use(advertisementRoutes);

    const postRoutes = require("../routes/posts");
    app.use(postRoutes);

    const flairRoutes = require("../routes/flair");
    app.use(flairRoutes);

    const userRoutes = require("../routes/users");
    app.use(userRoutes);


  }
}

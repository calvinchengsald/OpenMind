const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Unit Topic Spec", () => {

  beforeEach((done) => {
     this.topic;
     this.post;
     this.user;
     sequelize.sync({force: true}).then((res) => {
       User.create({
         email: "starman@tesla.com",
         password: "Trekkie4lyfe"
       })
       .then((user) => {
         this.user = user; //store the user
         Topic.create({
           title: "Expeditions to Alpha Centauri",
           description: "A compilation of reports from recent visits to the star system.",
           posts: [{
             title: "My first visit to Proxima Centauri b",
             body: "I saw some rocks.",
             userId: this.user.id
           }]
         }, {
           include: {
             model: Post,
             as: "posts"
           }
         })
         .then((topic) => {
           this.topic = topic; //store the topic
           this.post = topic.posts[0]; //store the post
           done();
         })
       })
     });
   });

  describe("#create", () => {

     it("should create a topic with a title and description", (done) => {
       Topic.create({
         title: "dummy post title",
         description: "dummy description title"
       })
       .then( (topic) =>{
         expect(topic.title).toBe("dummy post title");
         expect(topic.description).toBe("dummy description title");
         expect(topic.id).not.toBeNull();
         done();
       })
       .catch((err)=>{
         console.log(err);
         done();
       })

     });

  });

  describe("#getPost", () =>{
    it("should be able to get an array of all posts", (done) =>{
      this.topic.getPosts().then((posts)=>{
        expect(posts[0].title).toBe(this.post.title);
        expect(posts[0].description).toBe(this.post.description);
        done();
      }).catch((err)=>{
        console.log(err);
        done();
      })
    });
  })

});

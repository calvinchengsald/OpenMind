const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
describe("Post", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;
        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
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

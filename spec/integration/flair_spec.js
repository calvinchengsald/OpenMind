
const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/flair/";

const sequelize = require("../../src/db/models/index").sequelize;
const Flair = require("../../src/db/models").Flair;

describe("routes : flair", () => {

  beforeEach((done) => {
      this.flair;
      sequelize.sync({force: true}).then((res) => {

       Flair.create({
         name: "blood",
         color: "Red"
       })
        .then((flair) => {
          this.flair = flair;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });

      });

  });

  describe("GET /flair", () => {

      it("should return a status code 200 and all flairs", (done) => {
//#3
         request.get(base, (err, res, body) => {
           expect(res.statusCode).toBe(200);
           expect(err).toBeNull();
           expect(body).toContain("Flairs");
           expect(body).toContain(this.flair.name);
           done();
         });
     });

  });

  describe("GET /flair/new", () => {

    it("should render a new flair form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Flair");
        done();
      });
    });

  });


  describe("POST /flair/create", () => {
     const options = {
       url: `${base}create`,
       form: {
         name: "sky",
         color: "Blue"
       }
     };

     it("should create a new flair and redirect", (done) => {
       request.post(options,(err, res, body) => {
    //  request.get(`${base}create?title=${options.form.title}&description=${options.form.description}`, (err, res, body) => {

           Flair.findOne({where: {name: "sky"}})
           .then((flair) => {
             expect(res.statusCode).toBe(303);
             expect(flair.name).toBe("sky");
             expect(flair.color).toBe("Blue");
             done();
           })
           .catch((err) => {
             console.log(err);
             done();
           });
         }
       );
     });
   });

   describe("GET /flair/:id", () => {

     it("should render a view with the selected flair", (done) => {
       request.get(`${base}${this.flair.id}`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain(this.flair.color);
         done();
       });
     });

   });


    describe("POST /flair/:id/destroy", () => {

     it("should delete the flair with the associated ID", (done) => {
       Flair.all()
       .then((flairs) => {
         const flairCountBeforeDelete = flairs.length;
         expect(flairCountBeforeDelete).toBe(1);
         request.post(`${base}${this.flair.id}/destroy`, (err, res, body) => {
           Flair.all()
           .then((flairs) => {
             expect(err).toBeNull();
             expect(flairs.length).toBe(flairCountBeforeDelete - 1);
             done();
           })

         });
       });
     });
   });

   describe("GET /flair/edit?topic", () => {

     it("should render a view with an edit flair form", (done) => {
       request.get(`${base}${this.flair.id}/edit`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Edit Flair");
         expect(body).toContain(this.flair.name);
         done();
       });
     });

   });

   describe("POST /flair/:id/update", () => {

      it("should update the flair with the given values", (done) => {
         const options = {
            url: `${base}${this.flair.id}/update`,
            form: {
              name: "bloody",
              description: "reddy"
            }
          };
 //#
          request.post(options,(err, res, body) => {
      //   request.get(`${options.url}/?title=${options.form.title}&description=${options.form.description}`, (err, res, body) => {


            expect(err).toBeNull();
 //#2
            Flair.findOne({
              where: { id: this.flair.id }
            })
            .then((flair) => {
              expect(flair.name).toBe("bloody");
              done();
            });
          });
      });

    });


});

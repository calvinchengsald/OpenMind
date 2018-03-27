
const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisement/";

const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisement", () => {

  beforeEach((done) => {
      this.advertisement;
      sequelize.sync({force: true}).then((res) => {

       Advertisement.create({
         title: "Philly amazing cheesesteak",
         description: "The chessiest philly cheeseteak you will ever taste"
       })
        .then((advertisement) => {
          this.advertisement = advertisement;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });

      });

  });

  describe("GET /advertisement", () => {

      it("should return a status code 200 and all ads", (done) => {
//#3
         request.get(base, (err, res, body) => {
           expect(res.statusCode).toBe(200);
           expect(err).toBeNull();
           expect(body).toContain("Advertisements");
           expect(body).toContain("Philly amazing cheesesteak");
           done();
         });
     });

  });

  describe("GET /advertisement/new", () => {

    it("should render a new advertisement form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Advertisement");
        done();
      });
    });

  });


  describe("POST /advertisement/create", () => {
     const options = {
       url: `${base}create`,
       form: {
         title: "blink-182 ads",
         description: "What's your favorite blink-182 ad?"
       }
     };

     it("should create a new advertisement and redirect", (done) => {
       request.post(options,(err, res, body) => {
    //  request.get(`${base}create?title=${options.form.title}&description=${options.form.description}`, (err, res, body) => {

           Advertisement.findOne({where: {title: "blink-182 ads"}})
           .then((advertisement) => {
             //expect(res.statusCode).toBe(303);
             expect(advertisement.title).toBe("blink-182 ads");
             expect(advertisement.description).toBe("What's your favorite blink-182 ad?");
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

   describe("GET /advertisement/:id", () => {

     it("should render a view with the selected advertisement", (done) => {
       request.get(`${base}${this.advertisement.id}`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Philly amazing cheesesteak");
         done();
       });
     });

   });


    describe("POST /advertisement/:id/destroy", () => {

     it("should delete the advertisement with the associated ID", (done) => {
       Advertisement.all()
       .then((advertisements) => {
         const adCountBeforeDelete = advertisements.length;
         expect(adCountBeforeDelete).toBe(1);
         request.post(`${base}${this.advertisement.id}/destroy`, (err, res, body) => {
           Advertisement.all()
           .then((advertisements) => {
             expect(err).toBeNull();
             expect(advertisements.length).toBe(adCountBeforeDelete - 1);
             done();
           })

         });
       });
     });
   });

   describe("GET /advertisement/edit?topic", () => {

     it("should render a view with an edit advertisement form", (done) => {
       request.get(`${base}${this.advertisement.id}/edit`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Edit Advertisement");
         expect(body).toContain("Philly amazing cheesesteak");
         done();
       });
     });

   });

   describe("POST /advertisement/:id/update", () => {

      it("should update the advertisement with the given values", (done) => {
         const options = {
            url: `${base}${this.advertisement.id}/update`,
            form: {
              title: "Edited add",
              description: "some edit"
            }
          };
 //#
          request.post(options,(err, res, body) => {
      //   request.get(`${options.url}/?title=${options.form.title}&description=${options.form.description}`, (err, res, body) => {


            expect(err).toBeNull();
 //#2
            Advertisement.findOne({
              where: { id: this.advertisement.id }
            })
            .then((advertisement) => {
              expect(advertisement.title).toBe("Edited add");
              done();
            });
          });
      });

    });


});

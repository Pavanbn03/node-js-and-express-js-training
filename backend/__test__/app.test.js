import chai, { expect } from "chai";
import chaiHttp from "chai-http";
var should = require("chai").should();
chai.use(chaiHttp);
chai.use(require("chai-like"));
chai.use(require("chai-things"));
let server = "http://localhost:5000/api/courses";

// describe("/GET courses", () => {
//   it("it should GET all the courses", (done) => {
//     chai
//       .request(server)
//       .get("/")
//       .end((err, res) => {
//         expect(res.status).to.eql(200);
//         res.body.should.be.a("array");
//         expect(res.body.length).to.be.equal(4);
//         expect(res.body)
//           .to.be.an("array")
//           .that.contains.something.like({ author: "Bharath" });
//         expect(res.body)
//           .to.be.an("array")
//           .to.include.something.that.has.property("author");
//
// expect(res.type).to.equal("application/json");
//         done();
//       });
//   });
// });
// describe("/POST courses", () => {
//   it("it should create new course", (done) => {
//     chai
//       .request(server)
//       .post("/")
//       .send({
//         name: "AngularJS",
//         author: "Naveen",
//         tags: "front-end",
//         isPublished: true,
//       })
//       .end((err, res) => {
//         expect(res.status).to.eql(200);
//         done();
//       });
//   });
// });

// describe("/PUT courses", () => {
//   it("it should update the author name", (done) => {
//     chai
//       .request(server)
//       .put("/60c6d26c0440680384a676d5")
//       .send({ name: "ReactJS", author: "Pavan B N" })
//       .end((err, res) => {
//         expect(res.status).to.eql(200);
//         res.body.should.have.property("author").eql("Pavan B N");
//         res.body.should.have.property("name").eql("ReactJS");
//         res.body.should.have.property("tags");
//         res.body.should.have.property("isPublished");
//         expect(res.type).to.equal("application/json");

//         // res.body.should.have.property("details");
//         // const message = res.body["details"];
//         // expect(message[0].message.includes('"name" is required')).to.equal(
//         //   true
//         // );
//         done();
//       });
//   });
// });

// describe("/DELETE courses", () => {
//   it("it should delete a course", (done) => {
//     chai
//       .request(server)
//       .delete("/60c6d26c0440680384a676d5")

//       .end((err, res) => {
//         expect(res.status).to.eql(200);
//         expect(res.body._id).to.eql("60c6d26c0440680384a676d5");
//         // expect(res.text).to.eql("Not found");
//         done();
//       });
//   });
// });

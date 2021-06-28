let chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { expect } = chai;
let server = "http://localhost:5000/api/courses";

// describe("/GET courses", () => {
//   it("it should GET all the courses", (done) => {
//     chai
//       .request(server)
//       .get("/")
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
//         name: "ReactJS2",
//         author: "Pavan B N",
//         tags: "front-end",
//         isPublished: true,
//       })
//       .end((err, res) => {
//         expect(res.status).to.eql(200);
//         done();
//       });
//   });
// });

// describe("/DELETE courses", () => {
//   it("it should delete a course", (done) => {
//     chai
//       .request(server)
//       .delete("/60d996f83a687661f8490872")

//       .end((err, res) => {
//         expect(res.body._id).to.eql("60d996f83a687661f8490872");
//         done();
//       });
//   });
// });

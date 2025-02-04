/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/// <reference types="cypress" />

describe("Delete Request", () => {
  it("Delete a post via /posts api", () => {
    cy.request({
      method: "DELETE",
      url: "http://localhost:3000/posts/53"
    }).then((response) => {
      expect(response.status).to.eql(200);
    });
  });
});

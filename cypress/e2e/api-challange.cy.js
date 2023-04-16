/* eslint-disable no-array-constructor */
/* eslint-disable no-var */
/* eslint-disable dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/// <reference types="cypress" />

describe("Post, Get, Delete Request", () => {
  // random title by chatGPT
  const phrases = [
    "Great work!",
    "Awesome job!",
    "Well done!",
    "Nice job!",
    "Keep it up!",
    "Bravo!",
    "Excellent!",
    "Impressive!",
    "Youre doing great!",
    "Fantastic!",
    "Kudos!",
    "Outstanding!",
    "Superb!",
    "Thumbs up!",
    "Youre on fire!",
    "Amazing!",
    "Very impressive!",
    "Youre a rockstar!",
    "Terrific work!",
    "High five!",
  ];
  
  function generateRandomComment() {
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    return phrase;
  }
  
  console.log(generateRandomComment()); // Example output: "Great work!"
  
  const randomComments = generateRandomComment();
  let commentOfPosts = new Array();
  let randomPostId = Math.floor(Math.random() * 1000 + 1);;
  

  it("Create a new comment", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/comments",
      body: {
          body: randomComments,
          postId: randomPostId,
      }
    }).then(response => {
        expect(response.status).to.eql(201)
    })
  });

  it("Locate and assert the new comment", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/comments",
      headers: {
          accept: "application/json"
      }
  }).then(response => {
      let body = JSON.parse(JSON.stringify(response.body));
      body.forEach(function(item) {
        commentOfPosts.push(item["body"]);
      })
      cy.log(commentOfPosts.length)
      cy.log(commentOfPosts[commentOfPosts.length])
      cy.log(commentOfPosts[commentOfPosts.length-1])

  }).then(() => {
      let latesComments = commentOfPosts[commentOfPosts.length-1]
      expect(latesComments).to.eq(randomComments);
  })
  });

  it("Delete the new comment", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:3000/comments/${commentOfPosts.length}`
    }).then((response) => {
      expect(response.status).to.eql(200);
    });
  });
});
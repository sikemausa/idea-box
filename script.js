var titleInput = $('.title').val();
var bodyInput = $('.body');
var ideaStore = [];
var storedData = localStorage.getItem("ideaArray");
var displayObject = JSON.parse(storedData);

$('html').on('pageinit', function() {
    loadIdeas();
})

function loadIdeas(){
  alert('something');
}


function addIdea(){
  var title = $('.title').val();
  var body = bodyInput.val();
  var creativeThought = new Idea();
  ideaStore.push(creativeThought);
  return $('.ideacontainer ul').prepend("<li>" +
                                    "<article>" +
                                       "<input class = 'deleteButton' type = 'image' src = 'images/delete.svg' width = 20 height = 20>" +
                                       "<p>" + title + "</p>" +
                                       "<p>"+ body + "</p>" +
                                       "<input class = 'thumbsup' type = 'image' src='images/upvote.svg' width = 20 height = 20>" +
                                       "<input class = 'thumbsdown' type = 'image' src='images/downvote.svg' width = 20 height = 20>" +
                                       "<div class = 'ranking'>ranking: swill</div>" +
                                     "</article>" +
                                   "</li>");
}

function Idea(title, body, id) {
  this.title = $('.title').val();;
  this.body = $('.body').val();
  this.id = Date.now();
}

$('.save').on('click', function(){
  addIdea();
  commitToLocalStorage();
});

function commitToLocalStorage() {
  localStorage.setItem("ideaArray", JSON.stringify(ideaStore));
}




  if (storedData) {
    ideaStore = JSON.parse(storedData);}
    // for (i=0; i<ideaStore.length;i++){
    //   $('.ideacontainer ul').prepend("<li>" +
    //                                     "<article>" +
    //                                        "<input class = 'deleteButton' type = 'image' src = 'images/delete.svg' width = 20 height = 20>" +
    //                                        "<p>" + title + "</p>" +
    //                                        "<p>"+ body + "</p>" +
    //                                        "<input class = 'thumbsup' type = 'image' src='images/upvote.svg' width = 20 height = 20>" +
    //                                        "<input class = 'thumbsdown' type = 'image' src='images/downvote.svg' width = 20 height = 20>" +
    //                                        "<div class = 'ranking'>ranking: swill</div>" +
    //                                      "</article>" +
    //                                    "</li>");
    // }

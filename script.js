var titleInput = $('.title');
var bodyInput = $('.body');
var ideaStore = [];
var quality = 1;
var $idealist = $('.ideacontainer ul');

// $(document).ready(function() {
//     var displayObject = JSON.parse(localStorage.getItem("ideaStore"));
//     if (displayObject) {
//       ideaStore = displayObject;}
//     loadIdeas();
// });
//
// function loadIdeas(){
//   for (var i = 0; i < ideaStore.length; i++) {
//     var storedIdea = ideaStore[i];
//
//     $("ul").append(
//       "<li>" +
//       "<article class='template'>" +
//       "<input class = 'deleteButton' type = 'image' src='images/delete.svg' width = 20 height = 20>" +
//       "<p>" + storedIdea.title + "</p>" +
//       "<p>"+ storedIdea.body + "</p>" +
//       "<input class = 'thumbsUp' type = 'image' src='images/upvote.svg' width = 20 height = 20>" +
//       "<input class = 'thumbsDown' type = 'image' src='images/downvote.svg' width = 20 height = 20>" +
//       "<div class = 'ranking'>ranking: swill</div>" +
//       "</article>" +
//       "</li>");
//     }
//   }
//
//
// function addIdea(){
//   var title = $('.title').val();
//   var body = bodyInput.val();
//   var creativeThought = new Idea();
//   ideaStore.push(creativeThought);
//   return $('.ideacontainer ul').prepend("<li>" +
//                                     "<article class='template'>" +
//                                        "<input class = 'deleteButton' type = 'image' src='images/delete.svg' width = 20 height = 20>" +
//                                        "<p>" + title + "</p>" +
//                                        "<p>"+ body + "</p>" +
//                                        "<input class = 'thumbsUp' type = 'image' src='images/upvote.svg' width = 20 height = 20>" +
//                                        "<input class = 'thumbsDown' type = 'image' src='images/downvote.svg' width = 20 height = 20>" +
//                                        "<div class = 'ranking'>ranking: swill</div>" +
//                                      "</article>" +
//                                    "</li>");
// }
//
// function Idea(title, body, id) {
//   this.title = $('.title').val();;
//   this.body = $('.body').val();
//   this.id = Date.now();
// }
//
// $('.save').on('click', function(){
//   addIdea();
//   commitToLocalStorage();
//   clearInputs();
// });
//
// function clearInputs() {
//   $('.title').val('');
//   $('.body').val('');
// }
//
// function commitToLocalStorage() {
//   localStorage.setItem("ideaStore", JSON.stringify(ideaStore)); }
//
//   $('.ideacontainer ul').on('click', '.deleteButton', function() {
//       $(this).parents('.template').remove();
// });
//
//
//     // for (i=0; i<ideaStore.length;i++){
//     //   $('.ideacontainer ul').prepend("<li>" +
//     //                                     "<article>" +
//     //                                        "<input class = 'deleteButton' type = 'image' src = 'images/delete.svg' width = 20 height = 20>" +
//     //                                        "<p>" + title + "</p>" +
//     //                                        "<p>"+ body + "</p>" +
//     //                                        "<input class = 'thumbsup' type = 'image' src='images/upvote.svg' width = 20 height = 20>" +
//     //                                        "<input class = 'thumbsdown' type = 'image' src='images/downvote.svg' width = 20 height = 20>" +
//     //                                        "<div class = 'ranking'>ranking: swill</div>" +
//     //                                      "</article>" +
//     //                                    "</li>");
//     // }



function Idea (name, body, id, quality) {
  this.name = name;
  this.body = body;
  this.id = (id || Date.now());
  this.quality = (quality || 'swill');
}

var IdeasContainer = {
  ideas:[],

  store: function(){
    localStorage.setItem('ideas', JSON.stringify(this.ideas));
  },

  retrieve: function() {
    var retrieveIdeas = JSON.parse(localStorage.getItem('ideas'));
    if (retrieveIdeas) {
      for (var i = 0; i < retrieveIdeas.length; i++) {
var idea = retrieveIdeas[i];
this.ideas.push(new Idea(idea.name, idea.body, idea.id, idea.quality));
      }
    }
  },

  add: function(name, body){
    this.ideas.push(new Idea(name, body));
    this.store();
  },

  remove: function(id){
    id = psarseInt(id);
    this.ideas = this.ideas.filter(function(idea){
      return idea.id !== id;
    });
    this.store();
    this.render();
  },

  render: function() {
    this.ideas.forEach(function(idea){
      $idealist.append(`
<li>
<article class='template'>
<input class='deleteButton' type='image' src='images/delete.svg' width='20px' height='20px'>
<p>${idea.name}</p>
<p>${idea.body}</p>
<input class='thumbsUp' type='image' src='images/upvote.svg' width='20px' height='20px'>
<input class='thumbsDown' type='image' src='images/downvote.svg' width='20' height='20'>
<div class='ranking'>ranking: swill</div>
</article>
</li>
`);
      });
    },

  display: function() {
    this.idea
    },

  };

$('.save').on('click', function(){
  IdeasContainer.add($('.title').val(), $('.body').val());

});

$('document').ready(function () {
  IdeasContainer.retrieve();
  IdeasContainer.render();
});

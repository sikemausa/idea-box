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



function Idea (title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.id = (id || Date.now());
  this.quality = (quality || 'swill');
}

var IdeasRepo = {
  _ideas:[],

  store: function(){
    localStorage.setItem('ideas', JSON.stringify(this._ideas));
  },

  add: function(title, body){
    this._ideas.push(new Idea(title, body));
    this.store();
  },

  retrieve: function() {
    var retrieveIdeas = JSON.parse(localStorage.getItem('ideas'));
    if (retrieveIdeas){
      this._ideas = retrieveIdeas.map(function (idea){
         return new Idea(idea.title, idea.body, idea.id, idea.quality);
         });
    };
  },

  remove: function(id){
    id = parseInt(id);
    this._ideas = this._ideas.filter(function(idea){
      return idea.id !== id;
    });
    this.store();
  },

  clear: function(){
      $('.title').val('');
      $('.body').val('');
  },

  renderOnSave: function() {
    $idealist.html('');
    this._ideas.forEach(function(idea){
      $idealist.prepend(`
        <li id='${idea.id}'>
        <article class='template'>
        <input class='deleteButton' type='image' src='images/delete.svg' width='20px' height='20px'>
        <p>${idea.title}</p>
        <p>${idea.body}</p>
        <input class='thumbsUp' type='image' src='images/upvote.svg' width='20px' height='20px'>
        <input class='thumbsDown' type='image' src='images/downvote.svg' width='20' height='20'>
        <div class='ranking'>ranking: </div>
        </article>
        </li>
        `);
      });
    },


    renderOnLoad: function() {
      $idealist.html('');
      this._ideas.forEach(function(idea){
        $idealist.append(`
          <li id='${idea.id}'>
          <article class='template'>
          <input class='deleteButton' type='image' src='images/delete.svg' width='20px' height='20px'>
          <p>${idea.title}</p>
          <p>${idea.body}</p>
          <input class='thumbsUp' type='image' src='images/upvote.svg' width='20px' height='20px'>
          <input class='thumbsDown' type='image' src='images/downvote.svg' width='20' height='20'>
          <div class='ranking'>ranking: </div>
          </article>
          </li>
          `);
        });
      },

      buttonUp: function() {
        if (this._ideas.filter(function(idea) {
          return true;
        }));
      },




  };


$('.save').on('click', function(){
  IdeasRepo.add($('.title').val(), $('.body').val());
  IdeasRepo.renderOnSave();
  IdeasRepo.clear();
});

$('.ideacontainer ul').on('click', '.thumbsUp', function() {
  IdeasRepo.buttonUp();
});

$('ul').on('click', '.deleteButton', function() {
  var id = parseInt(this.closest('li').id);
  IdeasRepo.remove(id); // We need to traverse to the correct part of the DOM to find the id in the html of this particular idea
  $(this).parents('.template').remove();
});



$('document').ready(function () {
  IdeasRepo.retrieve();
  IdeasRepo.renderOnLoad();
});

var titleInput = $('.title');
var bodyInput = $('.body');
var ideaStore = [];
var quality = 1;
var $idealist = $('.ideacontainer ul');

$(document).ready(function() {
    var displayObject = JSON.parse(localStorage.getItem("ideaStore"));
    if (displayObject) {
      ideaStore = displayObject;}
    loadIdeas();
});

function loadIdeas(){
  for (var i = 0; i < ideaStore.length; i++) {
    var storedIdea = ideaStore[i];

    $("ul").append(
      "<li>" +
      "<article class='template'>" +
      "<input class = 'deleteButton' type = 'image' src='images/delete.svg' width = 20 height = 20>" +
      "<p>" + storedIdea.title + "</p>" +
      "<p>"+ storedIdea.body + "</p>" +
      "<input class = 'thumbsUp' type = 'image' src='images/upvote.svg' width = 20 height = 20>" +
      "<input class = 'thumbsDown' type = 'image' src='images/downvote.svg' width = 20 height = 20>" +
      "<div class = 'ranking'>ranking: swill</div>" +
      "</article>" +
      "</li>");
    }
  }


function addIdea(){
  var title = $('.title').val();
  var body = bodyInput.val();
  var creativeThought = new Idea();
  ideaStore.push(creativeThought);
  return $('.ideacontainer ul').prepend("<li>" +
                                    "<article class='template'>" +
                                       "<input class = 'deleteButton' type = 'image' src='images/delete.svg' width = 20 height = 20>" +
                                       "<p>" + title + "</p>" +
                                       "<p>"+ body + "</p>" +
                                       "<input class = 'thumbsUp' type = 'image' src='images/upvote.svg' width = 20 height = 20>" +
                                       "<input class = 'thumbsDown' type = 'image' src='images/downvote.svg' width = 20 height = 20>" +
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
  clearInputs();
});

function clearInputs() {
  $('.title').val('');
  $('.body').val('');
}

function commitToLocalStorage() {
  localStorage.setItem("ideaStore", JSON.stringify(ideaStore)); }

  $('.ideacontainer ul').on('click', '.deleteButton', function() {
      $(this).parents('.template').remove();
});


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


        // function thumbsUp {
        //     var
        // }
        //
        // $('.thumbsUp').on('click', function() {
        //
        // })

        function Idea (name, id, quality, body) {
            this.name = name;
            this.id = (id || Date.now());
            this.quality = (quality || 'swill');
            this.body = body;
        }

        var IdeasContainer = {
          ideas:[],

          store: function(){
            localStorage.setItem('ideas', JSON.stringify(this.ideas));
          },

          retrieve: function() {
            var retrieveIdeas = JSON.parse(localStorage.getItem('ideas'));
              if (retrieveIdeas)
                for(var i = 0; i < retrieveIdeas; i++){
                  var idea = retrieveIdeas[i];
                  this.ideas.push(new Idea(idea.name, idea.id, idea.quality, idea.body));
                }
          },

          add: function(name){
            this.ideas.push(new Idea(name));
            this.store();
          },

        remove: function(id){
          id = psarseInt(id);
          this.ideas = this.ideas.filter(function(idea){
              return idea.id !== id;
            });

          this.store();
        },

        render: function(){
          this.ideas.forEach(function(idea){
            $idealist.prepend("<li>" +
                                "<article>" +
                                   "<input class = 'deleteButton' type = 'image' src = 'images/delete.svg' width = 20 height = 20>" +
                                   "<p>" + idea.name + "</p>" +
                                   "<p>"+ idea.body + "</p>" +
                                   "<input class = 'thumbsup' type = 'image' src='images/upvote.svg' width = 20 height = 20>" +
                                   "<input class = 'thumbsdown' type = 'image' src='images/downvote.svg' width = 20 height = 20>" +
                                   "<div class = 'ranking'>ranking: swill</div>" +
                                 "</article>" +
                               "</li>");
          });
        },



        };

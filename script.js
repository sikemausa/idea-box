var titleInput = $('.title');
var bodyInput = $('.body');
// var ideaStore = [];
// var quality = 1;
var $idealist = $('.ideacontainer ul');

function Idea (title, body, id = Date.now(), quality = 'swill') {
  this.title = title;
  this.body = body;
  this.id = id;
  this.quality = quality;
}

var IdeasRepo = {
  _ideas:[],

  store: function(){
    localStorage.setItem('ideas', JSON.stringify(this._ideas));
    this.retrieve();
  },

  add: function(title, body){
    this._ideas.unshift(new Idea(title, body));
    this.store();
  },

  retrieve: function() {
    var retrieveIdeas = JSON.parse(localStorage.getItem('ideas'));
    if (retrieveIdeas){
      this._ideas = retrieveIdeas.map(function (idea){
         return new Idea(idea.title, idea.body, idea.id, idea.quality);
         });
    }
    this.render();
    // this.renderOnSave();
  },

  render: function() {
    $idealist.html('');
    this._ideas.forEach(function(idea){
      $idealist.append(`
        <li id='${idea.id}'>
          <article class='template'>
            <input class='deleteButton' type='image' src='images/delete.svg' width='20px' height='20px'>
            <p class = "titlehtml" contenteditable = "true">${idea.title}</p>
            <p class = "bodyhtml" contenteditable = "true">${idea.body}</p>
            <input class='thumbsUp' type='image' src='images/upvote.svg' width='20px' height='20px'>
            <input class='thumbsDown' type='image' src='images/downvote.svg' width='20' height='20'>
            <div class='ranking'>ranking: ${idea.quality}</div>
            </article>
        </li>
        `);
      });
    },

  remove: function(id){
    id = parseInt(id);
    this._ideas = this._ideas.filter(function(idea){
      return idea.id !== id;
    });
    this.store();
  },

  // findId: function(title, body, id) {
  //   return this._ideas.find(function(title, body)
  //     idea.title === title;
  //     idea.body ===body;
  //   );
  //   return this._ideas.find(function(idea){
  //     return idea.id === id;
  //   });
  // },

  findId: function(id) {
    return this._ideas.find(function(idea){
      return idea.id === id;
    });
  },


  //   find the id quality for the instance object
  //   replace the quality based on what it is using IF statements or FOR loop
  //   restore the new quality in localStorage
  //   display new quality in DOM

  upVote: function(id) {
    id = parseInt(id);  // finding id for specific instance for that object
    var upgradingQuality = IdeasRepo.findId(id);
    if (upgradingQuality.quality == 'plausible') {
      upgradingQuality.quality = 'genius';
      } else if (upgradingQuality.quality == 'swill') {
      upgradingQuality.quality = 'plausible';
      } else {
      upgradingQuality.quality = 'genius';
      }
      return this.store();
  },

  downVote: function(id) {
    id = parseInt(id);  // finding id for specific instance for that object
    var upgradingQuality = IdeasRepo.findId(id);
    if (upgradingQuality.quality == 'genius') {
      upgradingQuality.quality = 'plausible';
    } else if (upgradingQuality.quality == 'plausible') {
      upgradingQuality.quality = 'swill';
      } else {
      upgradingQuality.quality = 'swill';
      }
      return this.store();
  },

  clear: function() {
    $('.title').val('');
    $('.body').val('');
  },

  search: function(title, body) {
    var filter = $(this).val();
    $('.idea').each(function() {
      if($(this).text().search(new RegExp(filter, 'i')) < 0) {
        $(this).fadeOut();
      }
      else {
        $(this).fadeIn();
      }
    });
  },

  // for (var i=0; i < myArray.length; i++) {
  //   if (myArray[i].name === nameKey) {
  //     return myArray[i];
  //   }
  // }



    // renderOnLoad: function() {
    //   $idealist.html('');
    //   this._ideas.forEach(function(idea){
    //     $idealist.append(`
    //       <li id='${idea.id}'>
    //       <article class='template'>
    //       <input class='deleteButton' type='image' src='images/delete.svg' width='20px' height='20px'>
    //       <p>${idea.title}</p>
    //       <p>${idea.body}</p>
    //       <input class='thumbsUp' type='image' src='images/upvote.svg' width='20px' height='20px'>
    //       <input class='thumbsDown' type='image' src='images/downvote.svg' width='20' height='20'>
    //       <div class='ranking'>ranking: ${idea.quality}</div>
    //       </article>
    //       </li>
    //       `);
    //     });
    //   },

  };


$('.save').on('click', function(){
  IdeasRepo.add($('.title').val(), $('.body').val());
  IdeasRepo.render();
  // IdeasRepo.renderOnSave();
  IdeasRepo.clear();
});

$('ul').on('click', '.thumbsUp', function() {
  var id = parseInt(this.closest('li').id);
  IdeasRepo.upVote(id);
});

$('ul').on('click', '.thumbsDown', function() {
  var id = parseInt(this.closest('li').id);
  IdeasRepo.downVote(id);
});

$('ul').on('click', '.deleteButton', function() {
  var id = parseInt(this.closest('li').id);
  IdeasRepo.remove(id); // We need to traverse to the correct part of the DOM to find the id in the html of this particular idea
  $(this).parents('.template').remove();
});

$('.search').on('keyup', function () {
  IdeasRepo.search();
});

$('document').ready(function () {
  IdeasRepo.retrieve();
  IdeasRepo.render();
  // IdeasRepo.renderOnLoad();
});

$("ul").on('keydown', '.titlehtml', function(e) {
    if(e.keyCode == 13)
    {
        e.preventDefault();
        $(this).focusout();
    }
});

$("ul").on('keydown', '.bodyhtml', function(e) {
    if(e.keyCode == 13)
    {
        e.preventDefault();
        $(this).focusout();
    }
});

$("ul").on('focusout', '.titlehtml', function(e) {
  var id = parseInt(this.closest('li').id);
  var retrieve = JSON.parse(localStorage.getItem('ideas'));
  var title = this.textContent;
  for (var i = 0; i < retrieve.length; i++) {
    if (retrieve[i].id === id){
      retrieve[i].title = title;
    }
  }
  localStorage.setItem('ideas', JSON.stringify(retrieve));
  this.blur();
});

$("ul").on('focusout', '.bodyhtml', function(e) {
  var id = parseInt(this.closest('li').id);
  var retrieve = JSON.parse(localStorage.getItem('ideas'));
  var body = this.textContent;
  for (var i = 0; i < retrieve.length; i++) {
    if (retrieve[i].id === id){
      retrieve[i].body = body;
    }
  }
  localStorage.setItem('ideas', JSON.stringify(retrieve));
  this.blur();
});

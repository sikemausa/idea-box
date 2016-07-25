var titleInput = $('.title');
var bodyInput = $('.body');
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
  },

  render: function() {
    $idealist.html('');
    this._ideas.forEach(function(idea){
      $idealist.append(`
        <li id='${idea.id}'>
          <article class='template'>
            <button class='delete-button'></button>
            <h3 class = "titlehtml" contenteditable = "true">${idea.title}</h3>
            <p class = "bodyhtml" contenteditable = "true">${idea.body}</p>
            <button class='thumbsUp' type='image'></button>
            <button class='thumbsDown' type='image'></button>
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

  findId: function(id) {
    return this._ideas.find(function(idea){
      return idea.id === id;
    });
  },

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
    $('.search-idea').val('');
  },
};

$('.save').on('click', function(){
  IdeasRepo.add($('.title').val(), $('.body').val());
  IdeasRepo.render();
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

$('ul').on('click', '.delete-button', function() {
  var id = parseInt(this.closest('li').id);
  IdeasRepo.remove(id); // We need to traverse to the correct part of the DOM to find the id in the html of this particular idea
  $(this).parents('.template').remove();
});

$('document').ready(function () {
  IdeasRepo.retrieve();
  IdeasRepo.render();
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
  IdeasRepo.retrieve();
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
  IdeasRepo.retrieve();
  this.blur();
});

$('.search-idea').on('keyup', function(event) {
  var searchContent = $(this).val().toLowerCase();
  $('li').each(function() {
    if ($(this).text().search(new RegExp(searchContent, 'i')) < 0) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });
});

var titleInput = $('.title');
var bodyInput = $('.body');
var idea = [];

$('.save').on('click', function(){
  idea.push(addIdea());       //we want to add the output of addIdea() to the array "idea"
});

function addIdea(){
  var title = $('.title').val();
  var body = bodyInput.val();
  return $('.ideacontainer ul').prepend("<li>" +
                                    "<article>" +
                                       "<p>" + title + "</p>" +
                                       "<p>"+ body + "</p>" +
                                       "<input class = 'thumbsup' type = 'image' src='images/upvote.svg' width = 20 height = 20>" +
                                       "<input class = 'thumbsdown' type = 'image' src='images/downvote.svg' width = 20 height = 20>" +
                                       "<div class = 'ranking'>ranking: swill</div>" +
                                     "</article>" +
                                   "</li>");
}

localStorage.setItem("ideaArray", JSON.stringify(idea));

var storedData = localStorage.getItem("idea");
if (storedData) {
    idea = JSON.parse(storedData);
}

// Get references to page elements
var $category = $("#title");
var $postContent = $("#postContent");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
$(document).ready(function(){
  $('.sidenav').sidenav();
  $('.modal').modal();
  $('.dropdown-trigger').dropdown();

  // $('input#input_text, textarea#textarea2').characterCounter();
});
      

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(post) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/posts",
      data: JSON.stringify(post)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/posts",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/posts/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var posts = data.map(function(post) {
      var $a = $("<a>")
        .title(post.title)
        .attr("href", "/post/" + post.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": post.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append(posts);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Saveß the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var post = {
    title: $category.val().trim(),
    body: $postContent.val().trim()
  };

  if (!(post.title && post.body)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(post).then(function() {
    refreshExamples();
  });

  $category.val("");
  $postContent.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit, console.log("submit btn working"));
$exampleList.on("click", ".delete", handleDeleteBtnClick);

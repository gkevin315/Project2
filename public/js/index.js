// Get references to page elements
var $title = $("#title");
var $postContent = $("#postContent");
var $category = $("#category");
var $submitBtn = $("#submit");
var $postList = $("#post-list");
var dropdown1 = $("#dropdown1");

$(document).ready(function () {
  $('.sidenav').sidenav();
  $('.modal').modal();
  $('.dropdown-trigger').dropdown();
  $('textarea#postContent').characterCounter();
  $('input#title, input#category').characterCounter();
  // $('.parallax').parallax();

  // $('input#input_text, textarea#textarea2').characterCounter();
});


// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (post) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/posts",
      data: JSON.stringify(post)
    });
  },

  // saveCatergory: function(catergory){
  //   return $.ajax({
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     type: "POST",
  //     url: "api/category",
  //     data: JSON.stringify(category)
  //   });
  // },

  getExamples: function () {
    return $.ajax({
      url: "api/posts",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/posts/" + id,
      type: "DELETE"
    });
  }
};


// var getCategories = function(){
//   $("#categoriesdrop").append(post.category);
// }

console.log("posts working");

// Adding new categories to the categories dropdown
//adding two empty variables to sort the data and not have repeating categories..
var catArr = [];
var catObjMap = {};
var addNewCategories = function () {
  API.getExamples().then(function (data) {
    for (var i = 0; i < data.length; i++) {
      var categories = data[i].category;
      if (catObjMap[categories] === undefined) {
        catObjMap[categories] = categories;
        catArr.push(categories);
      }
    }
    console.log('hello');
    var $cat = catArr.map(function (cat) {
      console.log(cat);
    //  console.log(post);
      var $c = $("<a>")
        .text(cat)
        .attr("href", "/post/" + cat);

      var $li = $("<li>")
        .attr({
          class: "dropdown-contents",
          "data-id": cat
        })
        .append($c);
   
      return $li;
    });
    dropdown1.empty();
    dropdown1.append($cat);
  });
};


// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $posts = data.map(function (post) {
      var $a = $("<a>")
        .text(post.title)
        .attr("href", "/post/" + post.id);

      var $b = $("<a>").text(post.body)
        .attr("href", "/post/" + post.id);

      var $c = $("<a>").text(post.category)
        .attr("href", "/post/" + post.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": post.id
        })
        .append("Title: ", $a, "<br> Post: ", $b, "<br> Category: ", $c);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");


      var thumbsUp = $("<button>").addClass("material-icons thumbsup").text("thumb_up").attr("id", "thumbsup"); 

      var thumbsDown = $("<button>").addClass("material-icons thumbsdown").text("thumb_down").attr("id", "thumbsdown");
      $li.append($button);
      $li.append(thumbsUp);
      $li.append(thumbsDown);


      return $li;
    });

    $postList.empty();
    $postList.append($posts);
    addNewCategories();
  });
};

// handleFormSubmit is called whenever we submit a new example
// Saveß the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var post = {
    title: $title.val().trim(),
    body: $postContent.val().trim(),
    category: $category.val().trim()
  };

  if (!(post.title && post.body && post.category)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(post).then(function () {
    refreshExamples();
  });

  $title.val("");
  $postContent.val("");
  $category.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

refreshExamples();

// saveCatergory();
// getCategories();

addNewCategories();

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit, console.log("submit btn working"));
$postList.on("click", ".delete", handleDeleteBtnClick);
// window.onload(href="/")



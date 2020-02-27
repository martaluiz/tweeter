/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    $(document).ready(function () {
      $('.tweets-container').prepend(createTweetElement(tweet));
    });

  }
}
const createTweetElement = function (tweet) {
  let $tweet = `
<article class="tweet">
        <header>
          <div>
            <img id="avatar" src="${tweet.user.avatars}"> </span>
            <h3>${tweet.user.name}</h3>
          </div>
          <div class="tweet-handle">
            <h3>${tweet.user.handle}</h3>
          </div>
        </header>
        <p>
        ${tweet.content.text}
        </p>
        <footer>
          <div>
            <h6>${moment(tweet['created_at']).fromNow()}</h6>
          </div>
          <div>
            <a>🏳️</a>
            <a>🔁</a>
            <a>💙</a>
          </div>
        </footer>
      </article>
`

  return $tweet;
}

$(document).ready(function () {

  function loadTweets() {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function (tweet) {
        renderTweets(tweet);
      }
    });
  }
  loadTweets();

  $('#tweet-form').submit(function (event) {
    // Stop the browser from submitting the form.
    event.preventDefault();

    // Validation, if empty or > 140 characters give error (Via alert)
    // Else, load tweets to the page using AJAX
    let length = $(this).find('#tweet-area').val().length;
    if (length === 0) {
      alert("OOps! Your tweet is empty! Must enter something. Get creative!");
      return;
    }
    else if (length > 140) {
      alert("OOps, your tweet is too long!");
      return;
    } else {

      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $(this).serialize(),
        success: function () {
          $('.tweets-container').empty();
          $('textarea').val('');
          $('.counter').html('140');
          loadTweets();
        }
      });
    }

  });

  $(".composeButton").click(() => {
    $(".new-tweet").slideToggle("slow");
    $(".new-tweet textarea").focus();
  });
  //The new tweet area is hidden until called upon
  $(".new-tweet").hide();
});

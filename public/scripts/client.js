/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

$(document).ready(() => {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
      $('.tweets-container').append(createTweetElement(tweet));
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

  renderTweets(data);

})
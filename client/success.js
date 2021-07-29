var urlParams = new URLSearchParams(window.location.search);
var sessionId = urlParams.get('session_id');



if (sessionId) {
  fetch('/checkout-session?sessionId=' + sessionId)
    .then(function (result) {
      return result.json();
    })
    .then(function (session) {
      var sessionJSON = JSON.parse(session.metadata.images);
      document.querySelector('pre').textContent = session.metadata.images;
    })
    .catch(function (err) {
      console.log('Error when fetching Checkout session', err);
    });
}

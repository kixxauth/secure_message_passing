// Add an event listener to our custom HTML element so we know when the test
// page has requested a URL.
document.getElementById("messenger").addEventListener("messagePassing", function(evt) {

      // Get the URL from the custom HTML element.
      var message = evt.target.getAttribute("message");

      // Send the URL to the background page using Chrome extension message
      // passing system.
      chrome.extension.sendRequest({loc: message}, function(response) {

        // When the background page responds, we create a new custom event to
        // notify our test page that the response has arrived.
        var messenger = document.getElementById("messenger"),
            messageEvent = document.createEvent('Event');

        // We attach the response text from the background page to our custom
        // HTML element.
        messenger.innerText = response.txt;

        // We initialize and dispatch our custom event to notify our test page
        // that the response has arrived.
        messageEvent.initEvent('messageResponse', true, true);
        messenger.dispatchEvent(messageEvent);
      });
    });

// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const heart = document.querySelector('.like-glyph');

const errorModal = document.getElementById('modal');

const errorMessage = document.querySelector('#modal-message');


// Add the .hidden class to the error modal in the HTML so it does not appear when the page first loads

errorModal.classList.add('hidden');


heart.addEventListener('click', () => {

  if (heart.classList.contains('activated-heart')) {

    // When a user clicks on a full heart

    heart.classList.remove('activated-heart');

    heart.classList.add('empty');

  } else {

    // When a user clicks on an empty heart

    mimicServerCall()

      .then((response) => {

        if (response.success) {

          // When the "server" returns a success status

          heart.classList.remove('empty');

          heart.classList.add('activated-heart');

        } else {

          // When the "server" returns a failure status

          errorModal.classList.remove('hidden');

          errorMessage.textContent = response.message;

          setTimeout(() => {

            errorModal.classList.add('hidden');

          }, 3000);

        }

      })

      .catch(() => {

        // Respond to the error using a .catch(() => {}) block after your .then(() => {}) block.

        errorModal.classList.remove('hidden');

        errorMessage.textContent = 'An error occurred. Please try again later.';

        setTimeout(() => {

          errorModal.classList.add('hidden');

        }, 3000);

      });

  }

});





//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

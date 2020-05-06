/*
 * Name: Eric Kim
 * Date: May 03, 2020
 * Section: CSE 154 AK
 *
 * This is the JS to manipulate the UI of the homepage with user's interactions.
 * This JS takes user's given artist and song name, and returns the appropriate
 * lyric.
 */

'use strict';
(function() {
  const BASE_URL = "https://api.lyrics.ovh/v1/";

  window.addEventListener('load', init);

  /**
   * Sets up the button in the homepage.
   * Appropriately manipulates the UI of the homepage
   * with user's input.
   */
  function init() {
    let button = document.querySelector('button');

    button.addEventListener('click', function() {
      let artist = document.getElementById('artist').value;
      let title = document.getElementById('title').value;
      if (artist !== '' && title !== '') {
        printData('Searching...');
        makeRequest();
      } else {
        printData('Please fill in the form!');
      }
    });
  }

  /**
   * Prints the lyrics in the homepage with the given
   * artist and song name in the input fields.
   */
  function makeRequest() {
    let artist = document.getElementById('artist').value;
    let title = document.getElementById('title').value;
    let url = BASE_URL + artist + '/' + title;

    fetch(url)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(processData)
      .catch(handleError);
  }

  /**
   * Prints the lyrics in the homepage with the given JSON data.
   * @param {JSONObject} responseData - the lyric data to print lyrics in the homepage.
   */
  function processData(responseData) {
    printData(responseData.lyrics);
  }

  /**
   * Checks the response status.
   * @param {Object} response - the response of the request to check the status.
   * @return {Object} response - the response of the request to check the status.
   * @throws {Error} will throw an error if the response code is not in the 200-299 range.
   */
  function checkStatus(response) {
    if (response.ok) {
      return response;
    } else {
      throw Error("Error in request: " + response.statusText);
    }
  }

  /**
   * Prints in the homepage that no definition was found.
   */
  function handleError() {
    printData('No Lyrics Found');
  }

  /**
   * Prints the given data in the homepage.
   * @param {String} data - the lyric of a song.
   */
  function printData(data) {
    let oldData = document.querySelector('p');
    let dataContainer = document.getElementById('lyrics');
    let dataParagraph = document.createElement('p');
    dataParagraph.textContent = data;

    dataContainer.replaceChild(dataParagraph, oldData);
  }

})();
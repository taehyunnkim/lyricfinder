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
   * Sets up the button in the homepage
   */
  function init() {
    let button = document.querySelector('button');
    button.addEventListener('click', makeRequest);
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
   * @param {JSONObject} responseData - the data to print lyrics in the homepage.
   */
  function processData(responseData) {
    printLyrics(responseData.lyrics);
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
    printLyrics('No Lyrics Found');
  }

  /**
   * Prints the lyrics in the homepage with the given data.
   * @param {String} data - the lyric of a song.
   */
  function printLyrics(data) {
    let oldLyrics = document.querySelector('p');
    let lyricsContainer = document.getElementById('lyrics');
    let lyrics = document.createElement('p');
    lyrics.textContent = data;

    lyricsContainer.replaceChild(lyrics, oldLyrics);
  }

})();
/* global data */
/* exported data */
var $urlInput = document.querySelector('.photo-url');
var $userPhoto = document.querySelector('.user-photo');

$urlInput.addEventListener('input', function (event) {
  var imageUrl = $urlInput.value;
  $userPhoto.src = imageUrl;
});

var $entryForm = document.querySelector('.entry-form');
var entryId = 0;

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var $title = $entryForm.elements['picture-title'].value;
  var $url = $entryForm.elements['photo-url'].value;
  var $notes = $entryForm.elements.notes.value;
  var entryForm = {
    title: $title,
    url: $url,
    notes: $notes,
    nextEntryId: data.nextEntryId,
    entryId: entryId
  };
  entryId++;
  data.entries.push(entryForm);
  data.nextEntryId++;
  $userPhoto.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();
});

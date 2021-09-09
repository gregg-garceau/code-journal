/* global data */
/* exported data */
var $urlInput = document.querySelector('.photo-url');
var $userPhoto = document.querySelector('.user-photo');
var $dataViewForm = document.querySelector('[data-view="entry-form"]');
var $dataViewEntries = document.querySelector('[data-view="entries"]');
var $entriesNav = document.querySelector('h3.journal-header');
var $newButton = document.querySelector('.new-entry');
var $unorderedList = document.querySelector('.entries-list');

$urlInput.addEventListener('input', function (event) {
  var imageUrl = $urlInput.value;
  $userPhoto.src = imageUrl;
});

function renderEntries(entry) {
  var entryListItem = document.createElement('li');
  entryListItem.setAttribute('class', 'row');

  var entryImage = document.createElement('img');
  entryImage.setAttribute('class', 'column-half');
  entryImage.setAttribute('src', entry.url);
  entryImage.setAttribute('alt', 'journal-image');
  entryListItem.appendChild(entryImage);

  var textDiv = document.createElement('div');
  textDiv.setAttribute('class', 'column-half');
  entryListItem.appendChild(textDiv);

  var entryTitle = document.createElement('h3');
  entryTitle.setAttribute('class', 'margin-top-zero');
  entryTitle.textContent = entry.title;
  textDiv.appendChild(entryTitle);

  var entryNotes = document.createElement('p');
  entryNotes.textContent = entry.notes;
  textDiv.appendChild(entryNotes);

  return entryListItem;
}

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

  var prependEntry = renderEntries(entryForm);
  $unorderedList.prepend(prependEntry);

  $dataViewEntries.className = 'view';
  $dataViewForm.className = 'hidden';
  data.view = 'entries';

});

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    var entryReturn = renderEntries(data.entries[i]);
    $unorderedList.appendChild(entryReturn);
  }
});

$entriesNav.addEventListener('click', function (event) {
  $dataViewEntries.className = 'view';
  $dataViewForm.className = 'hidden';
  data.view = 'entries';
});

$newButton.addEventListener('click', function (event) {
  $dataViewEntries.className = 'hidden';
  $dataViewForm.className = 'view';
  data.view = 'entry-form';
});

if (data.view === 'entry-form') {
  $dataViewEntries.className = 'hidden';
  $dataViewForm.className = 'view';
} else if (data.view === 'entries') {
  $dataViewEntries.className = 'view';
  $dataViewForm.className = 'hidden';
}

/* global data */
/* exported data */
var $urlInput = document.querySelector('.photo-url');
var $userPhoto = document.querySelector('.user-photo');
var $dataViewForm = document.querySelector('[data-view="entry-form"]');
var $dataViewEntries = document.querySelector('[data-view="entries"]');
var $entriesNav = document.querySelector('h3.journal-header');
var $newButton = document.querySelector('.new-entry');
var $unorderedList = document.querySelector('.entries-list');
var $deleteLink = document.querySelector('.delete');

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

  var entryTitle = document.createElement('h2');
  entryTitle.setAttribute('class', 'margin-top-zero');
  entryTitle.textContent = entry.title;
  textDiv.appendChild(entryTitle);

  var penIcon = document.createElement('i');
  penIcon.setAttribute('class', 'fas fa-pen');
  penIcon.setAttribute('data-entry-id', entry.entryId);
  entryTitle.appendChild(penIcon);

  var entryNotes = document.createElement('p');
  entryNotes.textContent = entry.notes;
  textDiv.appendChild(entryNotes);

  return entryListItem;
}

var $entryForm = document.querySelector('.entry-form');

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var $title = $entryForm.elements['picture-title'].value;
  var $url = $entryForm.elements['photo-url'].value;
  var $notes = $entryForm.elements.notes.value;

  if (data.editing !== null) {
    for (let z = 0; z < data.entries.length; z++) {
      if (data.entries[z].entryId === data.editing.entryId) {
        var editedEntry = data.entries[z];
        editedEntry.title = $title;
        editedEntry.url = $url;
        editedEntry.notes = $notes;
        data.entries.splice(z, 1, editedEntry);
        $unorderedList.innerHTML = '';
      }
    }
    for (let x = 0; x < data.entries.length; x++) {
      var render = renderEntries(data.entries[x]);
      $unorderedList.appendChild(render);
      data.view = 'entries';
      $entryForm.reset();
      $userPhoto.src = 'images/placeholder-image-square.jpg';
    }
  } else {
    var entryForm = {
      title: $title,
      url: $url,
      notes: $notes,
      nextEntryId: data.nextEntryId,
      entryId: data.nextEntryId - 1
    };

    data.entries.push(entryForm);
    data.nextEntryId++;
    $userPhoto.src = 'images/placeholder-image-square.jpg';
    $entryForm.reset();

    var prependEntry = renderEntries(entryForm);
    $unorderedList.prepend(prependEntry);
  }
  data.editing = null;
  $deleteLink.classList.add('hidden');
  $dataViewEntries.className = 'view';
  $dataViewForm.className = 'hidden';
  data.view = 'entries';
});

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    var entryReturn = renderEntries(data.entries[i]);
    $unorderedList.appendChild(entryReturn);
  }

  $unorderedList.addEventListener('click', function (event) {
    if (event.target.getAttribute('data-entry-id')) {
      $deleteLink.classList.remove('hidden');
      $dataViewEntries.className = 'hidden';
      $dataViewForm.className = 'view';
      var iconTarget = event.target.getAttribute('data-entry-id');
      iconTarget = parseInt(iconTarget);
      for (let b = 0; b < data.entries.length; b++) {
        if (iconTarget === data.entries[b].entryId) {
          data.editing = data.entries[b];
          data.view = 'entry-form';
          $dataViewEntries.className = 'hidden';
          $dataViewForm.className = 'view';
          document.querySelector('.user-photo').src = data.editing.url;
          document.querySelector('.picture-title').value = data.editing.title;
          document.querySelector('.photo-url').value = data.editing.url;
          document.querySelector('.user-notes').value = data.editing.notes;
        }
      }
    }
  });
});
$entriesNav.addEventListener('click', function (event) {
  $dataViewEntries.className = 'view';
  $dataViewForm.className = 'hidden';
  data.view = 'entries';
  $entryForm.reset();
  $userPhoto.src = 'images/placeholder-image-square.jpg';
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

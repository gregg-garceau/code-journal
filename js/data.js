/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  var dataJson = JSON.stringify(data);
  var entriesJson = JSON.stringify(data.entries);
  localStorage.setItem('data', dataJson);
  localStorage.setItem('entries', entriesJson);
});

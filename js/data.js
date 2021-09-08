/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var dataJSON = localStorage.getItem('data');
if (dataJSON !== null) {
  data = JSON.parse(dataJSON);
}

window.addEventListener('beforeunload', function (event) {
  var dataJson = JSON.stringify(data);
  localStorage.setItem('data', dataJson);
});

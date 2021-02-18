"use strict";

var update = document.querySelector('#update-button');
var deleteButton = document.querySelector('#delete-button');
var messageDiv = document.querySelector('#message');
update.addEventListener('click', function (_) {
  fetch('/quotes', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Darth Vadar',
      //neyle degishtirmek istiyorsak onu yaziyoruz buraya
      quote: 'I find your lack of faith disturbing.'
    })
  }).then(function (res) {
    if (res.ok) return res.json();
  }).then(function (response) {
    window.location.reload(true);
  });
});
deleteButton.addEventListener('click', function (_) {
  fetch('/quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Darth Vadar' //silmek istedigimiz sey

    })
  }).then(function (res) {
    if (res.ok) return res.json();
  }).then(function (response) {
    if (response === 'No quote to delete') {
      messageDiv.textContent = 'No Darth Vadar quote to delete';
    } else {
      window.location.reload(true);
    }
  })["catch"](function (err) {
    return console.log(err);
  });
});
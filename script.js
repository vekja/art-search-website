"use strict";

const baseUrl = "https://api.artic.edu/api/v1/";
const searchEndpoint = "artworks/search";

function search() {
  let prompt = document.getElementById("artist").value;
  alert(prompt);
}
// jquery example
$(document).ready(function () {
  $("#art-search").submit(function (e) {
    alert($("#artist").val());
    e.preventDefault();
    var form = $(this);
    var endPointUrl =
      baseUrl + searchEndpoint + "?q=" + encodeURIComponent($("#artist").val());
    alert(endPointUrl);
    $.ajax({
      url: endPointUrl,
      success: function (result) {
        console.log(result);
      },
    });
  });
});


for (var  i=0; i < Array.length; i++) {
  for (var j=0; j<arr[i].length; j)
}
return product
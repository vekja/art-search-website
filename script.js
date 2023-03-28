var artInstituteBaseUrl = "https://api.artic.edu/api/v1/";
var searchEndpoint = "artworks/search";
var imageBaseUrl =
  "https://www.artic.edu/iiif/2/{identifier}/full/843,/0/default.jpg";
function search() {
  let prompt = document.getElementById("artist").value;
}

// jquery example
$(document).ready(function () {
  $("#art-search").submit(function (e) {
    e.preventDefault();
    var form = $(this);
    var endPointUrl =
      artInstituteBaseUrl +
      searchEndpoint +
      "?q=" +
      encodeURIComponent($("#artist").val());
    $.ajax({
      url: endPointUrl,
      success: function (result) {
        console.log(result);
        buildArtworks(result);
      },
    });
  });
});

async function buildArtworks(instituteArtworks) {
  var artInfoArr = [];
  for (let i = 0; i < instituteArtworks.data.length; i++) {
    var artwork = instituteArtworks.data[i];
    var artistName = "";
    var artTitle = artwork.title;
    var apiLink = artwork.api_link;
    var altText = artwork.thumbnail.alt_text;
    var imageLink = "";
    try {
      let response = await fetch(apiLink);
      let result = await response.json();
      artistName = result.data.artist_title;
      imageLink = imageBaseUrl.replace("{identifier}", result.data.image_id);
      debugger;
    } catch (error) {
      console.error(error);
    }
    let artInfo = {
      artistName: artistName,
      artTitle: artTitle,
      altText: altText,
      imageLink: imageLink,
    };
    artInfoArr.push(artInfo);
  }
  console.log(artInfoArr);
}
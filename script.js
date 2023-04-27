var artInstituteBaseUrl = "https://api.artic.edu/api/v1/";
var searchEndpoint = "artworks/search";
var imageBaseUrl =
  "https://www.artic.edu/iiif/2/{identifier}/full/843,/0/default.jpg";
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
  var artworkIds = []; // Keep track of artwork IDs to avoid duplicates

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
    } catch (error) {
      console.error(error);
    }
    let artInfo = {
      artistName: artistName,
      artTitle: artTitle,
      altText: altText,
      imageLink: imageLink,
    };
    // Check if the artwork ID has already been added
    if (!artworkIds.includes(artwork.id)) {
      artInfoArr.push(artInfo);
      artworkIds.push(artwork.id);
    }
  }

  // Display the artwork information on the screen
  var artworkContainer = document.getElementById("artwork-container");
  artworkContainer.style.display = "block"; // Show the artwork container
  artworkContainer.innerHTML = ""; // Clear the previous search results
  for (let i = 0; i < artInfoArr.length; i++) {
    let artInfo = artInfoArr[i];
    let artworkHtml = `
      <div class="artwork">
        <img src="${artInfo.imageLink}" alt="${artInfo.altText}" />
        <div class="artwork-info">
          <h2>${artInfo.artTitle}</h2>
          <h3>${artInfo.artistName}</h3>
        </div>
      </div>
    `;
    artworkContainer.innerHTML += artworkHtml;
  }
}

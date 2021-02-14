$(document).ready(function () {
  function getOneMeme(object) {
    console.log(object.id);
    var image_id = object.id;
    var meme_post = `<div class="card" style="width: 330px; height: 480px;">`;
    meme_post += `<img src=${object.url} class="card-img-top" style="align: center; height: 320px; width:320px" alt="meme">
      <div class="card-body">
        <h5 class="card-title">Posted By : ${object.name}</h5>
        <p class="card-text">Caption : ${object.caption}</p>
        <button class="btn btn-primary" type="submit" id=${image_id} onclick="editMeme('${image_id}')">Edit Meme</button>
      </div>
    </div>`;

    return meme_post;
  }

  $("#postform").submit((event) => {
    event.preventDefault();
    var name = $("input[type=name]").val();
    var caption = $("input[type=caption]").val();
    var url = $("input[type=url]").val();
    postMemes(name, caption, url);
  });

  $("#getMemes").click(function (event) {
    event.preventDefault();
    getMemes(100);
  });

  function postMemes(name, caption, url) {
    var req = JSON.stringify({ name: name, url: url, caption: caption });
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open("POST", "https://crio-api-back.herokuapp.com/memes/");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onload = function (e) {
      console.log(xhr.status);
      if (xhr.status == 200) {
        let response_object = JSON.parse(this.responseText);
        document.getElementById("postform").reset();
        Swal.fire("Meme Posted!", "Thank you!", "success");
        return;
      } else {
        window.alert("Invalide URL !!! Please provide valid url.");
        xhr.abort();
      }
    };
    xhr.send(req);
  }

  function getMemes(num) {
    fetch(`https://crio-api-back.herokuapp.com/memes/`)
      .then((response) => response.json())
      .then((responseJson) => displayResults(responseJson));
  }

  function displayResults(responseJson) {
    var meme_array = responseJson.Meme;
    meme_array.reverse();
    console.log(meme_array);
    let meme_posts = `<div class="card text-center">`;
    for (let i = 0; i < meme_array.length; i += 4) {
      meme_posts += `<div class="container"><div class="row">`;
      if (i < meme_array.length) {
        let object = meme_array[i];
        meme_posts += getOneMeme(object);
      }

      if (i + 1 < meme_array.length) {
        let object = meme_array[i + 1];
        meme_posts += getOneMeme(object);
      }

      if (i + 2 < meme_array.length) {
        let object = meme_array[i + 2];
        meme_posts += getOneMeme(object);
      }

      if (i + 3 < meme_array.length) {
        let object = meme_array[i + 3];
        meme_posts += getOneMeme(object);
      }

      meme_posts += `</div></div></div>`;
    }
    document.getElementById("display-container").innerHTML = meme_posts;
  }
});

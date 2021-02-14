function editMeme(id) {
  document.getElementById("submit-edit")["data-id"] = id;
  document.querySelector(".bg-modal").style.display = "flex";
}

const button = document.getElementById("closeButton");
button.onclick = function close() {
  document.querySelector(".bg-modal").style.display = "none";
};

function edit() {
  let data_id = document.getElementById("submit-edit")["data-id"];
  let updated_caption = document.getElementById("floatingInput").value;
  let updated_url = document.getElementById("floatingPassword").value;

  if (updated_caption === "" && updated_url === "") {
    window.alert("Please fill atleast any of the field");
    return;
  }

  var req = JSON.stringify({ url: updated_url, caption: updated_caption });
  console.log(req);
  console.log(data_id);

  // posting the request to express backend to update the db
  const xhr_patch = new XMLHttpRequest();
  xhr_patch.withCredentials = false;
  xhr_patch.open(
    "PATCH",
    `https://crio-api-back.herokuapp.com/memes/${data_id}`
  );
  xhr_patch.setRequestHeader("Content-type", "application/json");
  xhr_patch.send(req);

  xhr_patch.onload = function () {
    console.log(xhr_patch);
    if (xhr_patch.status == 200) {
      document.querySelector(".bg-modal").style.display = "none";
      document.getElementById("update-form").reset();
      return;
    } else if (xhr_patch.status == 404) {
      window.alert("Invalide URL !!! Please provide valid url.");
      xhr_patch.abort();
    }
  };
}

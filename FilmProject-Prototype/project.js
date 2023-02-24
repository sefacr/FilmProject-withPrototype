//ANA JS DOSYASI /HTML'de en sona yazılması gerekir

const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

//UI objesini başlatalım
const ui = new UI();
//Storage Objesi Üret
const storage = new Storage();

// Tüm eventleri yükleme
eventListeners();

function eventListeners() {
  form.addEventListener("submit", addFilm);
  document.addEventListener("DOMContentLoaded", function () {
    let films = storage.getFilmFromStorage();
    ui.loadAllFilm(films);
  });
  cardBody.addEventListener("click", deleteFilm);
  clear.addEventListener("click", clearAllFilms);
}
function addFilm(e) {
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  if (title === "" || director === "" || url === "") {
    //Hata
    ui.displayMessages("Lütfen boşluk bırakmayın", "danger");
  } else {
    //Yeni Film
    const newFilm = new Film(title, director, url);

    ui.addFilmToUI(newFilm); //arayüze film ekleme
    storage.addFilmToStorage(newFilm); //storage'e film ekleme
    ui.displayMessages("Başarıyla Eklendi", "success");
  }

  ui.clearInputs(titleElement, urlElement, directorElement);
  e.preventDefault();
}

function deleteFilm(e) {
  if (e.target.id === "delete-film") {
    ui.deleteFilmFromUI(e.target);
    let textFilm =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    storage.deleteFilmFromStorage(textFilm);

    // console.log(
    //   e.target.parentElement.previousElementSibling.previousElementSibling
    //     .textContent
    // );

    ui.displayMessages(`'${textFilm}' Başaryla Silindi`, "success");
  }
}

function clearAllFilms() {
  if (confirm("Silmek istediğinizden emin misiniz ?")) {
    ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
  }
}

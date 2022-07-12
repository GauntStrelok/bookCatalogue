import React from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";
import app from "../firebase/firebase-config";
import firebaseAuth from "../authentication/firebaseAuth";

let database = null;
let auth = false;

export default function Admin() {
  const [title, setTitle] = React.useState("");
  const [linkML, setLinkML] = React.useState("");
  const [linkImage, setLinkImage] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [publisher, setPublisher] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [publicationYear, setPublicationYear] = React.useState("");
  const [iSBN, setISBN] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [numberPages, setNumberPages] = React.useState("");
  const [editionType, setEditionType] = React.useState("");
  const [coverType, setCoverType] = React.useState("");
  const [status, setStatus] = React.useState("");

  if (!auth)
    firebaseAuth(() => {
      auth = true;
    });

  function setInputValue(inputSetter) {
    return function (event) {
      inputSetter(event.target.value);
    };
  }

  function clearForm() {
    setTitle("");
    setLinkML("");
    setLinkImage("");
    setAuthor("");
    setPublisher("");
    setGenre("");
    setPublicationYear("");
    setISBN("");
    setLanguage("");
    setNumberPages("");
    setEditionType("");
    setCoverType("");
    setStatus("");
  }

  function readExcelRow(event) {
    event.preventDefault();
    if (!event.clipboardData || !event.clipboardData.items) return;
    var items = event.clipboardData.items;
    var data;
    for (var i = 0; i < items.length; i++) {
      if (items[i].type == "text/plain") {
        data = items[i];
        break;
      }
    }
    if (!data) return;
    data.getAsString(function (text) {
      text = text.replace(/\r/g, "").trim("\n");
      var row = text.split("\t").map(function (value) {
        return value.trim().replace(/^"(.*)"$/, "$1");
      });
      if (row.length === 1) {
        setTitle(row[0]);
      } else if (row.length >= 11) {
        setTitle(row[0]);
        setAuthor(row[1]);
        setPublisher(row[2]);
        setGenre(row[3]);
        setPublicationYear(row[4]);
        setISBN(row[5]);
        setLanguage(row[6]);
        setNumberPages(row[7]);
        setEditionType(row[8]);
        setCoverType(row[9]);
        setStatus(row[10]);
      }
    });
  }

  function saveBook(event) {
    //TODO validaciones
    event.preventDefault();
    if (!database) database = firebase.firestore(app);
    let titleKeywords = title.split(" ");
    console.log(
      JSON.stringify({
        title,
        linkML,
        linkImage,
        author,
        publisher,
        genre,
        publicationYear,
        iSBN,
        language,
        numberPages,
        editionType,
        coverType,
        status,
        titleKeywords,
      })
    );
    database
      .collection("books")
      .add({
        title,
        linkML,
        linkImage,
        author,
        publisher,
        genre,
        publicationYear,
        iSBN,
        language,
        numberPages,
        editionType,
        coverType,
        status,
        titleKeywords,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        alert("Libro guardado correctamente");
        clearForm();
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
        prompt(
          "Error ha fallado la carga copiar esto al administrador(ctrl+c):" +
            JSON.stringify(error)
        );
      });
    return false;
  }

  // <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  return (
    <div className="formContainer">
      <form onSubmit={saveBook}>
        <div class="form-group">
          <label for="linkML">Link a mercado libre</label>
          <input
            id="linkML"
            type="text"
            class="form-control"
            placeholder="Ingresar link de mercado libre"
            value={linkML}
            onChange={setInputValue(setLinkML)}
          ></input>
        </div>
        <div class="form-group">
          <label for="linkImage">Link imagen a mostrar</label>
          <input
            id="linkImage"
            type="text"
            class="form-control"
            placeholder="Ingresar link a imagen a utilizar"
            value={linkImage}
            onChange={setInputValue(setLinkImage)}
          ></input>
        </div>
        <div class="form-group">
          <label for="bookTitle">Titulo</label>
          <input
            id="bookTitle"
            type="text"
            class="form-control"
            placeholder="Ingresar titulo del libro"
            value={title}
            onChange={setInputValue(setTitle)}
            onPaste={readExcelRow}
          ></input>
        </div>
        <div class="form-group">
          <label for="bookAuthor">Autor</label>
          <input
            id="bookAuthor"
            type="text"
            class="form-control"
            placeholder="Ingresar autor del libro"
            value={author}
            onChange={setInputValue(setAuthor)}
          ></input>
        </div>
        <div class="form-group">
          <label for="bookPublisher">Editorial</label>
          <input
            id="bookPublisher"
            type="text"
            class="form-control"
            placeholder="Ingresar titulo del libro"
            value={publisher}
            onChange={setInputValue(setPublisher)}
          ></input>
        </div>
        <div class="form-group">
          <label for="bookGenre">Género</label>
          <input
            id="bookGenre"
            type="text"
            class="form-control"
            placeholder="Ingresar titulo del libro"
            value={genre}
            onChange={setInputValue(setGenre)}
          ></input>
        </div>
        <div class="form-group">
          <label for="bookPublicationYear">Año de publicación</label>
          <input
            id="bookPublicationYear"
            type="text"
            class="form-control"
            placeholder="Ingresar titulo del libro"
            value={publicationYear}
            onChange={setInputValue(setPublicationYear)}
          ></input>
        </div>
        <div class="form-group">
          <label for="bookISBN">ISBN</label>
          <input
            id="bookISBN"
            type="text"
            class="form-control"
            placeholder=""
            value={iSBN}
            onChange={setInputValue(setISBN)}
          ></input>
        </div>
        <div class="form-group">
          <label for="bookLanguage">Idioma</label>
          <input
            id="bookLanguage"
            type="text"
            class="form-control"
            placeholder=""
            value={language}
            onChange={setInputValue(setLanguage)}
          ></input>
        </div>
        <div class="form-group">
          <label for="bookNumberPages">Número de páginas</label>
          <input
            id="bookNumberPages"
            type="text"
            class="form-control"
            placeholder="Ingresar titulo del libro"
            value={numberPages}
            onChange={setInputValue(setNumberPages)}
          ></input>
        </div>
        <div class="form-group">
          <label for="bookEditionType">Tipo de Edición</label>
          <input
            id="bookEditionType"
            type="text"
            class="form-control"
            placeholder="Ingresar titulo del libro"
            value={editionType}
            onChange={setInputValue(setEditionType)}
          ></input>
        </div>
        <div class="form-group">
          <label for="bookCoverType">Tipo de tapa</label>
          <input
            id="bookCoverType"
            type="text"
            class="form-control"
            placeholder="Ingresar titulo del libro"
            value={coverType}
            onChange={setInputValue(setCoverType)}
          ></input>
        </div>
        <div class="form-group">
          <label for="bookStatus">Estado del libro</label>
          <input
            id="bookStatus"
            type="text"
            class="form-control"
            placeholder="Ingresar titulo del libro"
            value={status}
            onChange={setInputValue(setStatus)}
          ></input>
        </div>
        <button class="btn btn-primary" onClick={saveBook}>
          Submit
        </button>
      </form>
    </div>
  );
}

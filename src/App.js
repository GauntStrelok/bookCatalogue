import React, { useState, useEffect } from "react";
import Book from "./components/Book";
import firebaseAuth from "./authentication/firebaseAuth";
import "./App.css";
import "./css/bootstrap.min.css";
import "./css/fontawesome-all.min.css";
import "./css/tooplate-style.css";
import $ from "jquery";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "./firebase/config";
import SocialNet from "./components/SocialNet";
let app = firebase.initializeApp(firebaseConfig);
let booksLoaded = window.location.pathname === "/admin.html";
let database = null;
let auth = false; //controls that i have already authed
let allBooks = [];

const facebookNet = "https://www.facebook.com/akirabooks/";
const instagramNet = "https://www.instagram.com/akira_books/";
const twitterNet = "https://twitter.com/AkiraBooks";
function App() {
  const [books, setBooks] = useState([]); // [variable, funcion]
  const [title, setTitle] = useState("");
  const [linkML, setLinkML] = useState("");
  const [linkImage, setLinkImage] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [iSBN, setISBN] = useState("");
  const [numberPages, setNumberPages] = useState("");
  const [editionType, setEditionType] = useState("");
  const [coverType, setCoverType] = useState("");
  const [status, setStatus] = useState("");
  const [filters, setFilters] = useState({});

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    $(function () {
      $("body").addClass("loaded");
      //$('.tm-current-year').text(new Date().getFullYear());  Update year in copyright
    });
    if (!booksLoaded) {
      booksLoaded = true;
      loadBooks();
    }
    //firebaseAuth();
  });

  function loadBooks(loadFilters, startAfter) {
    console.log(loadFilters, startAfter);
    if (!database) {
      database = firebase.firestore(app);
    }
    let bookCollection = database.collection("books");
    if (loadFilters) {
      if (loadFilters.title) {
        let valuesToSearch = loadFilters.title.split(" ");
        valuesToSearch = valuesToSearch.slice(0, 9);
        bookCollection = bookCollection.where(
          "titleKeywords",
          "array-contains-any",
          valuesToSearch
        );
        bookCollection = bookCollection.where("title", "==", loadFilters.title);
      }
    }
    if (startAfter) {
      bookCollection = bookCollection.startAfter(startAfter);
    }
    bookCollection = bookCollection.limit(100);
    bookCollection
      .get()
      .then((snapshot) => {
        let databaseBooks = [];
        snapshot.forEach(function (doc) {
          databaseBooks.push(doc.data());
        });
        console.log("encontrados", databaseBooks);
        setBooks(databaseBooks);
        allBooks = [...databaseBooks];
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function searchBooks(event) {
    event.preventDefault();
    //TODO replace by backend search
    loadBooks(filters);
    /*let filteredBooks = allBooks.filter(book => {
      return book.title.includes(filters.title);
    })*/
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
    setNumberPages("");
    setEditionType("");
    setCoverType("");
    setStatus("");
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
      } else if (row.length === 16) {
        setTitle(row[0]);
        setAuthor(row[1]);
        setPublisher(row[2]);
        setGenre(row[3]);
        setPublicationYear(row[4]);
        setISBN(row[5]);
        setNumberPages(row[7]);
        setEditionType(row[8]);
        setCoverType(row[9]);
        setStatus(row[10]);
      }
    });
  }

  function setInputValue(inputSetter) {
    return function (event) {
      inputSetter(event.target.value);
    };
  }

  function setFilterValue(property) {
    return function (event) {
      let newFilters = {
        ...filters,
      };
      newFilters[property] = event.target.value;
      setFilters(newFilters);
    };
  }

  function adminPage() {
    if (!auth)
      firebaseAuth(() => {
        auth = true;
      });

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
  function booksPage() {
    return (
      <div className="akiraBooks">
        <div id="loader-wrapper">
          <div id="loader"></div>
          <div class="loader-section section-left"></div>
          <div class="loader-section section-right"></div>
        </div>

        <div class="tm-main">
          <div class="tm-welcome-section">
            <div class="container tm-navbar-container">
              <div class="row">
                <div class="col-xl-12">
                  <nav class="navbar navbar-expand-sm">
                    <ul class="navbar-nav ml-auto"></ul>
                  </nav>
                </div>
              </div>
            </div>

            <div class="container text-center tm-welcome-container">
              <div class="tm-welcome">
                <h1 class="text-uppercase mb-3 tm-site-name"></h1>
                <div>
                  <SocialNet
                    src="/smallFLogo.png"
                    href={facebookNet}
                  ></SocialNet>
                  <SocialNet
                    src="/smallInstaLogo.png"
                    href={instagramNet}
                  ></SocialNet>
                  <SocialNet
                    src="/smallTLogo.png"
                    href={twitterNet}
                  ></SocialNet>
                </div>
                <p class="tm-site-description">Seguinos en nuestras redes</p>
              </div>
            </div>
          </div>

          <div class="container">
            <div class="tm-search-form-container">
              <form onSubmit={searchBooks} class="form-inline tm-search-form">
                <div class="text-uppercase tm-new-release">BUSQUEDA</div>
                <div class="form-group tm-search-box">
                  <input
                    type="text"
                    name="Palabra clave"
                    class="form-control tm-search-input"
                    placeholder="Type your keyword ..."
                    value={filters.title}
                    onChange={setFilterValue("title")}
                  ></input>
                  <input
                    type="submit"
                    value="Buscar"
                    class="form-control tm-search-submit"
                  ></input>
                </div>
              </form>
            </div>

            <div class="row tm-albums-container grid">
              {books.map((book) => {
                return (
                  <div class="col-sm-6 col-12 col-md-4 col-lg-2 col-xl-2 tm-album-col">
                    <Book data={book}></Book>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  function page() {
    if (
      window.location.pathname === "/admin.html" ||
      window.location.hash === "admin"
    )
      return adminPage();
    return booksPage();
  }

  return page();
}

export default App;

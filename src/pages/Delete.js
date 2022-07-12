import React from "react";
import Book from "../components/Book";
import firebaseAuth from "../authentication/firebaseAuth";
import * as firebase from "firebase/app";
import "firebase/firestore";
import app from "../firebase/firebase-config";
import $, { get } from "jquery";

let database = null;
let auth = false; //controls that i have already authed
let allBooks = [];
let booksLoaded = window.location.pathname === "/admin";

export default function Delete() {
  const [books, setBooks] = React.useState([]); // [variable, funcion]
  const [shownBooks, setShownBooks] = React.useState([]);
  const [filters, setFilters] = React.useState({});

  if (!auth)
    firebaseAuth(() => {
      auth = true;
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
    bookCollection = bookCollection.limit(1000);
    bookCollection
      .get()
      .then((snapshot) => {
        let databaseBooks = [];
        snapshot.forEach(function (doc) {
          let data = doc.data();
          data.id = doc.id;
          databaseBooks.push(data);
        });
        console.log("encontrados", databaseBooks);
        setBooks(databaseBooks);
        allBooks = [...databaseBooks];
        setShownBooks([...databaseBooks]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteBook(id) {
    if (window.confirm("Estas seguro?")) {
      if (!database) {
        database = firebase.firestore(app);
      }
      database
        .collection("books")
        .doc(id)
        .delete()
        .then(() => {
          alert("Libro borrado.");
        })
        .catch((error) => {
          alert("No se pudo borrar el libro, error: ", error);
        });
    }
  }

  function filterBooks(filters) {
    if (filters && filters.title) {
      let text = filters.title.toLowerCase();
      let filteredBooks = books.filter((book) => {
        let bookTitle = book.title.toLowerCase();
        let includesBookTitle = bookTitle.includes(text);
        let bookAuthor = book.author.toLowerCase();
        let includesBookAuthor = bookAuthor.includes(text);
        let bookPublisher = book.publisher.toLowerCase();
        let includesBookPublisher = bookPublisher.includes(text);
        let bookGenre = book.genre.toLowerCase();
        let includesBookGenre = bookGenre.includes(text);
        let bookISBN = book.iSBN.toLowerCase();
        let includesBookISBN = bookISBN.includes(text);
        let bookEditionType = book.editionType.toLowerCase();
        let includesBookEditionType = bookEditionType.includes(text);
        return (
          includesBookTitle ||
          includesBookAuthor ||
          includesBookPublisher ||
          includesBookGenre ||
          includesBookISBN ||
          includesBookEditionType
        );
      });
      setShownBooks(filteredBooks);
    } else {
      setShownBooks([...books]);
    }
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

  function searchBooks(event) {
    event.preventDefault();
    //TODO replace by backend search
    filterBooks(filters);
    /*let filteredBooks = allBooks.filter(book => {
          return book.title.includes(filters.title);
        })*/
  }

  // Similar to componentDidMount and componentDidUpdate:
  React.useEffect(() => {
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
            {shownBooks.map((book) => {
              return (
                <div class="col-sm-6 col-12 col-md-4 col-lg-2 col-xl-2 tm-album-col">
                  <Book
                    data={book}
                    canDelete={true}
                    deleteB={deleteBook}
                  ></Book>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

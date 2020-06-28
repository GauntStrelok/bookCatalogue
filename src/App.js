import React, {useState, useEffect} from 'react';
import Book from './components/Book';
import firebaseAuth from './authentication/firebaseAuth'
import './App.css';
import './css/bootstrap.min.css';
import './css/fontawesome-all.min.css';
import './css/tooplate-style.css';
import $ from 'jquery';
import * as firebase from "firebase/app";
import "firebase/firestore";
import {firebaseConfig} from "./firebase/config";
var app = firebase.initializeApp(firebaseConfig);
let booksLoaded = window.location.pathname === "/admin.html";
function App() {

  const [books, setBooks] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    $(function() {
      $('body').addClass('loaded');
      //$('.tm-current-year').text(new Date().getFullYear());  Update year in copyright
    });
    if(!booksLoaded) {
      booksLoaded = true;
      loadBooks();
    }
    //firebaseAuth();
  });

  function loadBooks() {
    var database = firebase.firestore(app);
    database.collection('books').get().then((snapshot) => {
      let databaseBooks = [];
      snapshot.forEach(function(doc) {
        databaseBooks.push(doc.data());
      });
      setBooks(databaseBooks);
    }).catch((error) => {
      console.log(error);
    })
  }

  function adminPage() {
    firebaseAuth();
    // <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    return (<div className="formContainer">
      <form >
        <div class="form-group">
          <label for="linkML">Link a mercado libre</label>
          <input id="linkML" type="text" class="form-control" placeholder="Ingresar link de mercado libre"></input>
        </div>
        <div class="form-group">
          <label for="linkImage">Link imagen a mostrar</label>
          <input id="linkImage" type="text" class="form-control" placeholder="Ingresar link a imagen a utilizar"></input>
        </div>
        <div class="form-group">
          <label for="bookTitle">Titulo</label>
          <input id="bookTitle" type="text" class="form-control" placeholder="Ingresar titulo del libro"></input>
        </div>
        <div class="form-group">
          <label for="bookDescription">Descripcion</label>
          <textarea id="bookDescription" type="text" class="form-control" placeholder="Ingresar descripcion del libro"></textarea>
        </div>
        <button class="btn btn-primary">Submit</button>
      </form>
    </div>);
  }
  function booksPage() {
    return <div>
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
              <h1 class="text-uppercase mb-3 tm-site-name">Akira Books</h1>
              <p class="tm-site-description">Busqueda Libros mercado libre</p>
            </div>
          </div>

        </div>

        <div class="container">
          <div class="tm-search-form-container">
            <form action="index.html" method="GET" class="form-inline tm-search-form">
              <div class="text-uppercase tm-new-release">BUSQUEDA</div>
              <div class="form-group tm-search-box">
                <input type="text" name="keyword" class="form-control tm-search-input" placeholder="Type your keyword ..."/>
                <input type="submit" value="Search" class="form-control tm-search-submit"></input>
              </div>

            </form>
          </div>

          <div class="row tm-albums-container grid">
            <div class="col-sm-6 col-12 col-md-4 col-lg-2 col-xl-2 tm-album-col">
              <Book src="https://http2.mlstatic.com/aramburu-maria-o-donnell-libro-nuevo-planeta-D_NQ_NP_952964-MLA41734512713_052020-V.webp" title="Algo de Lyna"></Book>
            </div>
            <div class="col-sm-6 col-12 col-md-4 col-lg-2 col-xl-2 tm-album-col">
              <Book src="https://i.imgur.com/vl7NdiI.jpg" title="Star Wars"></Book>
            </div>
            <div class="col-sm-6 col-12 col-md-4 col-lg-2 col-xl-2 tm-album-col">
              <Book src="https://http2.mlstatic.com/libro-basta-de-amores-de-mierda-D_NQ_NP_742437-MLA31068254336_062019-V.webp" title="Aramburu"></Book>
            </div>
            <div class="col-sm-6 col-12 col-md-4 col-lg-2 col-xl-2 tm-album-col">
              <Book src="https://http2.mlstatic.com/aramburu-maria-o-donnell-libro-nuevo-planeta-D_NQ_NP_952964-MLA41734512713_052020-V.webp" title="Algo de Lyna"></Book>
            </div>
            <div class="col-sm-6 col-12 col-md-4 col-lg-2 col-xl-2 tm-album-col">
              <Book src="https://http2.mlstatic.com/aramburu-maria-o-donnell-libro-nuevo-planeta-D_NQ_NP_952964-MLA41734512713_052020-V.webp" title="Algo de Lyna"></Book>
            </div>
            <div class="col-sm-6 col-12 col-md-4 col-lg-2 col-xl-2 tm-album-col">
              <Book src="https://http2.mlstatic.com/aramburu-maria-o-donnell-libro-nuevo-planeta-D_NQ_NP_952964-MLA41734512713_052020-V.webp" title="Algo de Lyna"></Book>
            </div>
            {
              books.map((book) => {
                return <div class="col-sm-6 col-12 col-md-4 col-lg-2 col-xl-2 tm-album-col">
                  <Book src={book.linkImage} title={book.title} description={book.description}></Book>
                </div>
              })
            }
          </div>

        </div>

      </div>
    </div>
  }

  function page() {
    if (window.location.pathname === "/admin.html")
      return adminPage();
    return booksPage();
  }

  return page();
}

export default App;

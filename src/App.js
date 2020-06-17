import React, {useState, useEffect} from 'react';
import Book from './components/Book';
import firebaseAuth from './authentication/firebaseAuth'
import './App.css';
import './css/bootstrap.min.css';
import './css/fontawesome-all.min.css';
import './css/tooplate-style.css';
import $ from 'jquery';

function App() {

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    $(function() {
      $('body').addClass('loaded');
      //$('.tm-current-year').text(new Date().getFullYear());  Update year in copyright
    });
    //firebaseAuth();

  });

  return (<div>
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
        </div>

      </div>

    </div>
  </div>);
}

export default App;

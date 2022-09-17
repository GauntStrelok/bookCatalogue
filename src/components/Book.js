import React, { useState, useEffect } from "react";
import "./Book.css";
import Modal from "react-modal";
import * as firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "../firebase/config";

export default function Book(props) {
  const [showModal, setShowModal] = useState(false);

  const data = props.data;

  // const deleteB = props.deleteB;

  const canDelete = props.canDelete;

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function deleteBook() {
    props.deleteB(data.id);
  }

  return (
    <div style={{ maxWidth: "100%" }}>
      <div className="imageContainer" onClick={openModal}>
        <img src={data.linkImage} className="image" />
        <div className="title">{data.title || ""}</div>
      </div>
      {/* <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Minimal Modal Example"
      >
        <button onClick={closeModal} className="buttonClose">
          <img src="/closeIcon.png" className="image" />
        </button>
        {canDelete && (
          <button onClick={deleteBook} className="buttonDelete">
            Delete
          </button>
        )}
        <img src={data.linkImage} className="image2" />
        <div className="descriptionContainer">
          <div>{data.title || "Titulo de Libro"}</div>
          <div>
            <span>Autor:</span>
            <span>{data.author}</span>
          </div>
          <div>
            <span>Editorial:</span>
            <span>{data.publisher}</span>
          </div>
          <div>
            <span>Genero:</span>
            <span>{data.genre}</span>
          </div>
          <div>
            <span>Año de publicacion:</span>
            <span>{data.publicationYear}</span>
          </div>
          <div>
            <span>ISBN:</span>
            <span>{data.iSBN}</span>
          </div>
          <div>
            <span>Idioma:</span>
            <span>{data.language}</span>
          </div>
          <div>
            <span>Numero de paginas:</span>
            <span>{data.numberPages}</span>
          </div>
          <div>
            <span>Tipo de edicion:</span>
            <span>{data.editionType}</span>
          </div>
          <div>
            <span>Tipo de tapa:</span>
            <span>{data.coverType}</span>
          </div>
          <div>
            <span>Estado del libro:</span>
            <span>{data.status}</span>
          </div>
          <div>
            <span>Ver en mercado libre:</span>
            <a target="_blank" href={data.linkML}>
              <img src="/MLButton.png"></img>
            </a>
          </div>
        </div>
      </Modal> */}
    </div>
  );
}

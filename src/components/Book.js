import React, {useState, useEffect} from "react";
import "./Book.css";
import Modal from "react-modal";

export default function Book(props) {
  const [showModal, setShowModal] = useState(false);

  const data = props.data;
  
  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (<div style={{maxWidth: "100%"}}>
    <div className="imageContainer" onClick={openModal}>
      <img src={data.linkImage} className="image"/>
      <div className="title">{data.title || ""}</div>
    </div>
    <Modal isOpen={showModal} onRequestClose={closeModal} contentLabel="Minimal Modal Example">
      <img src={data.linkImage} className="image2"/>
      <div className="descriptionContainer">
        <div>{data.title || "Titulo de Libro"}</div>
        <div>
          {/* description */}
          <span>Autor:</span>
          <span>{data.author}</span>
          </div><div>
          <span>Editorial:</span>
          <span>{data.publisher}</span>
          </div><div>
          <span>Genero:</span>
          <span>{data.genre}</span>
          </div><div>
          <span>Año de publicacion:</span>
          <span>{data.publicationYear}</span>
          </div><div>
          <span>ISBN:</span>
          <span>{data.iSBN}</span>
          </div><div>
          <span>Numero de paginas:</span>
          <span>{data.numberPages}</span>
          </div><div>
          <span>Tipo de edicion:</span>
          <span>{data.editionType}</span>
          </div><div>
          <span>Tipo de tapa:</span>
          <span>{data.coverType}</span>
          </div><div>
          <span>Estado del libro:</span>
          <span>{data.status}</span>
        </div>
      </div>
    </Modal>
  </div>);
}

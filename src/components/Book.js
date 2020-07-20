import React, {useState, useEffect} from "react";
import "./Book.css";
import Modal from "react-modal";

export default function Book(props) {
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (<div style={{maxWidth: "100%"}}>
    <div className="imageContainer" onClick={openModal}>
      <img src={props.src} className="image"/>
      <div className="title">{props.title || ""}</div>
    </div>
    <Modal isOpen={showModal} onRequestClose={closeModal} contentLabel="Minimal Modal Example">
      <img src={props.src} className="image2"/>
      <div className="descriptionContainer">
        <div>{props.title || "Titulo de Libro"}</div>
        <div>
          {props.description || ""}
        </div>
      </div>
    </Modal>
  </div>);
}

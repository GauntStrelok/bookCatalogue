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

  function defaultText() {
    return `
    Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
  }

  return (<div>
    <div className="imageContainer" onClick={openModal}>
      <img src={props.src} className="image"/>
      <div className="title">{props.title || "Titulo de Libro"}</div>
    </div>
    <Modal isOpen={showModal} onRequestClose={closeModal} contentLabel="Minimal Modal Example">
      <img src={props.src} className="image2"/>
      <div className="descriptionContainer">
        <div>{props.title || "Titulo de Libro"}</div>
        <div>
          {props.description || defaultText()}
        </div>
      </div>
    </Modal>
  </div>);
}

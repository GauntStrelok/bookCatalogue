import React, { useState, useEffect } from "react";
import "../components/Book.css";
import Modal from "react-modal";
import * as firebase from "firebase/app";
import "firebase/firestore";
import app from "../firebase/firebase-config";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import BookInfo from "../components/BookInfo";
import "../components/Book.css";

export default function Book(props) {
  const [data, setData] = useState({});
  let database = null;
  // const deleteB = props.deleteB;

  const canDelete = props.canDelete;

  const location = useLocation();
  const book = location.state?.book;

  const { id } = useParams();

  function deleteBook() {
    props.deleteB(data.id);
  }

  async function loadBook() {
    try {
      console.log("ON LOAD BOOK");
      // database = firebase.firestore(app);
      // const bookCollected = database
      //   .collection("books")
      //   .where(firebase.firestore.FieldPath.documentId(), "==", id);
      // bookCollected.get().then((snapshot) => {
      //   console.log("snapshot isss", snapshot);

      //   let databaseBooks = [];
      //   snapshot.forEach(function (doc) {
      //     let data = doc.data();
      //     data.id = doc.id;
      //     databaseBooks.push(data);
      //   });
      //   console.log("encontrados", databaseBooks);
      //   setData(...databaseBooks);
      // });
      let db = firebase.firestore(app);
      var docRef = db.collection("books").doc(id);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setData(doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    } catch (error) {
      console.log({
        errorCode: error.code,
        errorMessage: error.message,
      });
    }
  }

  React.useEffect(() => {
    if (!book) {
      loadBook();
    } else {
      setData(book);
    }
  }, [id]);

  return (
    <>
      {/* <div className={modal ? "modal" : undefined}>
        {modal && <Link to="/">Close</Link>}
        <div>
          <img src="https://source.unsplash.com/random" />
        </div>
      </div> */}
      {/* <div style={{ maxWidth: "100%" }}>
        <div className="imageContainer" onClick={openModal}>
          <img src={data.linkImage} className="image" />
          <div className="title">{data.title || ""}</div>
        </div>
        <Modal
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
          <BookInfo data={data} />
        </Modal>
      </div> */}
      <BookInfo data={data} />
    </>
  );
}

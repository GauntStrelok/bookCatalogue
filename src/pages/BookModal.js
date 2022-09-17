import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../components/Book.css";
import Modal from "react-modal";
import * as firebase from "firebase/app";
import "firebase/firestore";
import app from "../firebase/firebase-config";
import BookInfo from "../components/BookInfo";

export default function BookModal(props) {
  let navigate = useNavigate();

  const [showModal, setShowModal] = React.useState(true);
  const [data, setData] = React.useState({});
  let database = null;
  // const deleteB = props.deleteB;

  function onDismiss() {
    navigate(-1);
  }

  const canDelete = props.canDelete;

  const location = useLocation();
  const book = location.state?.book;
  // const { state = {} } = props.location;
  // const { modal } = state;

  const { id } = useParams();

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function deleteBook() {
    props.deleteB(data.id);
  }

  // async function loadBook() {
  //   try {
  //     console.log("ON LOAD BOOK");
  //     // database = firebase.firestore(app);
  //     // const bookCollected = database
  //     //   .collection("books")
  //     //   .where(firebase.firestore.FieldPath.documentId(), "==", id);
  //     // bookCollected.get().then((snapshot) => {
  //     //   console.log("snapshot isss", snapshot);

  //     //   let databaseBooks = [];
  //     //   snapshot.forEach(function (doc) {
  //     //     let data = doc.data();
  //     //     data.id = doc.id;
  //     //     databaseBooks.push(data);
  //     //   });
  //     //   console.log("encontrados", databaseBooks);
  //     //   setData(...databaseBooks);
  //     // });
  //     let db = firebase.firestore(app);
  //     var docRef = db.collection("books").doc(id);

  //     docRef
  //       .get()
  //       .then((doc) => {
  //         if (doc.exists) {
  //           setData(doc.data());
  //         } else {
  //           // doc.data() will be undefined in this case
  //           console.log("No such document!");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("Error getting document:", error);
  //       });
  //   } catch (error) {
  //     console.log({
  //       errorCode: error.code,
  //       errorMessage: error.message,
  //     });
  //   }
  // }

  React.useEffect(() => {
    setData(book);
  }, [id]);

  return (
    <div style={{ maxWidth: "100%" }}>
      <div className="imageContainer" onClick={openModal}>
        <img src={data.linkImage} className="image" />
        <div className="title">{data.title || ""}</div>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={onDismiss}
        contentLabel="Minimal Modal Example"
      >
        <button onClick={onDismiss} className="buttonClose">
          <img src="/closeIcon.png" className="image" />
        </button>
        {canDelete && (
          <button onClick={deleteBook} className="buttonDelete">
            Delete
          </button>
        )}
        <BookInfo data={data} />
      </Modal>
    </div>
  );
}

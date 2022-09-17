import React from "react";

export default function BookInfo({ data }) {
  const [book, setBook] = React.useState({});

  React.useEffect(() => {
    console.log("THE DATA IS ", data);
    setBook(data);
    console.log("THE BOOK INFO IS FOR ", book);
  }, [data]);

  return (
    <>
      <img src={book.linkImage} className="image2" />
      <div className="descriptionContainer">
        <div>{book.title || "Titulo de Libro"}</div>
        <div>
          {/* description */}
          <span>Autor:</span>
          <span>{book.author}</span>
        </div>
        <div>
          <span>Editorial:</span>
          <span>{book.publisher}</span>
        </div>
        <div>
          <span>Genero:</span>
          <span>{book.genre}</span>
        </div>
        <div>
          <span>Año de publicacion:</span>
          <span>{book.publicationYear}</span>
        </div>
        <div>
          <span>ISBN:</span>
          <span>{book.iSBN}</span>
        </div>
        <div>
          <span>Idioma:</span>
          <span>{book.language}</span>
        </div>
        <div>
          <span>Numero de paginas:</span>
          <span>{book.numberPages}</span>
        </div>
        <div>
          <span>Tipo de edicion:</span>
          <span>{book.editionType}</span>
        </div>
        <div>
          <span>Tipo de tapa:</span>
          <span>{book.coverType}</span>
        </div>
        <div>
          <span>Estado del libro:</span>
          <span>{book.status}</span>
        </div>
        <div>
          <span>Ver en mercado libre:</span>
          <a target="_blank" href={book.linkML}>
            <img src="/MLButton.png"></img>
          </a>
        </div>
      </div>
    </>
  );
}

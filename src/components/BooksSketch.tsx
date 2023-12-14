import React, { useEffect, useState } from "react";
import "./BooksSketch.css";
import EventEmitter from "events";
import Size from "../interfaces/Size";
import PaperRecord from "../interfaces/PaperRecord";

type BooksSketchProps = {
  emitter: EventEmitter;
  selectedPaperRecord: PaperRecord;
};

const BooksSketch: React.FunctionComponent<BooksSketchProps> = ({ emitter, selectedPaperRecord }) => {
  const [bookSize, setBookSize] = useState<Size>();

  useEffect(() => {
    // Function to run when the bookSizeChanged event is emitted
    const handleBookSizeChange = (newBookSize: Size) => {
      setBookSize(newBookSize);
    };

    // Listen for the bookSizeChanged event
    emitter.on("bookSizeChanged", handleBookSizeChange);

    // Clean up the event listener when the component unmounts
    return () => {
      emitter.off("bookSizeChanged", handleBookSizeChange);
    };
  }, [emitter]);

  if (bookSize === undefined) {
    return <div id="books-sketch" />;
  } else if (bookSize.width > selectedPaperRecord.width || bookSize.height > selectedPaperRecord.height) {
    // throw new Error("Book is too big for paper");
    return <div id="books-sketch" />;
  } else if (bookSize.width < 0 || bookSize.height < 0) {
    // throw new Error("Book size must be positive");
    return <div id="books-sketch" />;
  } else {
    return (
      <div id="books-sketch">
        <div
          className="Book"
          style={{
            width: (bookSize.width / selectedPaperRecord.width) * 100 + "%",
            height: (bookSize.height / selectedPaperRecord.height) * 100 + "%",
          }}
        ></div>
      </div>
    );
  }
};

export default BooksSketch;

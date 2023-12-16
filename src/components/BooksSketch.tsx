import React, { useEffect, useState } from "react";
import "./BooksSketch.scss";
import EventEmitter from "events";
import Dimensions from "../interfaces/Dimensions";
import PaperRecord from "../interfaces/PaperRecord";
import classNames from "classnames";

interface BooksSketchProps {
  emitter: EventEmitter;
  selectedPaperRecord: PaperRecord | undefined;
}

const BooksSketch = ({ emitter, selectedPaperRecord }: BooksSketchProps) => {
  const [bookDimensions, setBookDimensions] = useState<Dimensions>();

  useEffect(() => {
    const handleBookDimensionsChange = (newBookDimensions: Dimensions) => {
      setBookDimensions(newBookDimensions);
    };

    emitter.on("bookDimensionsChanged", handleBookDimensionsChange);

    return () => {
      emitter.off("bookDimensionsChanged", handleBookDimensionsChange);
    };
  }, [emitter]);

  return (
    <div id="books-sketch">
      {selectedPaperRecord !== undefined &&
        bookDimensions !== undefined &&
        selectedPaperRecord.booksArrangementInPaper.map((isRotated, index) => (
          <div
            className={classNames("Book", { Rotate: isRotated })}
            key={index}
            style={
              isRotated
                ? {
                    width: (bookDimensions.height / selectedPaperRecord.paperDimensions.width) * 100 + "%",
                    height: (bookDimensions.width / selectedPaperRecord.paperDimensions.height) * 100 + "%",
                  }
                : {
                    width: (bookDimensions.width / selectedPaperRecord.paperDimensions.width) * 100 + "%",
                    height: (bookDimensions.height / selectedPaperRecord.paperDimensions.height) * 100 + "%",
                  }
            }
          >
            <div className={classNames("Arrow", { Rotate: isRotated })} />
          </div>
        ))}
    </div>
  );
};

export default BooksSketch;

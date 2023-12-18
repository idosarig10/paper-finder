import React, { useEffect, useState } from "react";
import "./BooksSketch.scss";
import EventEmitter from "events";
import Dimensions from "../interfaces/Dimensions";
import PaperRecord from "../interfaces/PaperRecord";
import classNames from "classnames";
import _ from "lodash";

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
        selectedPaperRecord.booksArrangementInPaper.map((bookBlock, bookBlockIndex) => {
          let bookBlockWidth = _.sumBy(bookBlock, (isRotated) =>
            isRotated ? bookDimensions.height : bookDimensions.width
          );
          return (
            <div
              className="book-block"
              key={bookBlockIndex}
              style={{
                width: (bookBlockWidth / selectedPaperRecord.paperDimensions.width) * 100 + "%",
              }}
            >
              {bookBlock.map((isRotated, bookIndexInBlock) => (
                <div
                  className={classNames("Book", { Rotate: isRotated })}
                  key={bookIndexInBlock}
                  style={
                    isRotated
                      ? {
                          width: (bookDimensions.height / selectedPaperRecord.paperDimensions.width) * 100 + "%",
                          aspectRatio: bookDimensions.height / bookDimensions.width,
                        }
                      : {
                          width: (bookDimensions.width / selectedPaperRecord.paperDimensions.width) * 100 + "%",
                          aspectRatio: bookDimensions.width / bookDimensions.height,
                        }
                  }
                >
                  <div className={classNames("Arrow", { Rotate: isRotated })} />
                </div>
              ))}
            </div>
          );
        })}
    </div>
  );
};

export default BooksSketch;

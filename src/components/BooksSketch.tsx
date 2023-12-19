import React, { useEffect, useState } from "react";
import "./BooksSketch.scss";
import EventEmitter from "events";
import PaperRecord from "../interfaces/PaperRecord";
import classNames from "classnames";
import _ from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const BooksSketch = ({ selectedPaperRecord }: { selectedPaperRecord: PaperRecord | null }) => {
  const bookDimensions = useSelector((state: RootState) => state.bookDimensions, _.isEqual);

  return (
    <div id="books-sketch">
      {selectedPaperRecord &&
        bookDimensions &&
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
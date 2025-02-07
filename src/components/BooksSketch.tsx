import "./BooksSketch.scss";
import PaperRecord from "../interfaces/PaperRecord";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {isEqual, sumBy} from "lodash-es";

const BooksSketch = ({selectedPaperRecord}: { selectedPaperRecord: PaperRecord | null }) => {
    const bookDimensions = useSelector((state: RootState) => state.bookDimensions, isEqual);

    return (
        <div id="books-sketch">
            {selectedPaperRecord &&
                bookDimensions &&
                selectedPaperRecord.booksArrangementInPaper.map((bookBlock, bookBlockIndex) => {
                    let bookBlockWidth = sumBy(bookBlock, (isRotated) =>
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
                                    className={classNames("book", {rotate: isRotated})}
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
                                    <div className={classNames("arrow", {rotate: isRotated})}/>
                                </div>
                            ))}
                        </div>
                    );
                })}
        </div>
    );
};

export default BooksSketch;

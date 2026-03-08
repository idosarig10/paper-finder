import "./BooksSketch.scss";
import PaperRecord from "../interfaces/PaperRecord";
import Dimensions from "../interfaces/Dimensions";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {isEqual, size, sumBy} from "lodash-es";
import {useMemo} from "react";

interface DisplayBlock {
    books: boolean[];
    widthCm: number;
}

function computeDisplayBlocks(
    paperDimensions: Dimensions,
    bookDimensions: Dimensions,
    totalBooks: number
): DisplayBlock[] {
    if (totalBooks === 0) return [];

    const bookW = bookDimensions.width;
    const bookH = bookDimensions.height;
    const paperW = paperDimensions.width;
    const paperH = paperDimensions.height;

    const normalCols = Math.floor(paperW / bookW);
    const rotatedCols = Math.floor(paperW / bookH);

    // Strategy A: Horizontal strips (stacked vertically)
    let bestHTotal = 0;
    let bestHNormal = 0;
    let bestHRotated = 0;

    // Normal on top, rotated below
    if (normalCols > 0) {
        const maxNormalRows = Math.floor(paperH / bookH);
        for (let i = 0; i <= maxNormalRows; i++) {
            const nCount = Math.min(i * normalCols, totalBooks);
            const remainH = paperH - i * bookH;
            const rRows = rotatedCols > 0 ? Math.floor(remainH / bookW) : 0;
            const rCount = Math.min(rRows * rotatedCols, totalBooks - nCount);
            if (nCount + rCount > bestHTotal) {
                bestHTotal = nCount + rCount;
                bestHNormal = nCount;
                bestHRotated = rCount;
            }
            if (bestHTotal >= totalBooks) break;
        }
    }

    // Rotated on top, normal below
    if (rotatedCols > 0) {
        const maxRotatedRows = Math.floor(paperH / bookW);
        for (let i = 0; i <= maxRotatedRows; i++) {
            const rCount = Math.min(i * rotatedCols, totalBooks);
            const remainH = paperH - i * bookW;
            const nRows = normalCols > 0 ? Math.floor(remainH / bookH) : 0;
            const nCount = Math.min(nRows * normalCols, totalBooks - rCount);
            if (nCount + rCount > bestHTotal) {
                bestHTotal = nCount + rCount;
                bestHNormal = nCount;
                bestHRotated = rCount;
            }
            if (bestHTotal >= totalBooks) break;
        }
    }

    // Strategy B: Vertical strips (side by side)
    let bestVTotal = 0;
    let bestVLeft = 0;
    let bestVRight = 0;
    let bestVLeftRotated = false;
    let bestVLeftWidthCm = 0;
    let bestVRightWidthCm = 0;

    const vCutPositions = new Set<number>();
    for (let k = 1; k * bookW < paperW; k++) vCutPositions.add(k * bookW);
    for (let k = 1; k * bookH < paperW; k++) vCutPositions.add(k * bookH);

    for (const x of vCutPositions) {
        const rightW = paperW - x;

        // Left normal, right rotated
        {
            const lCols = Math.floor(x / bookW);
            const lRows = Math.floor(paperH / bookH);
            const lCount = Math.min(lCols * lRows, totalBooks);
            const rCols = Math.floor(rightW / bookH);
            const rRows = Math.floor(paperH / bookW);
            const rCount = Math.min(rCols * rRows, totalBooks - lCount);
            if (lCount + rCount > bestVTotal) {
                bestVTotal = lCount + rCount;
                bestVLeft = lCount;
                bestVRight = rCount;
                bestVLeftRotated = false;
                bestVLeftWidthCm = lCols * bookW;
                bestVRightWidthCm = rCols * bookH;
            }
        }

        // Left rotated, right normal
        {
            const lCols = Math.floor(x / bookH);
            const lRows = Math.floor(paperH / bookW);
            const lCount = Math.min(lCols * lRows, totalBooks);
            const rCols = Math.floor(rightW / bookW);
            const rRows = Math.floor(paperH / bookH);
            const rCount = Math.min(rCols * rRows, totalBooks - lCount);
            if (lCount + rCount > bestVTotal) {
                bestVTotal = lCount + rCount;
                bestVLeft = lCount;
                bestVRight = rCount;
                bestVLeftRotated = true;
                bestVLeftWidthCm = lCols * bookH;
                bestVRightWidthCm = rCols * bookW;
            }
        }

        if (bestVTotal >= totalBooks) break;
    }

    // Pick the strategy that shows the most books
    if (bestVTotal > bestHTotal) {
        const blocks: DisplayBlock[] = [];
        if (bestVLeft > 0) {
            blocks.push({
                books: Array(bestVLeft).fill(bestVLeftRotated),
                widthCm: bestVLeftWidthCm,
            });
        }
        if (bestVRight > 0) {
            blocks.push({
                books: Array(bestVRight).fill(!bestVLeftRotated),
                widthCm: bestVRightWidthCm,
            });
        }
        return blocks;
    }

    // Horizontal strips
    const blocks: DisplayBlock[] = [];
    if (bestHNormal > 0) {
        blocks.push({
            books: Array(bestHNormal).fill(false),
            widthCm: normalCols * bookW,
        });
    }
    if (bestHRotated > 0) {
        blocks.push({
            books: Array(bestHRotated).fill(true),
            widthCm: rotatedCols * bookH,
        });
    }
    return blocks;
}

const BooksSketch = ({selectedPaperRecord}: {selectedPaperRecord: PaperRecord | null}) => {
    const bookDimensions = useSelector((state: RootState) => state.bookDimensions, isEqual);

    const displayBlocks = useMemo(() => {
        if (!selectedPaperRecord || !bookDimensions) return [];
        const totalBooks = sumBy(selectedPaperRecord.booksArrangementInPaper, size);
        return computeDisplayBlocks(
            selectedPaperRecord.paperDimensions,
            bookDimensions,
            totalBooks
        );
    }, [selectedPaperRecord, bookDimensions]);

    return (
        <div id="books-sketch">
            {selectedPaperRecord &&
                bookDimensions &&
                displayBlocks.map((block, blockIndex) => {
                    if (block.books.length === 0 || block.widthCm <= 0) return null;
                    const isBlockRotated = block.books[0];
                    const effectiveBookWidth = isBlockRotated ? bookDimensions.height : bookDimensions.width;
                    if (block.widthCm < effectiveBookWidth) return null;

                    return (
                        <div
                            className="book-block"
                            key={blockIndex}
                            style={{
                                width: (block.widthCm / selectedPaperRecord.paperDimensions.width) * 100 + "%",
                            }}
                        >
                            {block.books.map((isRotated, bookIndex) => (
                                <div
                                    className={classNames("book", {rotate: isRotated})}
                                    key={bookIndex}
                                    style={
                                        isRotated
                                            ? {
                                                width: (bookDimensions.height / block.widthCm) * 100 + "%",
                                                aspectRatio: bookDimensions.height / bookDimensions.width,
                                            }
                                            : {
                                                width: (bookDimensions.width / block.widthCm) * 100 + "%",
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

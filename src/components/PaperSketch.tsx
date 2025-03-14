import "./PaperSketch.css";
import BooksSketch from "./BooksSketch";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {isEqual} from "lodash-es";

export const PaperSketch = () => {
    const selectedPaperRecord = useSelector((state: RootState) => state.selectedPaperRecord, isEqual);

    return (
        <div id="paper-sketch-container">
            <div
                id="paper-sketch"
                style={
                    selectedPaperRecord
                        ? {
                            aspectRatio: selectedPaperRecord.paperDimensions.width / selectedPaperRecord.paperDimensions.height,
                        }
                        : {width: "100%", height: "100%"}
                }
            >
                <BooksSketch selectedPaperRecord={selectedPaperRecord}/>
            </div>
        </div>
    );
};

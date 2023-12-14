import { useEffect, useState } from "react";
import "./PaperSketch.css";
import BooksSketch from "./BooksSketch";
import PaperRecord from "../interfaces/PaperRecord";
import EventEmitter from "events";

interface PaperSketchProps {
  emitter: EventEmitter;
}

export const PaperSketch = ({ emitter }: PaperSketchProps) => {
  const [selectedPaperRecord, setSelectedPaperRecord] = useState<PaperRecord>();

  useEffect(() => {
    const handleSelectedPaperRecordChange = (newSelectedPaperRecord: PaperRecord) => {
      setSelectedPaperRecord(newSelectedPaperRecord);
    };

    emitter.on("selectedPaperRecordChanged", handleSelectedPaperRecordChange);

    return () => {
      emitter.off("selectedPaperRecordChanged", handleSelectedPaperRecordChange);
    };
  }, [emitter]);

  return (
    <div id="paper-sketch-container">
      {selectedPaperRecord !== undefined ? (
        <div
          id="paper-sketch"
          style={{
            aspectRatio:
              selectedPaperRecord.width === undefined || selectedPaperRecord.height === undefined
                ? undefined
                : selectedPaperRecord.width / selectedPaperRecord.height,
          }}
        >
          <BooksSketch emitter={emitter} selectedPaperRecord={selectedPaperRecord} />
        </div>
      ) : (
        <div id="paper-sketch" />
      )}
    </div>
  );
};

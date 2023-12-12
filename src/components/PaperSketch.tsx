import { useState } from "react";
import "./PaperSketch.css";


export const PaperSketch = (onSelectedPaperSizeChangePointer: {onSelectedPaperSizeChange: (newSelectedPaperSize: { width: number; height: number; }) => void}) => {

  const [selectedPaperSize, setSelectedPaperSize] = useState({ width: 650, height: 200 });
  onSelectedPaperSizeChangePointer.onSelectedPaperSizeChange = setSelectedPaperSize

  return (
    <div id="paper-sketch-container">
      <div
        id="paper-sketch"
        style={{
          aspectRatio:
            selectedPaperSize.width === undefined || selectedPaperSize.height === undefined
              ? undefined
              : selectedPaperSize.width / selectedPaperSize.height,
        }}
      />
    </div>
  );
};
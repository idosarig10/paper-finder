import { useState } from "react";
import "./PaperLayout.css";


export const PaperLayout = (onSelectedPaperSizeChangePointer: {onSelectedPaperSizeChange: (newSelectedPaperSize: { width: number; height: number; }) => void}) => {

  const [selectedPaperSize, setSelectedPaperSize] = useState({ width: 650, height: 200 });
  onSelectedPaperSizeChangePointer.onSelectedPaperSizeChange = setSelectedPaperSize

  return (
    <div id="paper-layout-container">
      <div
        id="paper-layout"
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
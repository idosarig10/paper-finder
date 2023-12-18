import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import FixedAllignmentArrangementFinder from "../utils/FixedAlignmentArrangementFinder";
import RowFixedAllignmentArrangementFinder from "../utils/RowFixedAlignmentArrangementFinder";
import "./ArrangementFinderSelector.css";
import { EventEmitter } from "events";

const labelsArrangementFinders = {
  "Fixed Alignment": FixedAllignmentArrangementFinder,
  "Row Fixed Alignment ": RowFixedAllignmentArrangementFinder,
};

export const ArrangementFinderSelector = ({ emitter }: { emitter: EventEmitter }) => {
  return (
    <div id="arrangement-finder-selector">
      <FormControl>
        <FormLabel>Arrangement Finder</FormLabel>
        <RadioGroup row>
          {Object.entries(labelsArrangementFinders).map(([label, arrangementFinder], index) => (
            <FormControlLabel
              control={<Radio />}
              key={index}
              label={label}
              value={index}
              onChange={() => emitter.emit("arrangementFinderChanged", arrangementFinder)}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

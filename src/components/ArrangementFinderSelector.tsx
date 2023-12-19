import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import FixedAllignmentArrangementFinder from "../utils/FixedAlignmentArrangementFinder";
import RowFixedAllignmentArrangementFinder from "../utils/RowFixedAlignmentArrangementFinder";
import "./ArrangementFinderSelector.css";
import { useDispatch } from "react-redux";
import { setArrangementFinder } from "../actions";
import ArrangmentFinder from "../interfaces/ArrangementFinder";

export const labelsArrangementFinders: { [key: string]: ArrangmentFinder } = {
  "Fixed Alignment": FixedAllignmentArrangementFinder,
  "Row Fixed Alignment ": RowFixedAllignmentArrangementFinder,
};

export const ArrangementFinderSelector = () => {
  const dispatch = useDispatch();

  return (
    <div id="arrangement-finder-selector">
      <FormControl>
        <FormLabel>Arrangement Finder</FormLabel>
        <RadioGroup row>
          {Object.keys(labelsArrangementFinders).map((label, index) => (
            <FormControlLabel
              control={<Radio />}
              key={index}
              label={label}
              value={index}
              onChange={() => dispatch(setArrangementFinder(label))}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

import { Button, FormControl, TextField, RadioGroup, FormControlLabel, Radio, FormLabel } from "@mui/material";
import "./BookSizeInputBar.css";

let width: number;
let height: number;

export const BookSizeInputBar = () => {
  return (
    <div className="BookSizeInputBar">
      <div id="book-width">
        <TextField
          label="Book Width"
          type="number"
          onChange={(e) => (width = parseFloat(e.target.value))}
          InputProps={{ inputProps: { min: 0 } }}
        />
      </div>
      <div id="book-height">
        <TextField
          label="Book Height"
          type="number"
          onChange={(e) => (height = parseFloat(e.target.value))}
          InputProps={{ inputProps: { min: 0 } }}
        />
      </div>
      <div id="submit-book-size">
        <Button
          onClick={() => {
            localStorage.setItem("bookSize", JSON.stringify({ width, height }));
          }}
          variant="contained"
        >
          Submit
        </Button>
      </div>
      <div id="radio-group">
        <FormControl>
          <FormLabel>Fill Method</FormLabel>
          <RadioGroup
            row
            defaultValue="no-Rotation"
            onChange={(event) => {
              localStorage.setItem("fillMethod", event.target.value);
            }}
          >
            <FormControlLabel value="noRotation" control={<Radio />} label="No Rotation" />
            <FormControlLabel value="noRotationSameRow" control={<Radio />} label="No Rotation in Same Row" />
            <FormControlLabel value="rotationAllowed" control={<Radio />} label="Rotation Allowed" />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

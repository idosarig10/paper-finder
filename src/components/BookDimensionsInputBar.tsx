import { Button, TextField } from "@mui/material";
import "./BookDimensionsInputBar.css";
import EventEmitter from "events";
import { FormEvent, useState } from "react";

interface BookDimensionsInputBarProps {
  emitter: EventEmitter;
}

export const BookDimensionsInputBar = ({ emitter }: BookDimensionsInputBarProps) => {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (width && height) {
      emitter.emit("bookDimensionsChanged", { width, height });      
    }
  };

  return (
    <form onSubmit={handleSubmit} className="BookDimensionsInputBar">
      <div id="book-width">
        <TextField
          label="Book Width"
          type="number"
          onChange={(e) => setWidth(parseFloat(e.target.value))}
          InputProps={{ inputProps: { min: 0 } }}
        />
      </div>
      <div id="book-height">
        <TextField
          label="Book Height"
          type="number"
          onChange={(e) => setHeight(parseFloat(e.target.value))}
          InputProps={{ inputProps: { min: 0 } }}
        />
      </div>
      <div id="submit-book-dimensions">
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </div>
    </form>

    //    <div id="radio-group">
    //     <FormControl>
    //       <FormLabel>Fill Method</FormLabel>
    //       <RadioGroup
    //         row
    //         defaultValue="no-Rotation"
    //         onChange={(event) => {
    //           localStorage.setItem("fillMethod", event.target.value);
    //         }}
    //       >
    //         <FormControlLabel value="noRotation" control={<Radio />} label="No Rotation" />
    //         <FormControlLabel value="noRotationSameRow" control={<Radio />} label="No Rotation in Same Row" />
    //         <FormControlLabel value="rotationAllowed" control={<Radio />} label="Rotation Allowed" />
    //       </RadioGroup>
    //     </FormControl>
    //   </div>
    //  </div>
  );
};
import { Button, TextField } from "@mui/material";
import "./BookSizeInputBar.css";
import EventEmitter from "events";
import { FormEvent, useState } from "react";

interface BookSizeInputBarProps {
  emitter: EventEmitter;
}

export const BookSizeInputBar = ({ emitter }: BookSizeInputBarProps) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    emitter.emit("bookSizeChanged", { width, height });
  };

  return (
    <form onSubmit={handleSubmit} className="BookSizeInputBar">
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
      <div id="submit-book-size">
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

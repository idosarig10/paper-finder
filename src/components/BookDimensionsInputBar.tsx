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
          InputProps={{
            inputProps: {
              min: 0,
              step: "any",
            },
          }}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
      </div>
      <div id="book-height">
        <TextField
          label="Book Height"
          type="number"
          InputProps={{
            inputProps: {
              min: 0,
              step: "any",
            },
          }}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
      </div>
      <div id="submit-book-dimensions">
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </div>
    </form>
  );
};

import { Button, TextField } from "@mui/material";
import "./BookSizeInputBar.css"
import { FunctionComponent } from "react";


type sizeInputBarProps = {
    paperSizeSetter: React.Dispatch<React.SetStateAction<{width: number, height: number}>>
}

let width: number = 1;
let height: number = 1;

export const BookSizeInputBar: FunctionComponent<sizeInputBarProps> = ({ paperSizeSetter: setPaperSize }) => {
    return (
        <div className="BookSizeInputBar" >
            <div id="book-width">
                <TextField label="Book Width" type="number" onChange={(e) => width = parseFloat(e.target.value)} InputProps={{ inputProps: { min: 0 } }} />
            </div>
            <div id="book-height">
               <TextField label="Book Height" type="number" onChange={(e) => height = parseFloat(e.target.value)} InputProps={{ inputProps: { min: 0 } }} />
            </div>
            <div id="submit-book-size">
                <Button onClick={() => {
                    setPaperSize({width: width, height: height});
                }} variant="contained">Submit</Button>
            </div>
        </div>
    );
}
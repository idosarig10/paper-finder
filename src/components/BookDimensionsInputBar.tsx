import {Button, TextField} from "@mui/material";
import "./BookDimensionsInputBar.css";
import React, {FormEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {setBookDimensions} from "../actions";


export const BookDimensionsInputBar = () => {
    const [width, setWidth] = useState<number>();
    const [height, setHeight] = useState<number>();
    const dispatch = useDispatch();

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (width && height) {
            dispatch(setBookDimensions({width, height}));
        }
    }

    return (
        <form onSubmit={handleSubmit} className="BookDimensionsInputBar">
            <div id="book-width">
                <TextField
                    label="Book Width"
                    type="number"
                    variant="filled"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                        htmlInput: {
                            min: 0,
                            step: "any"
                        }
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setWidth(Number(event.target.value))}
                />
            </div>
            <div id="book-height">
                <TextField
                    label="Book Height"
                    type="number"
                    variant="filled"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                        htmlInput: {
                            min: 0,
                            step: "any",
                        },
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setHeight(Number(event.target.value))}
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

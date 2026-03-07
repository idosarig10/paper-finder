import {TextField} from "@mui/material";
import React from "react";
import {useDispatch} from "react-redux";
import {setPricePerSheet} from "../actions";
import "./PricePerSheetInput.css";

export const PricePerSheetInput = () => {
    const dispatch = useDispatch();

    return (
        <div className="price-per-sheet-input">
            <TextField
                label="Price per Sheet"
                type="number"
                variant="filled"
                slotProps={{
                    inputLabel: {shrink: true},
                    htmlInput: {min: 0, step: "any"},
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const val = Number(e.target.value);
                    dispatch(setPricePerSheet(val > 0 ? val : null));
                }}
            />
        </div>
    );
};

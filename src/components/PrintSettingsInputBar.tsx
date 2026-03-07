import {Accordion, AccordionDetails, AccordionSummary, Button, TextField, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, {FormEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {setPrintSettings} from "../actions";
import "./PrintSettingsInputBar.css";

export const PrintSettingsInputBar = () => {
    const dispatch = useDispatch();
    const [marginTop, setMarginTop] = useState<number>(0);
    const [marginBottom, setMarginBottom] = useState<number>(0);
    const [marginLeft, setMarginLeft] = useState<number>(0);
    const [marginRight, setMarginRight] = useState<number>(0);
    const [trimSpacing, setTrimSpacing] = useState<number>(0);

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        dispatch(setPrintSettings({
            margins: {
                top: marginTop,
                bottom: marginBottom,
                left: marginLeft,
                right: marginRight,
            },
            trimSpacing,
        }));
    }

    const numberFieldProps = {
        type: "number" as const,
        variant: "filled" as const,
        slotProps: {
            inputLabel: {shrink: true},
            htmlInput: {min: 0, step: "any"},
        },
    };

    return (
        <div className="print-settings-container">
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography>Print Settings (cm)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={handleSubmit} className="print-settings-form">
                        <div className="print-settings-grid">
                            <TextField
                                {...numberFieldProps}
                                label="Margin Top"
                                onChange={(e) => setMarginTop(Number(e.target.value))}
                            />
                            <TextField
                                {...numberFieldProps}
                                label="Margin Bottom"
                                onChange={(e) => setMarginBottom(Number(e.target.value))}
                            />
                            <TextField
                                {...numberFieldProps}
                                label="Margin Left"
                                onChange={(e) => setMarginLeft(Number(e.target.value))}
                            />
                            <TextField
                                {...numberFieldProps}
                                label="Margin Right"
                                onChange={(e) => setMarginRight(Number(e.target.value))}
                            />
                            <TextField
                                {...numberFieldProps}
                                label="Trim Spacing"
                                className="trim-spacing-field"
                                onChange={(e) => setTrimSpacing(Number(e.target.value))}
                            />
                        </div>
                        <Button type="submit" variant="contained" className="print-settings-submit">
                            Apply
                        </Button>
                    </form>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

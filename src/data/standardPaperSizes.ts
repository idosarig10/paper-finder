import Dimensions from "../interfaces/Dimensions";

export interface StandardPaperSize {
    name: string;
    dimensions: Dimensions;
}

export const STANDARD_PAPER_SIZES: StandardPaperSize[] = [
    {name: "A0", dimensions: {width: 84.1, height: 118.9}},
    {name: "A1", dimensions: {width: 59.4, height: 84.1}},
    {name: "A2", dimensions: {width: 42.0, height: 59.4}},
    {name: "A3", dimensions: {width: 29.7, height: 42.0}},
    {name: "A4", dimensions: {width: 21.0, height: 29.7}},
    {name: "A5", dimensions: {width: 14.8, height: 21.0}},
    {name: "A6", dimensions: {width: 10.5, height: 14.8}},
    {name: "B3", dimensions: {width: 35.3, height: 50.0}},
    {name: "B4", dimensions: {width: 25.0, height: 35.3}},
    {name: "B5", dimensions: {width: 17.6, height: 25.0}},
    {name: "SRA0", dimensions: {width: 90.0, height: 128.0}},
    {name: "SRA1", dimensions: {width: 64.0, height: 90.0}},
    {name: "SRA2", dimensions: {width: 45.0, height: 64.0}},
    {name: "SRA3", dimensions: {width: 32.0, height: 45.0}},
    {name: "SRA4", dimensions: {width: 22.5, height: 32.0}},
    {name: "Letter", dimensions: {width: 21.59, height: 27.94}},
    {name: "Legal", dimensions: {width: 21.59, height: 35.56}},
    {name: "Tabloid", dimensions: {width: 27.94, height: 43.18}},
];

const TOLERANCE_CM = 0.2;

export function matchPaperName(dimensions: Dimensions): string | null {
    const w = Math.min(dimensions.width, dimensions.height);
    const h = Math.max(dimensions.width, dimensions.height);

    for (const standard of STANDARD_PAPER_SIZES) {
        const sw = Math.min(standard.dimensions.width, standard.dimensions.height);
        const sh = Math.max(standard.dimensions.width, standard.dimensions.height);
        if (Math.abs(w - sw) <= TOLERANCE_CM && Math.abs(h - sh) <= TOLERANCE_CM) {
            return standard.name;
        }
    }
    return null;
}

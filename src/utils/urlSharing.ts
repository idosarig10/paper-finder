import Dimensions from "../interfaces/Dimensions";
import PrintSettings from "../interfaces/PrintSettings";

export interface ShareableState {
    bookDimensions: Dimensions | null;
    printSettings: PrintSettings;
    pricePerSheet: number | null;
    arrangementFinderLabel: string | null;
}

export function encodeStateToUrl(state: ShareableState): string {
    const params = new URLSearchParams();

    if (state.bookDimensions) {
        params.set("bw", String(state.bookDimensions.width));
        params.set("bh", String(state.bookDimensions.height));
    }
    if (state.printSettings.margins.top !== 0) params.set("mt", String(state.printSettings.margins.top));
    if (state.printSettings.margins.bottom !== 0) params.set("mb", String(state.printSettings.margins.bottom));
    if (state.printSettings.margins.left !== 0) params.set("ml", String(state.printSettings.margins.left));
    if (state.printSettings.margins.right !== 0) params.set("mr", String(state.printSettings.margins.right));
    if (state.printSettings.trimSpacing !== 0) params.set("ts", String(state.printSettings.trimSpacing));
    if (state.pricePerSheet != null) params.set("pps", String(state.pricePerSheet));
    if (state.arrangementFinderLabel) params.set("af", state.arrangementFinderLabel);

    const base = window.location.origin + window.location.pathname;
    const query = params.toString();
    return query ? `${base}?${query}` : base;
}

export function decodeStateFromUrl(): Partial<ShareableState> | null {
    const params = new URLSearchParams(window.location.search);
    if (params.size === 0) return null;

    const parseNumber = (value: string | null): number | null => {
        if (value === null) return null;
        const parsed = parseFloat(value);
        return Number.isFinite(parsed) ? parsed : null;
    };

    const result: Partial<ShareableState> = {};

    const bw = parseNumber(params.get("bw"));
    const bh = parseNumber(params.get("bh"));
    if (bw !== null && bh !== null) {
        result.bookDimensions = {width: bw, height: bh};
    }

    const mt = parseNumber(params.get("mt"));
    const mb = parseNumber(params.get("mb"));
    const ml = parseNumber(params.get("ml"));
    const mr = parseNumber(params.get("mr"));
    const ts = parseNumber(params.get("ts"));

    result.printSettings = {
        margins: {
            top: mt ?? 0,
            bottom: mb ?? 0,
            left: ml ?? 0,
            right: mr ?? 0,
        },
        trimSpacing: ts ?? 0,
    };

    const pps = parseNumber(params.get("pps"));
    if (pps !== null) result.pricePerSheet = pps;

    const af = params.get("af");
    if (af) result.arrangementFinderLabel = af;

    return result;
}

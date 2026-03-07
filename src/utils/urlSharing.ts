import Dimensions from "../interfaces/Dimensions";
import PrintSettings from "../interfaces/PrintSettings";

export interface ShareableState {
    bookDimensions: Dimensions | null;
    printSettings: PrintSettings;
    pricePerSheet: number | null;
    arrangementFinderLabel: string | null;
    selectedPaperDimensions: Dimensions | null;
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
    if (state.selectedPaperDimensions) {
        params.set("pw", String(state.selectedPaperDimensions.width));
        params.set("ph", String(state.selectedPaperDimensions.height));
    }

    const base = window.location.origin + window.location.pathname;
    return `${base}?${params.toString()}`;
}

export function decodeStateFromUrl(): Partial<ShareableState> | null {
    const params = new URLSearchParams(window.location.search);
    if (params.size === 0) return null;

    const result: Partial<ShareableState> = {};

    const bw = params.get("bw");
    const bh = params.get("bh");
    if (bw && bh) {
        result.bookDimensions = {width: Number(bw), height: Number(bh)};
    }

    result.printSettings = {
        margins: {
            top: Number(params.get("mt") ?? 0),
            bottom: Number(params.get("mb") ?? 0),
            left: Number(params.get("ml") ?? 0),
            right: Number(params.get("mr") ?? 0),
        },
        trimSpacing: Number(params.get("ts") ?? 0),
    };

    const pps = params.get("pps");
    if (pps) result.pricePerSheet = Number(pps);

    const af = params.get("af");
    if (af) result.arrangementFinderLabel = af;

    const pw = params.get("pw");
    const ph = params.get("ph");
    if (pw && ph) {
        result.selectedPaperDimensions = {width: Number(pw), height: Number(ph)};
    }

    return result;
}

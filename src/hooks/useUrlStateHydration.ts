import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {decodeStateFromUrl} from "../utils/urlSharing";
import {setBookDimensions, setArrangementFinder, setPrintSettings, setPricePerSheet} from "../actions";

export function useUrlStateHydration(): void {
    const dispatch = useDispatch();

    useEffect(() => {
        const decoded = decodeStateFromUrl();
        if (!decoded) return;

        if (decoded.bookDimensions) {
            dispatch(setBookDimensions(decoded.bookDimensions));
        }
        if (decoded.printSettings) {
            dispatch(setPrintSettings(decoded.printSettings));
        }
        if (decoded.pricePerSheet != null) {
            dispatch(setPricePerSheet(decoded.pricePerSheet));
        }
        if (decoded.arrangementFinderLabel) {
            dispatch(setArrangementFinder(decoded.arrangementFinderLabel));
        }
    }, [dispatch]);
}

import { FunctionComponent } from "react";
import "./PaperLayout.css"

type paperLayoutProps = {
    width: number,
    height: number
}

export const PaperLayout: FunctionComponent<paperLayoutProps> = ({ width, height }) => {
    return (
        <div id="paper-layout-container">
            <div id="paper-layout" style={{ aspectRatio: width / height }} />
        </div>
    )
}

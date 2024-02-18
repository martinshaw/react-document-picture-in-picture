// You should use the following line to import the component in your own project
// import ReactDocumentPictureInPicture from "react-document-picture-in-picture";
import ReactDocumentPictureInPicture, {ReactDocumentPictureInPictureForwardRefType} from "../../../component/src";

import { useEffect, useRef } from "react";

const App = () => {
    return (
        <div style={{
            fontFamily: "sans-serif",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            gap: "1rem",
        }}>
            <h1>Example - Size</h1>

            <ReactDocumentPictureInPicture
                width="50%"
                height="100%"
                buttonRenderer={
                    ({ open, close, toggle, isOpen }) => <div>
                        <b>Is {isOpen ? 'Open' : 'Closed'} </b>
                        <button onClick={open}>Open</button>
                        <button onClick={close}>Close</button>
                        <button onClick={toggle}>Toggle</button>
                    </div>
                }
            >
                <i>This text should be displayed in a Document Picture in Picture filling the maximum allow height and 50% of the width of the original window</i>
            </ReactDocumentPictureInPicture>


        </div>
    );
}

export default App;
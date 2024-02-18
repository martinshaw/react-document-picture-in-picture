// You should use the following line to import the component in your own project
// import ReactDocumentPictureInPicture from "react-document-picture-in-picture";
import ReactDocumentPictureInPicture, {ReactDocumentPictureInPictureForwardRefType} from "../../../component/src";

import { useEffect, useRef } from "react";

const App = () => {
    const pipWindowRef = useRef<ReactDocumentPictureInPictureForwardRefType>();

    useEffect(() => {

        /**
         * On the first render, because the Document Picture in Picture window is not open, the window object will be null
         */
        console.log("On first render => ", pipWindowRef.current, pipWindowRef.current?.window())

        /**
         * After 5 seconds, if you have clicked the "Open" button below, you should see the window object logged in the console here
         */
        setTimeout(() => {
            console.log('After 5 seconds => ', pipWindowRef.current, pipWindowRef.current?.window())
        }, 5000);

        /**
         * After 10 seconds, we will programmatically close the window if it is open
         */
        setTimeout(() => {
            pipWindowRef?.current?.close()
            console.log('After 10 seconds => ', pipWindowRef.current, pipWindowRef.current?.window())
        }, 10000);

    }, [pipWindowRef]);

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
            <h1>Example - Using Ref</h1>

            <p>
                After 5 seconds, if you have clicked the "Open" button below, you should see the window object logged in the console.
                <br/><br/>
                After 10 seconds, we will programmatically close the window if it is open.
            </p>

            <ReactDocumentPictureInPicture
                ref={pipWindowRef}
                content={<i>This text should be displayed in a Document Picture in Picture in the bottom right of the original window</i>}
            >
                {
                    ({ open, close, toggle, isOpen }) => <div>
                        <b>Is {isOpen ? 'Open' : 'Closed'} </b>
                        <button onClick={open}>Open</button>
                        <button onClick={close}>Close</button>
                        <button onClick={toggle}>Toggle</button>
                    </div>
                }
            </ReactDocumentPictureInPicture>


        </div>
    );
}

export default App;
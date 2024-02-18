// You should use the following line to import the component in your own project
// import ReactDocumentPictureInPicture from "react-document-picture-in-picture";
import ReactDocumentPictureInPicture, {ReactDocumentPictureInPictureForwardRefType} from "../../../component/src";

import { useEffect, useRef } from "react";
import CodeSnippet from "../CodeSnippet";

const UsingRefExampleSection = () => {
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
        <div className="example-section">
            <CodeSnippet>
                {`
import ReactDocumentPictureInPicture, { ReactDocumentPictureInPictureForwardRefType } from "react-document-picture-in-picture";

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
`}
            </CodeSnippet>

            <div className="arrow-divider">&darr;</div>

            <ReactDocumentPictureInPicture
                ref={pipWindowRef}
                buttonRenderer={
                    ({ open, isOpen }) => <div className="button-bar">
                        <b>Is {isOpen ? 'Open' : 'Closed'} </b>
                        <button className="button" onClick={open}>Open</button>
                    </div>
                }
            >
                <i>This text should be displayed in a Document Picture in Picture in the bottom right of the original window</i>
            </ReactDocumentPictureInPicture>

        </div>
    );
}

export default UsingRefExampleSection;
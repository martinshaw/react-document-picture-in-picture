// You should use the following line to import the component in your own project
// import ReactDocumentPictureInPicture from "react-document-picture-in-picture";
import ReactDocumentPictureInPicture from "../../../component/src";
import CodeSnippet from "../CodeSnippet";

const SizeExampleSection = () => {
    return (
        <div className="example-section">
            <CodeSnippet>
                {`
import ReactDocumentPictureInPicture from "react-document-picture-in-picture";

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
`}
            </CodeSnippet>

            <div className="arrow-divider">&darr;</div>

            <ReactDocumentPictureInPicture
                width="50%"
                height="100%"
                buttonRenderer={
                    ({ open, close, toggle, isOpen }) => <div className="button-bar">
                        <b>Is {isOpen ? 'Open' : 'Closed'} </b>
                        <button className="button" onClick={open}>Open</button>
                        <button className="button" onClick={close}>Close</button>
                        <button className="button" onClick={toggle}>Toggle</button>
                    </div>
                }
            >
                <i>This text should be displayed in a Document Picture in Picture filling the maximum allow height and 50% of the width of the original window</i>
            </ReactDocumentPictureInPicture>


        </div>
    );
}

export default SizeExampleSection;
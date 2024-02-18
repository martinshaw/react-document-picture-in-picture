// You should use the following line to import the component in your own project
// import ReactDocumentPictureInPicture from "react-document-picture-in-picture";
import ReactDocumentPictureInPicture from "../../../component/src";
import CodeSnippet from "../CodeSnippet";

const EventsExampleSection = () => {
    return (
        <div className="example-section">
            <CodeSnippet>
                {`
import ReactDocumentPictureInPicture from "react-document-picture-in-picture";

<ReactDocumentPictureInPicture
    buttonRenderer={
        ({ open, close, toggle, isOpen }) => <div>
            <b>Is {isOpen ? 'Open' : 'Closed'} </b>
            <button onClick={open}>Open</button>
            <button onClick={close}>Close</button>
            <button onClick={toggle}>Toggle</button>
        </div>
    }
    onOpen={() => console.log('Opened')}
    onClose={() => console.log('Closed')}
    onResize={(width, height) => console.log('Resized to ' + width + 'x' + height)}
>
    This text should be displayed in a Document Picture in Picture in the bottom right of the original window
</ReactDocumentPictureInPicture>
`}
            </CodeSnippet>

            <div className="arrow-divider">&darr;</div>

            <ReactDocumentPictureInPicture
                buttonRenderer={
                    ({ open, close, toggle, isOpen }) => <div className="button-bar">
                        <b>Is {isOpen ? 'Open' : 'Closed'}</b>
                        <button className="button" onClick={open}>Open</button>
                        <button className="button" onClick={close}>Close</button>
                        <button className="button" onClick={toggle}>Toggle</button>
                    </div>
                }
                onOpen={() => console.log('Opened')}
                onClose={() => console.log('Closed')}
                onResize={(width, height) => console.log('Resized to ' + width + 'x' + height)}
                >
                This text should be displayed in a Document Picture in Picture in the bottom right of the original window
            </ReactDocumentPictureInPicture>

            <p className="subtle-text">
                There are a few useful event props which you can use to listen to the state of the Picture in Picture window: <code>onOpen</code>, <code>onClose</code>, <code>onResize</code>
                <br/><br/>
                Open the console to see the logs.
            </p>

        </div>
    );
}

export default EventsExampleSection;
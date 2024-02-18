// You should use the following line to import the component in your own project
// import ReactDocumentPictureInPicture from "react-document-picture-in-picture";
import ReactDocumentPictureInPicture from "../../../component/src";

const EventsExampleSection = () => {
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
            <h1>Example - Events</h1>

            <p>
                There are a few useful event props which you can use to listen to the state of the Picture in Picture window: <code>onOpen</code>, <code>onClose</code>, <code>onResize</code>
                <br/><br/>
                Open the console to see the logs.
            </p>

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


        </div>
    );
}

export default EventsExampleSection;
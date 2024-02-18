// You should use the following line to import the component in your own project
// import ReactDocumentPictureInPicture from "react-document-picture-in-picture";
import ReactDocumentPictureInPicture from "../../component/src";

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
            <h1>Example Basic</h1>
            <p>Open the console to see the logs</p>

            <ReactDocumentPictureInPicture
                width="100%" 
                height="100%" 
                content={<i>This text should be displayed in a Document Picture in Picture in the top left of the original window</i>}
            >
                {
                    ({ open, close, toggle, isOpen }) => <div>
                        <b>Top Left {isOpen ? 'Open' : 'Closed'}</b>
                        <button onClick={open}>Open</button>
                        <button onClick={close}>Close</button>
                        <button onClick={toggle}>Toggle</button>
                    </div>
                }
            </ReactDocumentPictureInPicture>

            <ReactDocumentPictureInPicture
                width="100%" 
                height="100%" 
                content={<i>This text should be displayed in a Document Picture in Picture in the top right of the original window</i>}
            >
                {
                    ({ open, close, toggle }) => <div>
                        <b>Top Right</b>
                        <button onClick={open}>Open</button>
                        <button onClick={close}>Close</button>
                        <button onClick={toggle}>Toggle</button>
                    </div>
                }
            </ReactDocumentPictureInPicture>

            <ReactDocumentPictureInPicture
                width="100%" 
                height="100%" 
                content={<i>This text should be displayed in a Document Picture in Picture in the bottom left of the original window</i>}
            >
                {
                    ({ open, close, toggle }) => <div>
                        <b>Bottom Left</b>
                        <button onClick={open}>Open</button>
                        <button onClick={close}>Close</button>
                        <button onClick={toggle}>Toggle</button>
                    </div>
                }
            </ReactDocumentPictureInPicture>

            <ReactDocumentPictureInPicture
                width="100%" 
                height="100%" 
                content={<i>This text should be displayed in a Document Picture in Picture in the bottom right of the original window</i>}
            >
                {
                    ({ open, close, toggle }) => <div>
                        <b>Bottom Right</b>
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
import ReactDocumentPictureInPicture from "react-document-picture-in-picture";
import CodeSnippet from "../CodeSnippet";

const ShareStylesExampleSection = () => {
  return (
    <div className="example-section">
      <CodeSnippet>
        {`
import ReactDocumentPictureInPicture from "react-document-picture-in-picture";

<ReactDocumentPictureInPicture
    shareStyles
    buttonRenderer={({ open }) => <button className="button" onClick={open}>Open Styled</button>}
>
    <div>
        <i>This window should be styled with the styles from the main window</i>
        <button className="button">Styled Button</button>
    </div>
</ReactDocumentPictureInPicture>
`}
      </CodeSnippet>

      <div className="arrow-divider">&darr;</div>

      <div className="button-bar">
        <ReactDocumentPictureInPicture
          buttonRenderer={({ open }) => (
            <button className="button" onClick={open}>
              Open Unstyled
            </button>
          )}
        >
          <div>
            <i>
              This window should not be styled with the styles from the main
              window
            </i>
            <button className="button">Unstyled Button</button>
          </div>
        </ReactDocumentPictureInPicture>

        <ReactDocumentPictureInPicture
          shareStyles
          buttonRenderer={({ open }) => (
            <button className="button" onClick={open}>
              Open Styled
            </button>
          )}
        >
          <div>
            <i>
              This window should be styled with the styles from the main window
            </i>
            <button className="button">Styled Button</button>
          </div>
        </ReactDocumentPictureInPicture>
      </div>
    </div>
  );
};

export default ShareStylesExampleSection;

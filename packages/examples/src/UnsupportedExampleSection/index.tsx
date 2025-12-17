import ReactDocumentPictureInPicture from "react-document-picture-in-picture";
import CodeSnippet from "../CodeSnippet";

const UnsupportedExampleSection = () => {
  return (
    <div className="example-section">
      <CodeSnippet>
        {`
import ReactDocumentPictureInPicture from "react-document-picture-in-picture";

<ReactDocumentPictureInPicture
    featureUnavailableRenderer={(reason) => <div>Feature Unavailable: {reason}</div>}
    buttonRenderer={({ open }) => <button onClick={open}>Open</button>}
>
    <i>This Document Picture-in-Picture window and its activating button will not appear when this experimental feature isn't available in your browser</i>
</ReactDocumentPictureInPicture>
`}
      </CodeSnippet>

      <div className="arrow-divider">&darr;</div>

      <ReactDocumentPictureInPicture
        featureUnavailableRenderer={(reason) => (
          <div>Feature Unavailable: {reason}</div>
        )}
        buttonRenderer={({ open }) => (
          <button className="button" onClick={open}>
            Open
          </button>
        )}
      >
        <i>
          This Document Picture-in-Picture window and its activating button will
          not appear when this experimental feature isn't available in your
          browser
        </i>
      </ReactDocumentPictureInPicture>

      <p className="subtle-text">
        View this page in a browser such as Safari or Firefox and you will see{" "}
        <code>Feature Unavailable: API_NOT_SUPPORTED</code> rendered in place of
        the activating button.
        <br />
        <br />
        Attempt to use this component on a website not served over HTTPS and you
        will see <code>Feature Unavailable: USING_UNSECURE_PROTOCOL</code>{" "}
        rendered in place of the activating button.
        <br />
        <br />
        Without the <code>featureUnavailableRenderer</code> prop, the component
        will quietly render nothing when the feature is unavailable.
      </p>
    </div>
  );
};

export default UnsupportedExampleSection;

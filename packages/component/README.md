# react-document-picture-in-picture

Easily and quickly use Chrome's new experimental Document Picture-in-Picture API as a zero-dependency React component.

## Installation

```bash
npm install react-document-picture-in-picture
```

Installs the [`component`](https://github.com/martinshaw/react-document-picture-in-picture/tree/master/packages/component) package from this monorepo project.

## Usage

```tsx
import ReactDocumentPictureInPicture from "react-document-picture-in-picture";

// Inside your React component ...
<ReactDocumentPictureInPicture
    buttonRenderer={
        ({ open, close, toggle, isOpen }) => 
            <div>
                <b>Is {isOpen ? 'Open' : 'Closed'}</b>
                <button className="button" onClick={open}>Open</button>
                <button className="button" onClick={close}>Close</button>
                <button className="button" onClick={toggle}>Toggle</button>
            </div>
    }
    onOpen={() => console.log('Opened')}
    onClose={() => console.log('Closed')}
    onResize={(w, h) => console.log('Resized to ' + w + 'x' + h)}
>
    This text should be displayed in a Document Picture in Picture in the bottom right of the original window
</ReactDocumentPictureInPicture>

```

There are at least three useful examples demonstrating how to use event props, the ref prop and size props in the [`examples`](https://github.com/martinshaw/react-document-picture-in-picture/tree/master/packages/examples) package of this monorepo.

To quickly take a look at the examples, clone the repository, install PNPM and run the following commands:

```bash
pnpm install 
pnpm run --filter react-document-picture-in-picture build
pnpm run --filter examples start
```

The examples will be available at `http://localhost:1234/` in your browser.


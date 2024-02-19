import { ReactElement, ReactNode, useState } from "react";
import SizeExampleSection from "./SizeExampleSection";
import EventsExampleSection from "./EventsExampleSection";
import UsingRefExampleSection from "./UsingRefExampleSection";
import UnsupportedExampleSection from "./UnsupportedExampleSection";
import ShareStylesExampleSection from "./ShareStylesExampleSection";

const exampleSectionNames = [
    'size',
    'events',
    'using-ref',
    'unsupported',
    'share-styles',
] as const;
type ExampleSectionNameType = typeof exampleSectionNames[number];

const exampleSections: Record<ExampleSectionNameType, () => ReactNode> = {
    'size': SizeExampleSection,
    'events': EventsExampleSection,
    'using-ref': UsingRefExampleSection,
    'unsupported': UnsupportedExampleSection,
    'share-styles': ShareStylesExampleSection,
};

const App = () => {
    const [visibleSection, setVisibleSection] = useState<ExampleSectionNameType>(exampleSectionNames[0])
    const ExampleSection = exampleSections[visibleSection];

    return (
        <div>

            <nav>
                <div>
                    React Document Picture in Picture
                    <ul>
                        <li><a className="button" onClick={() => setVisibleSection('size')}>Size</a></li>
                        <li><a className="button" onClick={() => setVisibleSection('events')}>Events</a></li>
                        <li><a className="button" onClick={() => setVisibleSection('using-ref')}>Using Ref</a></li>
                        <li><a className="button" onClick={() => setVisibleSection('unsupported')}>Unsupported</a></li>
                        <li><a className="button" onClick={() => setVisibleSection('share-styles')}>Share Styles</a></li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li><a className="button" href="https://www.npmjs.com/package/react-document-picture-in-picture" target="_blank">NPM</a></li>
                        <li><a className="button" href="https://www.github.com/martinshaw/react-document-picture-in-picture" target="_blank">GitHub</a></li>
                        <li><a className="button" href="https://martinshaw.co">My Other Work</a></li>
                    </ul>
                </div>
            </nav>

            <div>
                <ExampleSection />
            </div>

        </div>
    );
}

export default App;
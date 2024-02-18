import { ReactElement, ReactNode, useState } from "react";
import SizeExampleSection from "./SizeExampleSection";
import EventsExampleSection from "./EventsExampleSection";
import UsingRefExampleSection from "./UsingRefExampleSection";

const exampleSectionNames = [
    'size',
    'events',
    'using-ref',
] as const;
type ExampleSectionNameType = typeof exampleSectionNames[number];

const exampleSections: Record<ExampleSectionNameType, () => ReactNode> = {
    'size': SizeExampleSection,
    'events': EventsExampleSection,
    'using-ref': UsingRefExampleSection,
};

const App = () => {
    const [visibleSection, setVisibleSection] = useState<ExampleSectionNameType>(exampleSectionNames[0])
    const ExampleSection = exampleSections[visibleSection];

    return (
        <div>

            <nav>
                <div>
                    React Document Picture in Picture
                </div>
                <div> 
                    <ul>
                        <li><a className="button" onClick={() => setVisibleSection('size')}>Size</a></li>
                        <li><a className="button" onClick={() => setVisibleSection('events')}>Events</a></li>
                        <li><a className="button" onClick={() => setVisibleSection('using-ref')}>Using Ref</a></li>
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
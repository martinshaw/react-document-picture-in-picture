import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';

export type CodeSnippetPropsType = {
    children: string;
};

const CodeSnippet = (props: CodeSnippetPropsType) => {
    // Escape the HTML string and add line breaks
    let escapedString = props.children;
    
    // If first character is a newline, remove it
    if (escapedString[0] === '\n') escapedString = escapedString.slice(1);

    const copyCode = () => {
        navigator.clipboard.writeText(escapedString);
    }

    return (
        <div className="code-snippet">
            <button onClick={() => copyCode()}>Copy</button>
            <SyntaxHighlighter language="tsx" style={nightOwl}>
                {escapedString}
            </SyntaxHighlighter>
        </div>
    );
}

export default CodeSnippet;
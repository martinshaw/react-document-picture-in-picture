/*
All Rights Reserved, (c) 2024 Martin Shaw

Author: Martin Shaw (developer@martinshaw.co)
File Name: ReactDocumentPictureInPicture.tsx
Created:  2024-02-18T16:25:36.815Z
Modified: 2024-02-18T16:25:36.815Z

Description: description
*/

import { ReactNode, useRef, useState, useCallback } from "react";

export type ReactDocumentPictureInPicturePropsType = {
    width?: string | number;
    height?: string | number;
    isVisible?: boolean;
    content?: ReactNode | ((props: { close: () => void, isOpen: boolean }) => ReactNode);
    children?: ReactNode | ((props: { open: () => void, close: () => void, toggle: () => void, isOpen: boolean }) => ReactNode);
}

const ReactDocumentPictureInPicture = (
    props: ReactDocumentPictureInPicturePropsType
) => {
    const contentRef = useRef<HTMLDivElement>();
    const pipWindow = useRef<Window>();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const close = useCallback(() => {
        if (pipWindow.current == null) return;

        pipWindow.current.close();

        setIsOpen(false)
    }, [contentRef, pipWindow, setIsOpen]);

    const open = useCallback(async () => {
        if (contentRef.current == null) return;

        const contentElement = contentRef.current;

        pipWindow.current = await window.documentPictureInPicture.requestWindow();
        pipWindow.current.document.body.append(contentElement);

        pipWindow.current.addEventListener('pagehide', () => close());

        setIsOpen(true);
    }, [contentRef, pipWindow, setIsOpen, close]);

    const toggle = useCallback(() => isOpen ? close() : open(), [isOpen]);

    const children: ReactNode = typeof props.children === "function" ? props.children({ open, close, toggle, isOpen }) : props.children;
    const content: ReactNode = typeof props.content === "function" ? props.content({ close, isOpen }) : props.content;

    return (
        <div>
            {children}
            <div ref={contentRef} style={{
                display: isOpen ? 'block' : "none"
            }}>
                {content}
            </div>
        </div>
    );
}

export default ReactDocumentPictureInPicture;
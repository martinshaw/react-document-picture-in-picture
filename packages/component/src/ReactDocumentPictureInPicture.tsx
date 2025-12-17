"use client";

import { ReactNode, useRef, useState, useCallback, forwardRef, useEffect, useImperativeHandle, useMemo } from "react";
import { createPortal } from "react-dom";

/**
 * If you wish, you can interact with the window, its document's DOM, and convenience 
 *   methods imperatively using the `ref` prop.
 * 
 * Due to Chrome's current security policy regarding the Document Picture in Picture 
 *   feature, you cannot open a new window programmatically.
 * 
 * You should instead use the `children` prop to render a button or other element 
 *   which calls the `open` method on user interaction.
 */
export type ReactDocumentPictureInPictureForwardRefType = {
    window: () => Window | undefined;
    isOpen: boolean;
    close: () => void;
};

export enum FeatureUnavailableReasonEnum {
    USING_UNSECURE_PROTOCOL = "USING_UNSECURE_PROTOCOL",
    API_NOT_SUPPORTED = "API_NOT_SUPPORTED",
};

export type ReactDocumentPictureInPicturePropsType = {
    width?: string | number;
    height?: string | number;
    shareStyles?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    onResize?: (width: number, height: number) => void;
    featureUnavailableRenderer?: ReactNode | ((reason: FeatureUnavailableReasonEnum) => ReactNode);
    buttonRenderer?: ReactNode | ((props: { open: () => void, close: () => void, toggle: () => void, isOpen: boolean }) => ReactNode);
    children?: ReactNode;
};

const ReactDocumentPictureInPicture = forwardRef<
    ReactDocumentPictureInPictureForwardRefType,
    ReactDocumentPictureInPicturePropsType
>((props, ref) => {
    const pipWindow = useRef<Window>();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const absoluteDimensions = useMemo(() => {
        let absoluteWidth: number = 500;
        let absoluteHeight: number = 400;

        if (typeof props.width === "number") absoluteWidth = props.width;
        else if (typeof props.width === "string") {
            if (props.width.endsWith('px')) absoluteWidth = parseInt(props.width);
            else if (props.width.endsWith('%')) absoluteWidth = window.innerWidth * (parseInt(props.width) / 100)
        }

        if (typeof props.height === "number") absoluteHeight = props.height;
        else if (typeof props.height === "string") {
            if (props.height.endsWith('px')) absoluteHeight = parseInt(props.height);
            else if (props.height.endsWith('%')) absoluteHeight = window.innerHeight * (parseInt(props.height) / 100)
        }

        return { width: absoluteWidth, height: absoluteHeight };
    }, [props.width, props.height]);

    const close = useCallback(() => {
        if (pipWindow.current == null) return;

        pipWindow.current.close();

        setIsOpen(false)

        if (props.onClose) props.onClose();
    }, [pipWindow.current, setIsOpen]);

    const open = useCallback(async () => {
        pipWindow.current = await window.documentPictureInPicture.requestWindow({ ...absoluteDimensions });

        if (props.shareStyles === true) {
            [...document.styleSheets].forEach((styleSheet) => {
                try {
                    const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
                    const style = document.createElement('style');

                    style.textContent = cssRules;
                    pipWindow.current.document.head.appendChild(style);
                } catch (e) {
                    const link = document.createElement('link');

                    link.rel = 'stylesheet';
                    link.type = styleSheet.type;
                    if (styleSheet.media.length > 0) {
                        link.media = styleSheet.media.mediaText;
                    }
                    link.href = styleSheet.href;
                    pipWindow.current.document.head.appendChild(link);
                }
            });
        }

        pipWindow.current.addEventListener('pagehide', () => close());
        pipWindow.current.addEventListener('resize', (event) => {
            if (props.onResize) props.onResize(
                (event.target as Window).innerWidth,
                (event.target as Window).innerHeight
            );
        });

        setIsOpen(true);

        if (props.onOpen) props.onOpen();
    }, [pipWindow, setIsOpen, close, absoluteDimensions, props.shareStyles]);

    const toggle = useCallback(() => isOpen ? close() : open(), [isOpen]);

    useImperativeHandle(ref, () => ({
        window: () => pipWindow.current,
        isOpen,
        close,
    }), [
        pipWindow,
        isOpen,
        close,
    ]);


    let featureUnavailableReason: FeatureUnavailableReasonEnum | null = (() => {
        const isSecureContext = window.isSecureContext;
        if (isSecureContext === false) return FeatureUnavailableReasonEnum.USING_UNSECURE_PROTOCOL;

        const featureIsAvailable = 'documentPictureInPicture' in window;
        if (featureIsAvailable === false) return FeatureUnavailableReasonEnum.API_NOT_SUPPORTED;

        return null;
    })();

    if (featureUnavailableReason != null && props.featureUnavailableRenderer == null) return;

    if (featureUnavailableReason != null) {
        const featureUnavailableRenderer: ReactNode = typeof props.featureUnavailableRenderer === "function" ? props.featureUnavailableRenderer(featureUnavailableReason) : props.featureUnavailableRenderer;
        return featureUnavailableRenderer;
    }

    const buttonRenderer: ReactNode = typeof props.buttonRenderer === "function" ? props.buttonRenderer({ open, close, toggle, isOpen }) : props.buttonRenderer;

    return (
        <div>
            {buttonRenderer}
            {pipWindow.current ?
                createPortal(
                    <div style={{
                        display: isOpen ? 'block' : 'none',
                        width: '100%',
                        height: '100%',
                    }}>
                        {props.children}
                    </div>,
                    pipWindow.current.document.body
                ) : null
            }
        </div>
    );
})

export default ReactDocumentPictureInPicture;
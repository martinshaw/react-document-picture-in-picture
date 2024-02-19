import { ReactNode, useRef, useState, useCallback, forwardRef, useEffect, useImperativeHandle, useMemo } from "react";

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
    onOpen?: () => void;
    onClose?: () => void;
    onResize?: (width: number, height: number) => void;
    featureUnavailableRenderer?: ReactNode | ((reason: FeatureUnavailableReasonEnum) => ReactNode);
    buttonRenderer?: ReactNode | ((props: { open: () => void, close: () => void, toggle: () => void, isOpen: boolean }) => ReactNode);
    children?: ReactNode | ((props: { close: () => void, isOpen: boolean }) => ReactNode);
};

const ReactDocumentPictureInPicture = forwardRef<
    ReactDocumentPictureInPictureForwardRefType,
    ReactDocumentPictureInPicturePropsType
>((props, ref) => {
    const contentRef = useRef<HTMLDivElement>();
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

        return {width: absoluteWidth, height: absoluteHeight};
    }, [props.width, props.height]);

    const close = useCallback(() => {
        if (pipWindow.current == null) return;

        pipWindow.current.close();

        setIsOpen(false)
        
        if (props.onClose) props.onClose();
    }, [contentRef, pipWindow, setIsOpen]);

    const open = useCallback(async () => {
        if (contentRef.current == null) return;

        const contentElement = contentRef.current;

        pipWindow.current = await window.documentPictureInPicture.requestWindow({...absoluteDimensions});
        pipWindow.current.document.body.append(contentElement);

        pipWindow.current.addEventListener('pagehide', () => close());
        pipWindow.current.addEventListener('resize', (event) => {            
            if (props.onResize) props.onResize(
                (event.target as Window).innerWidth,
                (event.target as Window).innerHeight
            );
        });

        setIsOpen(true);

        if (props.onOpen) props.onOpen();
    }, [contentRef, pipWindow, setIsOpen, close, absoluteDimensions]);

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

    const children: ReactNode = typeof props.children === "function" ? props.children({ close, isOpen }) : props.children;
    const buttonRenderer: ReactNode = typeof props.buttonRenderer === "function" ? props.buttonRenderer({ open, close, toggle, isOpen }) : props.buttonRenderer;

    let featureUnavailableReason: FeatureUnavailableReasonEnum | null = (() => {
        const isUsingSecureProtocol = window.location.protocol === 'https:';
        if (isUsingSecureProtocol === false) return FeatureUnavailableReasonEnum.USING_UNSECURE_PROTOCOL;

        const featureIsAvailable = 'documentPictureInPicture' in window;
        if (featureIsAvailable === false) return FeatureUnavailableReasonEnum.API_NOT_SUPPORTED;

        return null;
    })();

    if (featureUnavailableReason != null && props.featureUnavailableRenderer == null) return;

    if (featureUnavailableReason != null) {
        const featureUnavailableRenderer: ReactNode = typeof props.featureUnavailableRenderer === "function" ? props.featureUnavailableRenderer(featureUnavailableReason) : props.featureUnavailableRenderer;
        return featureUnavailableRenderer;
    }

    return (
        <div>
            {buttonRenderer}
            <div ref={contentRef} style={{
                display: isOpen ? 'block' : 'none',
                width: '100%',
                height: '100%',
            }}>
                {children}
            </div>
        </div>
    );
})

export default ReactDocumentPictureInPicture;
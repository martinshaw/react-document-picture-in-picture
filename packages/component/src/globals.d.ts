interface Window {
  documentPictureInPicture: {
    requestWindow: (options?: {
      width: number;
      height: number;
    }) => Promise<Window>;
  };
}

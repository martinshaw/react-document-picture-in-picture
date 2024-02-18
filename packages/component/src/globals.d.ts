/*
All Rights Reserved, (c) 2024 Martin Shaw

Author: Martin Shaw (developer@martinshaw.co)
File Name: globals.d.ts
Created:  2024-02-18T17:18:14.225Z
Modified: 2024-02-18T17:18:14.225Z

Description: description
*/

interface Window {
  documentPictureInPicture: {
    requestWindow: (options?: {
      width: number;
      height: number;
    }) => Promise<Window>;
  };
}

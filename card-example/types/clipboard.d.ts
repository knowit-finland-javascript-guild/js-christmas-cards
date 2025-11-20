export {};

declare global {
  interface ClipboardItemData {
    [mimeType: string]: Blob;
  }

  class ClipboardItem {
    constructor(data: ClipboardItemData);
  }
}

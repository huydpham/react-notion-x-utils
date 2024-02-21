// index.d.ts

declare module "react-notion-x-utils" {
  export function returnCachedIfExist(
    pageId: string,
    dbDataGetter: (pageId: string) => Promise<any>
  ): Promise<any>;

  export function getExtractionTools(recordMap: any): {
    blockArray: any[];
    getId: (block: any) => string;
    getTitle: (block: any) => string;
    getCreatedTime: (block: any) => number;
    getValue: (block: any, name: string) => any;
    getDate: (block: any, name: string) => string;
  };
}

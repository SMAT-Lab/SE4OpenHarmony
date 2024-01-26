declare module "@xmldom/xmldom" {
  var DOMParser: DOMParserStatic;
  var XMLSerializer: XMLSerializerStatic;
  var DOMImplementation: DOMImplementationStatic;

  interface DOMImplementationStatic {
      new(): ESObject;
  }

  interface DOMParserStatic {
      new (): DOMParser;
      new (options: Options): DOMParser;
  }

  interface XMLSerializerStatic {
      new (): XMLSerializer;
  }

  interface DOMParser {
      parseFromString(xmlsource: string, mimeType?: string): ESObject;
  }

  interface XMLSerializer {
      serializeToString(node: ESObject): string;
  }

  interface Options {
      locator?: any;
      errorHandler?: ErrorHandlerFunction | ErrorHandlerObject | undefined;
  }

  interface ErrorHandlerFunction {
      (level: string, msg: any): any;
  }

  interface ErrorHandlerObject {
      warning?: ((msg: any) => any) | undefined;
      error?: ((msg: any) => any) | undefined;
      fatalError?: ((msg: any) => any) | undefined;
  }
}


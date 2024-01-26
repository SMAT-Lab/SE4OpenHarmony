export default interface XComponentContext {
  drawPattern(): void;

  getStatus(): XComponentContextStatus;
};

type XComponentContextStatus = {
  hasDraw: boolean,
  hasChangeColor: boolean,
};

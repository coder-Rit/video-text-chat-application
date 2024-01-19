declare module "*.jpeg" {
  const value: any;
  export = value;
}

declare namespace JSX {
  interface IntrinsicElements {
    "tgs-player": any;
  }
}
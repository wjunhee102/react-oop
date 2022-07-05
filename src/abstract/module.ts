import React from "react";

export interface ModuleProps {
  provider?: any;
  repository?: any;
  validation?: any;
  controller?: any;
  view: React.FC;
}

export abstract class Module {

  public abstract element: React.FC<any>;

}
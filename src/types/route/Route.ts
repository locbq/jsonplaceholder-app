import type React from "react";

export interface RouteModel {
  exact: boolean;
  path: string;
  component: React.ReactNode;
}

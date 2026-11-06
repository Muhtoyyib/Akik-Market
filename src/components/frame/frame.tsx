import {cn} from "cn";
import type {ReactNode} from "react";

/** The page frame from the spacing spec: centred, at most 1440px wide, with 16/32/64px gutters. */
export function Frame({children, className}: {children: ReactNode; className?: string}) {
  return <div className={cn("mx-auto w-full max-w-360 px-4 md:px-8 xl:px-16", className)}>{children}</div>;
}

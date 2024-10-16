import { HeadingCache } from "obsidian";

export interface TOCProps {
  headings: HeadingCache[]|undefined|null;
  filePath: string
}

export interface LinkProps {
  headings: HeadingCache[];
  filePath: string
}

export interface HeadingMap {
  headingCache : HeadingCache;
  element : JSX.Element
}
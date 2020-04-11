import { Rendition } from './Rendition';
import { Speed } from './Speed';

export interface Settings {
  renditions?: Rendition[];
  speed?: Speed | string;
  videoCodec?: string;
  audioCodec?: string;
  printLogs?: boolean;
}

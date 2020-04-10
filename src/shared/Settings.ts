import { Rendition } from './Rendition';
import { Speed } from './Speed';

export interface Settings {
  renditions?: Rendition[];
  speed?: Speed;
  videoCodec?: string;
  audioCodec?: string;
}

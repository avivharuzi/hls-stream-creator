# HLS Stream Creator - Node.js

Create an M3U8 playlist from media file using FFMPEG.

## Installation

```sh
npm i hls-stream-creator
```

## Prerequisites

This package using fluent-ffmpeg so **ffmpeg** must be installed it requires at least ffmpeg 0.9 to work.

You must also have ffprobe installed (it comes with ffmpeg in most distributions).

**Windows users**: most probably ffmpeg and ffprobe will _not_ be in your `%PATH`, so you _must_ set `%FFMPEG_PATH` and `%FFPROBE_PATH`.

**Debian/Ubuntu users**: the official repositories have the ffmpeg/ffprobe executable in the `libav-tools` package, and they are actually rebranded avconv/avprobe executables (avconv is a fork of ffmpeg).  They should be mostly compatible, but should you encounter any issue, you may want to use the real ffmpeg instead.  You can either compile it from source or find a pre-built .deb package at https://ffmpeg.org/download.html (For Ubuntu, the `ppa:mc3man/trusty-media` PPA provides recent builds).

## Usage

```js
const hlsStreamCreator = require('hls-stream-creator');

(async () => {
  const settings = {
    renditions: [
      {
        resolution: {
          width: 1920,
          height: 1080,
        },
        bitrate: 8000,
        audioRate: 320,
      },
      {
        resolution: {
          width: 1280,
          height: 720,
        },
        bitrate: 4000,
        audioRate: 192,
      },
    ],
    printLogs: true
  };
  
  try {
    await hlsStreamCreator('./sample.mkv', './output', settings);
  } catch (err) {
    console.log(`Oops we got an error, err: ${err}`);
  }
})();
```

## API

### hlsStreamCreator(src, targetDir, settings?)

Returns a `Promise<void>`.

#### src

Type: `string`

Media file.

If media file does not exists will be thrown an error.

#### targetDir

Type: `string`

Destination directory which will hold all the mpeg-ts files with m3u8 files.

#### settings

Type: `object`

In addition, you can specify the below options.

##### renditions

Type:
```text
{
  resolution: {
    width: number, // example: 1920
    height: number, // example: 1080
  },
  bitrate: number, // example: 8000
  audioRate: number, // example: 320
}
```
Default: `[]`

Must be at least one rendition if not will be thrown an error.

##### speed

Type: `Speed | string`\
Default: `veryfast`

The speed will be for making the stream files.

Can be: `'ultrafast' || 'superfast' || 'veryfast' || 'faster' || 'fast' || 'medium' || 'slow' || 'slower' || 'veryslow'`

##### videoCodec

Type: `string`\
Default: `libx264`

Recommended not to change this value because the default value **libx264** is supported in all browsers.

##### audioCodec

Type: `string`\
Default: `aac`

Recommended not to change this value because the default value **aac** is supported in all browsers.

##### printLogs

Type: `boolean`\
Default: `true`

In case we want to see the process logs of ffmpeg.

# License

[MIT](LICENSE)

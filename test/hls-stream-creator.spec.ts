import * as assert from 'assert';
import * as fse from 'fs-extra';
import * as path from 'path';

import hlsStreamCreator, { Settings } from '../src';

const testFile = path.join(__dirname, 'assets', 'star_trails.mkv');
const testDir = path.join(__dirname, 'assets', 'output');

const settings: Settings = {
  renditions: [
    {
      resolution: {
        width: 1280,
        height: 720,
      },
      bitrate: 2000,
      audioRate: 192,
    },
    {
      resolution: {
        width: 640,
        height: 360,
      },
      bitrate: 400,
      audioRate: 128,
    },
  ],
  printLogs: false,
};

describe('test hls-stream-creator', async () => {
  before(async () => {
    await fse.remove(testDir);

    try {
      await hlsStreamCreator(
        testFile,
        testDir,
        settings,
      );
    } catch (err) {
      assert.fail(`failed got an error: ${err}`);
    }
  });

  after(async () => {
    await fse.remove(testDir);
  });

  it('should have m3u8 files', async () => {
    const playlistExists = await fse.pathExists(path.join(testDir, 'playlist.m3u8'));
    const rendition360pExists = await fse.pathExists(path.join(testDir, '360p.m3u8'));
    const rendition720pExists = await fse.pathExists(path.join(testDir, '720p.m3u8'));

    assert.equal(playlistExists, true, 'playlist.m3u8 must be exists');
    assert.equal(rendition360pExists, true, '360p.m3u8 must be exists');
    assert.equal(rendition720pExists, true, '720p.m3u8 must be exists');
  });

  it('should have at least one file mpeg-ts file', async () => {
    const mpegTs360p = await fse.pathExists(path.join(testDir, '360p_000.ts'));
    const mpegTs720p = await fse.pathExists(path.join(testDir, '720p_000.ts'));

    assert.equal(mpegTs360p, true, '360p_000.ts must be exists');
    assert.equal(mpegTs720p, true, '720p_000.ts must be exists');
  });
});

#!/bin/bash

# Stop on error
set -e

# Install dependencies
echo travis_fold:start:Dependencies
wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-relese-amd64-static.tar.xz
tar xf ffmpeg-release-amd64-static.tar.xz
mkdir -p $HOME/bin
cp ffmpeg-*-static/{ffmpeg,ffprobe} $HOME/bin
cp ffmpeg-*-static/{ffmpeg,ffprobe} $(pwd)
export PATH=$(pwd)/bin:$PATH
export ALT_FFMPEG_PATH=$(pwd)/ffmpeg
export ALT_FFPROBE_PATH=$(pwd)/ffprobe
echo travis_fold:end:Dependencies

# Print versions
echo travis_fold:start:Versions
echo "node version: $(node --version)"
echo "npm version: $(npm --version)"
echo "ffmpeg version: $(ffmpeg -version)"
echo travis_fold:end:Versions

# Install dependencies
echo travis_fold:start:npm-install
npm install
echo travis_fold:end:npm-install

# Run tests
echo travis_fold:start:npm-test
npm test
echo travis_fold:end:npm-test

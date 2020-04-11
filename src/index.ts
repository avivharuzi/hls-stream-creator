import hlsStreamCreator from './hls-stream-creator';

// Export shared types.
export * from './shared';

// Export main module.
export default hlsStreamCreator;
export {
  hlsStreamCreator,
};

// For CommonJS default export support.
module.exports = hlsStreamCreator;
module.exports.default = hlsStreamCreator;

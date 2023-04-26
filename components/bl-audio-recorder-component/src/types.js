export const TYPES = new Map([
  ['wav', { type: 'wav', blobType: 'audio/wav; codecs="1"' }],
  ['mpeg', { type: 'mpeg', blobType: 'audio/mpeg;' }],
  ['mp4', { type: 'mp4', blobType: 'audio/mp4; codecs="mp4a.40.2"' }],
  ['webm', { type: 'webm', blobType: 'audio/webm; codecs="vorbis"' }],
  ['ogg', { type: 'ogg', blobType: 'audio/ogg; codecs="opus"' }],
]);

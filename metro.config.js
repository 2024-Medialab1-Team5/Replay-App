
  const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

config.transformer = {
...transformer,

}

config.resolver = {
    ...resolver,
    assetExts: ['db', 'mp3', 'ttf', 'obj', 'png', 'jpg', 'gltf', 'glb', 'fbx'],
  };

module.exports = config;
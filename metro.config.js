module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  },
  resolver: {
    assetExts: ['png', 'jpg', 'jpeg', 'svg', 'gif', 'ttf', 'mp4']
  }
}

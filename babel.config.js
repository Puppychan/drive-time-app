module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      'expo-router/babel',
      [
        'module-resolver',
        {
          alias: {
            '@': './src' // Adjust this path to point to your src directory
          }
        }
      ],
      'react-native-paper/babel',
      ['react-native-reanimated/plugin']
    ]
  }
}

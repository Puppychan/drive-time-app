module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      'module:react-native-dotenv',
      // Required for expo-router
      'expo-router/babel',
      [
        'module-resolver',
        {
          alias: {
            '@': './' // Adjust this path to point to your src directory
          }
        }
      ],
      'react-native-paper/babel',
      ['react-native-reanimated/plugin']
    ]
  }
}
export const Colors = {
  primary: '#161A30',
  navy_black: '#161A30',
  navy_grey: '#31304D',
  grey_blue: '#B6BBC4',
  cream: '#F0ECE5',
  border: '#c7c7cc',
  disabled: '#d3d3d3',
  white: '#fff',
  black: '#000',
  silver: '#BFBFBF',
  hot_pink: '#f603a3',
  coral: '#fe7d6a',
  peach: '#fc7a83',
  yellow: '#f5c54c',
}

const Light = {
  ...Colors,
  background: Colors.cream,
  secondaryColor: Colors.navy_grey,
  opposite: Colors.navy_black
}
const Dark = {
  ...Colors,
  background: Colors.navy_black,
  secondaryColor: Colors.grey_blue,
  opposite: Colors.cream
}

export const DriveTimeColors = {
  light: Light,
  dark: Dark
}

export const useThemeColors = (colorScheme: any) => {
  // const colorScheme = useColorScheme()
  const isLightTheme = colorScheme === 'light'
  const colors = DriveTimeColors[isLightTheme ? 'light' : 'dark']
  return colors
}

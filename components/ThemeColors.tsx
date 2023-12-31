export const Colors = {
  primary: '#ff2d55',
  // background: '#f2f2f2',
  background: '#fff',
  text: '#000',
  border: '#c7c7cc',
  disabled: '#d3d3d3',
  white: '#fff',
  black: '#000',
  silver: "#BFBFBF"
}

const Dark = {
  ...Colors,
  background: '#000',
  text: '#fff',
}

export const DriveTimeColors = {
  light: Colors,
  dark: Dark
}

export const useThemeColors = (colorScheme: any) => {
  // const colorScheme = useColorScheme()
  const isLightTheme = colorScheme === "light"
  const colors = DriveTimeColors[isLightTheme ? "light" : "dark"]
  return colors
}



import { parse } from 'react-native-redash'

export const getPathXCenter = (currPath: string) => {
  const curves = parse(currPath).curves
  const startPoint = curves[0].to
  const endPoint = curves[curves.length - 1].to
  const centerX = (startPoint.x + endPoint.x) / 2
  return centerX
}

export const getPathXCenterByIndex = (tabPaths: any[], index: number) => {
  // const curves = parse(tabPaths[index]).curves
  // const startPoint = curves[0].to
  // const endPoint = curves[curves.length - 1].to
  // const centerX = (startPoint.x + endPoint.x) / 2
  // return centerX
  // Check if the path at the given index is a string
  const path = tabPaths[index]
  if (typeof path !== 'string') {
    // Handle the case where path is not a string.
    // You could return a default value, or throw an error, or log a warning depending on your use case.
    console.warn('Expected a string for path parsing, received:', path)
    return 0 // Returning 0 as a fallback value
  }

  const curves = parse(path).curves
  if (curves.length === 0) {
    // Handle the case where parsing did not return any curves.
    console.warn('No curves found in the path:', path)
    return 0 // Returning 0 as a fallback value
  }

  const startPoint = curves[0].to
  const endPoint = curves[curves.length - 1].to
  const centerX = (startPoint.x + endPoint.x) / 2
  return centerX
}

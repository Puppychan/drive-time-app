import {parse} from 'react-native-redash'

export const getPathXCenter = (currPath : string) => {
    const curves = parse(currPath).curves;
    const startPoint  = curves[0].to;
    const endPoint = curves[curves.length - 1].to;
    const centerX = (startPoint.x + endPoint.x) / 2;
    return centerX;
}

export const getPathXCenterByIndex = (tabPaths : any[], index : number) => {
    const curves = parse(tabPaths[index]).curves;
    const startPoint  = curves[0].to;
    const endPoint = curves[curves.length - 1].to;
    const centerX = (startPoint.x + endPoint.x) / 2;
    return centerX;
}
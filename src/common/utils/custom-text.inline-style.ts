type CustomEllipsisStyleType = {
  numberOfLines: number
  ellipsizeMode: 'tail' | 'head' | 'middle' | 'clip'
}
export const ellipseStyle: CustomEllipsisStyleType = {
  numberOfLines: 1,
  ellipsizeMode: 'tail'
}

export const ellipseStyle2Lines: CustomEllipsisStyleType = {
  numberOfLines: 2,
  ellipsizeMode: 'tail'
}
export const ellipseStyle4Lines: CustomEllipsisStyleType = {
  numberOfLines: 4,
  ellipsizeMode: 'tail'
}

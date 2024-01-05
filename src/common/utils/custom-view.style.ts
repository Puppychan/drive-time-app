type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'
type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'

type ViewPropsType = {
  flexDirection?: FlexDirection
  justifyContent?: JustifyContent
  alignItems?: AlignItems
}

export const verticalCenterView: ViewPropsType = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}
export const verticalLeftView: ViewPropsType = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start'
}

export const horizontalCenterView: ViewPropsType = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
}
export const horizontalLeftView: ViewPropsType = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center'
}

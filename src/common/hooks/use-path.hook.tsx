import { curveBasis, line } from 'd3-shape'
import { useMemo } from 'react'
import { parse } from 'react-native-redash'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { getScreenSize } from '../helpers/default-device-value.helper'

type GenerateTabShapePath = (position: number, adjustedHeight: number) => string

const NUM_TABS = 4
const SCALE = 0.7
const TAB_BAR_HEIGHT = 64

const { width: screenWidth } = getScreenSize()

const generateTabShapePath: GenerateTabShapePath = (position, adjustedHeight) => {
  const adjustedWidth = screenWidth / NUM_TABS
  const tabX = adjustedWidth * position

  const lineGenerator = line().curve(curveBasis)
  const tab = lineGenerator([
    [tabX - 100 * SCALE, 0],
    [tabX - (65 + 35) * SCALE, 0],
    [tabX - (50 - 10) * SCALE, -6 * SCALE],
    [tabX - (50 - 15), (adjustedHeight - 14) * SCALE],
    [tabX + (50 - 15), (adjustedHeight - 14) * SCALE],
    [tabX + (50 - 10) * SCALE, -6 * SCALE],
    [tabX + (65 + 35) * SCALE, 0],
    [tabX + 100 * SCALE, 0]
  ])
  return `${tab}`
}

export const usePath = () => {
  const insets = useSafeAreaInsets()
  const tHeight = TAB_BAR_HEIGHT + insets.bottom
  const adjustedHeight = tHeight - insets.bottom

  const containerPath = useMemo(() => {
    return `M0,0L${screenWidth},0L${screenWidth}, 0L${screenWidth},${tHeight}L0,${tHeight}L0,0Z`
  }, [tHeight])

  const curvePaths = useMemo(() => {
    return Array.from({ length: NUM_TABS }, (_, i) => {
      const tabShapePath = generateTabShapePath(i + 0.5, adjustedHeight)
      return parse(`${tabShapePath}`)
    })
  }, [adjustedHeight])

  return { containerPath, curvePaths, tHeight }
}

import React from 'react'
import styled from 'styled-components'

import media from '@styles/media'
import {
  clamp,
  getWindowDimensions,
  getBreakpointFromTheme,
  useScrollPosition,
} from '@utils'

export function calculateStyles(position: number): {} {
  const { width, height } = getWindowDimensions()
  const breakpoint = getBreakpointFromTheme('tablet')

  const styles = {
    opacity: position > height ? 0 : 1,
    transform: `translateY(-${position * 0.11}px)`,
  }

  return width > breakpoint || position <= 0 ? {} : styles
}

function LayoutHeroMobile({
  children,
  background,
}: {
  children: any
  background?: string
}) {
  const position = clamp(useScrollPosition(), 0, 1000)

  return (
    <>
      <Spacer />
      <Frame background={background} style={calculateStyles(position)}>
        {children}
      </Frame>
    </>
  )
}

export default LayoutHeroMobile

const Spacer = styled.div`
  ${media.tablet`
    height: 100vh;
  `}
`

const Frame = styled.div<{ background?: string }>`
  background: ${p => p.background || `#08070b`};

  ${media.tablet`
    height: 100vh;
    width: 100%;
    min-height: 550px;
    top: 90px;
    position: fixed;
    z-index: 0;
    pointer-events: none;
    background: transparent;

    @media screen and (max-height: 600px) {
      padding-top: 60px;
    }
  `}
`

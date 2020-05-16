import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'

import Image from '@components/Image'
import Sticky, { StickyState } from '@components/Sticky'

import media from '@styles/media'
import { clamp, useResize } from '@utils'

import AboutHeading from './About.Heading'

export const galleryQuery = graphql`
  {
    lightOne: file(name: { regex: "/light-1-frontend-backend/" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    lightTwo: file(name: { regex: "/light-2-trust/" }) {
      childImageSharp {
        fluid(maxWidth: 500, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    lightThree: file(name: { regex: "/light-3-focus/" }) {
      childImageSharp {
        fluid(maxWidth: 500, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    lightFour: file(name: { regex: "/light-4-meeting/" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    darkOne: file(name: { regex: "/dark-1-support/" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    darkTwo: file(name: { regex: "/dark-2-collaboration/" }) {
      childImageSharp {
        fluid(maxWidth: 500, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    darkThree: file(name: { regex: "/dark-3-teamwork/" }) {
      childImageSharp {
        fluid(maxWidth: 500, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    darkFour: file(name: { regex: "/dark-4-adaptability/" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

function AboutPhotographs() {
  const SECTION_WIDTH_START = 1140
  const SECTION_WIDTH_END = 1260

  const {
    lightOne,
    lightTwo,
    lightThree,
    lightFour,

    darkOne,
    darkTwo,
    darkThree,
    darkFour,
  } = useStaticQuery(galleryQuery)

  const containerRef = useRef()
  const imageGridRef = useRef()
  const rowOneRef = useRef()
  const rowTwoRef = useRef()
  const rowThreeRef = useRef()
  const rowFourRef = useRef()

  const [ref, inView] = useInView({ threshold: 0.5 })
  const [sectionHeight, setSectionHeight] = useState(2000)
  const [scale, setScale] = useState(1)
  const { width, height } = useResize()

  const config = { mass: 4, tension: 500, friction: 150 }
  const [propsRowTwo, setRowTwo] = useSpring(() => ({ offset: 1, config }))
  const [propsRowThree, setRowThree] = useSpring(() => ({ offset: 1, config }))
  const [propsRowFour, setRowFour] = useSpring(() => ({ offset: 1, config }))

  // We want to disable the offset on mobile
  const calcTransform = (offset: number) =>
    width > 768 && `translateY(${offset * 20}vh)`

  const rowTwoStyles = {
    transform: propsRowTwo.offset.interpolate(calcTransform),
  }
  const rowThreeStyles = {
    transform: propsRowThree.offset.interpolate(calcTransform),
  }
  const rowFourStyles = {
    transform: propsRowFour.offset.interpolate(calcTransform),
  }

  useEffect(() => {
    if (width >= 768) {
      const handleScroll = () => {
        if (imageGridRef.current) {
          const getOffset = (el: HTMLElement) =>
            clamp(
              (el.getBoundingClientRect().top +
                (el.getBoundingClientRect().height / 4) * 2) /
                height,
              0,
              1
            )

          setRowTwo({ offset: getOffset(rowOneRef.current) })
          setRowThree({ offset: getOffset(rowTwoRef.current) })
          setRowFour({ offset: getOffset(rowThreeRef.current) })
        }
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [imageGridRef, width])

  useEffect(() => {
    const {
      height: containerHeight,
      width: containerWidth,
    } = containerRef.current.getBoundingClientRect()
    setSectionHeight(containerHeight)

    if (containerWidth > SECTION_WIDTH_START) {
      setScale(
        SECTION_WIDTH_START / clamp(containerWidth, 320, SECTION_WIDTH_END)
      )
    }
  }, [width])

  return (
    <>
      <LightOverlay inView={inView} />
      <AboutWorkContainer>
        <Sticky
          height={`${sectionHeight}px`}
          render={({ progress }: StickyState) => {
            const headingClass = inView ? 'Heading__InView' : ''
            const textClass = inView ? 'Text__InView' : ''
            const firstRowScale = clamp(
              scale + progress * 5 * (1 - scale),
              0,
              1
            )

            return (
              <ImageSection ref={containerRef}>
                <LightSection>
                  <AboutHeading
                    heading={`<span class="${headingClass}">Going the distance</span>`}
                    text={`<span class="${textClass}">Narative is a remote team, meaning we’re used to working together from often very far apart. We stay close through constant, transparent communication, both within our team and with each of our clients. And when it matters most, we make sure to all get together.</span>`}
                  />
                  <Spacer />
                  {/* <ImageGrid style={{ transform: `scale(${firstRowScale})` }}>
                    <div ref={ref}>
                      <Images ref={rowOneRef}>
                        <ImageWrapper>
                          <StyledImage
                            loading="eager"
                            src={lightOne.childImageSharp.fluid}
                          />
                        </ImageWrapper>
                        <ImageWrapper hideOnMobile>
                          <StyledImage
                            loading="eager"
                            src={lightTwo.childImageSharp.fluid}
                          />
                        </ImageWrapper>
                      </Images>
                      <ImagesMobile style={rowTwoStyles}>
                        <ImageWrapper>
                          <StyledImage
                            loading="eager"
                            src={lightTwo.childImageSharp.fluid}
                          />
                        </ImageWrapper>
                        <ImageWrapper>
                          <StyledImage
                            loading="eager"
                            src={lightThree.childImageSharp.fluid}
                          />
                        </ImageWrapper>
                      </ImagesMobile>

                      <animated.div style={rowTwoStyles}>
                        <ImagesReverse ref={rowTwoRef}>
                          <ImageWrapper hideOnMobile>
                            <StyledImage
                              loading="eager"
                              src={lightThree.childImageSharp.fluid}
                            />
                          </ImageWrapper>
                          <ImageWrapper>
                            <StyledImage
                              loading="eager"
                              src={lightFour.childImageSharp.fluid}
                            />
                          </ImageWrapper>
                        </ImagesReverse>
                      </animated.div>
                    </div>
                  </ImageGrid> */}
                </LightSection>
                {/* <ImageGrid ref={imageGridRef}>
                  <animated.div style={rowThreeStyles}>
                    <Images ref={rowThreeRef}>
                      <ImageWrapper>
                        <StyledImage
                          loading="eager"
                          src={darkOne.childImageSharp.fluid}
                        />
                      </ImageWrapper>
                      <ImageWrapper hideOnMobile>
                        <StyledImage
                          loading="eager"
                          src={darkTwo.childImageSharp.fluid}
                        />
                      </ImageWrapper>
                    </Images>
                  </animated.div>
                  <ImagesMobile>
                    <ImageWrapper>
                      <StyledImage
                        loading="eager"
                        src={darkTwo.childImageSharp.fluid}
                      />
                    </ImageWrapper>
                    <ImageWrapper>
                      <StyledImage
                        loading="eager"
                        src={darkThree.childImageSharp.fluid}
                      />
                    </ImageWrapper>
                  </ImagesMobile>
                  <animated.div style={rowFourStyles}>
                    <ImagesReverse ref={rowFourRef}>
                      <ImageWrapper hideOnMobile>
                        <StyledImage
                          loading="eager"
                          src={darkThree.childImageSharp.fluid}
                        />
                      </ImageWrapper>
                      <ImageWrapper>
                        <StyledImage
                          loading="eager"
                          src={darkFour.childImageSharp.fluid}
                        />
                      </ImageWrapper>
                    </ImagesReverse>
                  </animated.div>
                </ImageGrid> */}
              </ImageSection>
            )
          }}
        />
      </AboutWorkContainer>
    </>
  )
}

export default AboutPhotographs

const LightSection = styled.div`
  position: relative;
`

const ImageSection = styled.div`
  width: 100%;
  padding: 140px 15px 0px;
  max-width: 1260px;
  margin: 0px auto;
  overflow: hidden;

  ${media.phablet`
    padding: 0px;
  `}
`

const StyledImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`
const AboutWorkContainer = styled.div`
  position: relative;
  z-index: 2;
  padding: 0 0 calc(180px - 10vh);

  ${media.tablet`
    padding: 100px 0 0;
  `}

  .Heading__InView {
    color: #111216;
  }

  .Text__InView {
    color: ${p => p.theme.colors.grey};
  }
`

const LightOverlay = styled.div<{ inView: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: ${p => p.theme.colors.sirius};
  opacity: ${p => (p.inView ? 1 : 0)};
  transition: opacity 1s;
  pointer-events: none;
`

const Spacer = styled.div`
  height: 10vh;
  max-height: 50px;
`

const ImageGrid = styled.div`
  position: relative;
  margin: 15px 0;
  will-change: transform;
  z-index: 2;

  ${media.phablet`
    padding: 0 10px;
  `}
`

const Images = styled.div`
  display: grid;
  grid-template-columns: 70fr 30fr;
  grid-template-rows: 1fr;
  grid-gap: 15px;
  margin-bottom: 15px;

  ${media.tablet`
    grid-template-columns: 1fr;
    grid-gap: 10px;
    margin-bottom: 10px;
  `}
`

const ImagesReverse = styled.div`
  display: grid;
  grid-template-columns: 30fr 70fr;
  grid-template-rows: 1fr;
  grid-gap: 15px;

  ${media.tablet`
    grid-template-columns: 1fr;
    grid-gap: 10px;
    margin-bottom: 10px;
  `}
`

const ImagesMobile = styled.div`
  display: none;

  ${media.tablet`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    margin-bottom: 10px;
  `}
`

const ImageWrapper = styled.div<{ hideOnMobile?: boolean }>`
  height: 73.4vh;
  min-height: 500px;
  max-height: 540px;

  ${media.desktop`
    height: 62vh;
  `}

  ${media.tablet`
    ${p => p.hideOnMobile && `display: none;`}
  `}

  ${media.phablet`
    height: 33vh;
    min-height: 260px;
  `}
`

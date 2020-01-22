import React, { useContext, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import SVG from 'react-inlinesvg'
import { Motion, spring } from 'react-motion'

import ButtonPill from '@components/Button/Button.Pill'
import Heading from '@components/Heading'
import Image from '@components/Image'
import Section from '@components/Section'
import Sticky, { StickyState } from '@components/Sticky'
import { ContactContext } from '@components/Contact/Contact.Context'

import media from '@styles/media'
import { useResize, useReduced } from '@utils'

import AboutHeading from './About.Heading'
import AboutValuesReduced from './About.Values.Reduced'

const shapeImagesQuery = graphql`
  {
    shapeWithoutShadow: file(name: { regex: "/about-shape-without-shadow/" }) {
      publicURL
    }
    shapeWithShadow: file(name: { regex: "/about-shape-with-shadow/" }) {
      publicURL
    }
    kind: file(name: { regex: "/value-kind/" }) {
      childImageSharp {
        fluid(maxWidth: 224, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    creative: file(name: { regex: "/value-creative/" }) {
      childImageSharp {
        fluid(maxWidth: 224, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    adaptable: file(name: { regex: "/value-adaptable/" }) {
      childImageSharp {
        fluid(maxWidth: 224, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    yourself: file(name: { regex: "/value-yourself/" }) {
      childImageSharp {
        fluid(maxWidth: 224, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

function AboueValues() {
  const {
    shapeWithoutShadow,
    shapeWithShadow,
    kind,
    creative,
    adaptable,
    yourself,
  } = useStaticQuery(shapeImagesQuery)
  const { toggleContact } = useContext(ContactContext)
  const { width, height } = useResize()
  const shapeRef = useRef()
  const mobileShapeRef = useRef()
  const headingRef = useRef()

  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (shapeRef.current) {
      const shapeRect = shapeRef.current.getBoundingClientRect()

      let scaleMultipler = 1.4
      if (height >= 900) {
        scaleMultipler = 1.8
      } else if (height > 1000) {
        scaleMultipler = 4
      }

      let constantMultiple = 1.8
      if (height >= 900) {
        constantMultiple = 2.5
      }

      const scale =
        (shapeRect.height + height * 1.4 * scaleMultipler) / height +
        constantMultiple
      setScale(scale)
    }
  }, [width, height, shapeRef])

  useEffect(() => {
    if (mobileShapeRef.current) {
      const shapeRect = mobileShapeRef.current.getBoundingClientRect()

      mobileShapeRef.current.style.top = `-${shapeRect.height / 1.15}px`
      headingRef.current.style.paddingBottom = `${shapeRect.height / 1.45}px`
    }
  }, [width, height, mobileShapeRef])

  if (useReduced()) {
    return <AboutValuesReduced />
  }

  const values = [
    {
      heading: 'Be kind',
      text:
        'Communicate honestly but sensitively; act with positive intent; and trust others to do the same.',
      illullstration: kind.childImageSharp.fluid,
    },
    {
      heading: 'Be creative',
      text:
        'Push beyond best practices and by-the-numbers design to discover valuable new ideas.',
      illullstration: creative.childImageSharp.fluid,
    },
    {
      heading: 'Be adaptable',
      text:
        'Strive to grow from every challenge and change, even when it means changing your mind.',
      illullstration: adaptable.childImageSharp.fluid,
    },
    {
      heading: 'Be yourself',
      text:
        'Work and live the way that uniquely suits you, free of rigid hierarchies and arbitrary expectations.',
      illullstration: yourself.childImageSharp.fluid,
    },
  ]

  return (
    <AboueValuesContainer>
      <HeadingContainer ref={headingRef}>
        <AboutHeading
          heading={`
              <span class="AboutValues__MobileBreak">Who we</span> choose to be
          `}
          text="A company’s culture isn’t something we think should be passed down as commandments, or enforced like law. It’s the choices we make every day that define who we are — as individuals, and as a team. These are our choices."
        />
      </HeadingContainer>
      <Desktop>
        <Sticky
          cover
          height="2600px"
          render={({ progress }: StickyState) => {
            const fastProgress = progress * 20

            const valuesAnimation = {
              opacity: progress,
              pointerEvents: progress > 0.5 ? 'initial' : 'none',
              willChange: 'transform',
            }

            const shapeAnimation =
              progress > 0
                ? {
                    transform: `translateY(-50%) scale(${1 +
                      progress * scale})`,
                    pointerEvents: progress <= 0.5 ? 'initial' : 'none',
                  }
                : {}

            return (
              <>
                <Section narrow>
                  <Values style={valuesAnimation}>
                    <ValuesGrid>
                      {values.map(value => (
                        <div key={value.heading}>
                          <ValueIllo>
                            <Image src={value.illullstration} />
                          </ValueIllo>
                          <ValueHeading>{value.heading}</ValueHeading>
                          <ValueText>{value.text}</ValueText>
                        </div>
                      ))}
                    </ValuesGrid>
                    <ButtonContainer>
                      <ButtonPill
                        text="Work with our team"
                        onClick={toggleContact}
                      />
                    </ButtonContainer>
                  </Values>
                </Section>
                <ShapeContainer style={shapeAnimation}>
                  <ShapeRectangleGlow style={{ opacity: 1 - fastProgress }}>
                    <SVG src={shapeWithShadow.publicURL} />
                  </ShapeRectangleGlow>
                  <ShapeRectangle ref={shapeRef}>
                    <SVG src={shapeWithoutShadow.publicURL} />
                  </ShapeRectangle>
                  <ShapeRectangleWithMask>
                    <SVG src={shapeWithoutShadow.publicURL} />
                  </ShapeRectangleWithMask>
                  <ShapeRectangleReflection
                    style={{ opacity: 1 - fastProgress }}
                  >
                    <ShapeReflection />
                  </ShapeRectangleReflection>
                </ShapeContainer>
              </>
            )
          }}
        />
      </Desktop>

      {/*
        The mobile section doesn't have any of the animation and styles so
        it's easier for us to return a specific mobile version for the About Values
      */}
      <Mobile>
        <Section narrow>
          <ShapeMobile />
          <ValuesColumn>
            {values.map(value => (
              <ValuesRow key={value.heading}>
                <ValueIllo>
                  <Image src={value.illullstration} />
                </ValueIllo>
                <ValueHeading>{value.heading}</ValueHeading>
                <ValueText>{value.text}</ValueText>
              </ValuesRow>
            ))}
          </ValuesColumn>
          <ButtonContainer>
            <ButtonPill text="Work with our team" onClick={toggleContact} />
          </ButtonContainer>
        </Section>
      </Mobile>
    </AboueValuesContainer>
  )
}

export default AboueValues

const ShapeReflection = () => (
  <ReflectionBackground>
    <ReflectionInnerMask />
  </ReflectionBackground>
)

const Desktop = styled.div`
  ${media.desktop`
    display: none;
  `}
`

const Mobile = styled.div`
  display: none;

  ${media.desktop`
    position: relative;
    display: block;
  `}
`

const AboueValuesContainer = styled.div`
  padding: 0px 0 10px;

  ${media.desktop`
    padding: 120px 0;
  `}

  ${media.phablet`
    padding: 90px 0 0;
  `}
`

const HeadingContainer = styled.div`
  position: relative;
  transform: translateY(24vh);
  z-index: 1;

  ${media.desktop`
    transform: none;
  `}

  ${media.tablet`
    .AboutValues__MobileBreak {
      display: block; 
    }
  `}
`

const ShapeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  bottom: 0;
  top: 50%;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  max-width: 750px;
  position: absolute;
  transform: translateY(-50%);
  will-change: transform;
`

const ShapeRectangle = React.memo(styled.figure`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 3;
  transform: translateY(-50%);
`)

const ShapeRectangleGlow = React.memo(styled.figure`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 3;
  transform: translateY(-50%) scale(1.186);
`)

const ShapeRectangleWithMask = React.memo(styled.figure`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 50vh;
    background: #111216;
    top: -50vh;
    left: 0;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 50vh;
    background: #111216;
    bottom: -50vh;
    left: 0;
  }
`)

const ShapeRectangleReflection = styled.figure`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
`

const Values = React.memo(styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #111216;
`)

const ValuesGrid = React.memo(styled.div`
  top: 0;
  max-width: 750px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 320px 320px;
  grid-template-rows: 1fr 1fr;
  grid-column-gap: 1fr;
  justify-content: space-between;
  grid-row-gap: 45px;

  @media (max-height: 700px) {
    grid-row-gap: 25px;
  }
`)

const ValuesColumn = styled.div`
  position: relative;
  top: 0;
  max-width: 750px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-wrap: wrap;

  ${media.tablet`
    display: block;
  `}
`

const ValuesRow = styled.div`
  margin: 0 auto 30px;
  max-width: 320px;

  ${media.phablet`
    max-width: 295px;
  `}
`

const ValueIllo = styled.div`
  width: 112px;
  margin: 0 auto 5px;

  @media (max-height: 700px) {
    margin: 0 auto;
  }
`

const ValueHeading = styled(Heading.h3)`
  margin-bottom: 15px;
  text-align: center;

  @media (max-height: 700px) {
    margin-bottom: 5px;
  }
`

const ValueText = styled.p`
  font-size: 22px;
  color: ${p => p.theme.colors.grey};
  text-align: center;
  line-height: 1.35;

  ${media.tablet`
    font-size: 18px;
    text-align: center;
  `}
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 100px auto 0;

  button {
    max-width: 750px;
  }

  @media (max-height: 700px) {
    margin: 40px auto 0;
  }

  ${media.phablet`
    margin: 50px auto 0;
  `}
`

const ReflectionBackground = styled.div`
  position: relative;
  background: linear-gradient(#313338, transparent 50%);
  filter: blur(5px);
  width: 100%;
  min-height: 212px;
  transform: translateY(120%);
  z-index: 4;
`

const ReflectionInnerMask = styled.div`
  background: ${p => p.theme.colors.bg};
  position: absolute;
  left: 12px;
  top: 12px;
  right: 12px;
  bottom: 0;
`

const ReflectionBackgroundMobile = styled.div`
  position: absolute;
  background: linear-gradient(#313338, transparent 25%);
  filter: blur(4px);
  width: 89%;
  margin: 0 auto;
  min-height: 212px;
  top: 71%;
  left: 0;
  right: 0;
`

const ReflectionInnerMaskMobile = styled.div`
  background: ${p => p.theme.colors.bg};
  position: absolute;
  bottom: 0;
  left: 12px;
  top: 12px;
  right: 12px;

  ${media.phablet`
  left: 6px;
  top: 6px;
  right: 6px;
  
  `}
`

const ShapeMobile = styled.div`
  margin: 80px auto;
  height: 12px;
  width: 100%;
  background: #fff;
  box-shadow: 0px 0px 31.302px rgba(102, 116, 141, 0.6),
    0px 0px 4.47172px rgba(255, 255, 255, 0.2);
`

import React, { useContext } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'

import ButtonPill from '@components/Button/Button.Pill'
import Heading from '@components/Heading'
import Image from '@components/Image'
import Section from '@components/Section'
import { ContactContext } from '@components/Contact/Contact.Context'

import media from '@styles/media'

import AboutHeading from './About.Heading'

const shapeImagesQuery = graphql`
  {
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
  const { kind, creative, adaptable, yourself } = useStaticQuery(
    shapeImagesQuery
  )
  const { toggleContact } = useContext(ContactContext)

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
      <HeadingContainer>
        <AboutHeading
          heading="Who we choose to be"
          text="A company’s culture isn’t something we think should be passed down as commandments, or enforced like law. It’s the choices we make every day that define who we are — as individuals, and as a team. These are our choices."
        />
      </HeadingContainer>
      <ShapeContainer>
        <Shape />
        <ReflectionBackground>
          <ReflectionInnerMask />
        </ReflectionBackground>
      </ShapeContainer>
      <Section narrow>
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
          <ButtonPill text="Work with our team" onClick={toggleContact} />
        </ButtonContainer>
      </Section>
    </AboueValuesContainer>
  )
}

export default AboueValues

const ShapeContainer = styled.div`
  position: absolute;
  width: 950px;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 250px;
`

const AboueValuesContainer = styled.div`
  padding: 200px 0 140px;
  position: relative;

  ${media.desktop`
    padding: 120px 0;
  `}

  ${media.phablet`
    padding: 90px 0 0;
  `}

  ${media.desktop`
    display: none;
  `}
`

const HeadingContainer = styled.div`
  position: relative;
  z-index: 1;

  ${media.desktop`
    transform: none;
  `}

  ${media.tablet`
    .AboutValues__Break {
      display: block; 
    }
  `}
`

const ValuesGrid = styled.div`
  position: relative;
  z-index: 1;
  top: 0;
  padding-top: 550px;
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
  width: 90%;
  min-height: 212px;
  transform: translateY(120%);
  z-index: 1;
  top: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
`

const ReflectionInnerMask = styled.div`
  background: ${p => p.theme.colors.bg};
  position: absolute;
  left: 12px;
  top: 12px;
  right: 12px;
  bottom: 0;
`

const Shape = () => (
  <svg
    width="100%"
    viewBox="0 0 375 307"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: `drop-shadow( 0px 2px 50px rgba(255,255,255,0.5)` }}
  >
    <g filter="url(#filter1_dd)">
      <rect
        x="23"
        y="106"
        width="329"
        height="95"
        stroke="white"
        strokeWidth="6"
      />
    </g>
    <defs>
      <filter
        id="filter0_f"
        x="-89.4344"
        y="0.565636"
        width="553.869"
        height="305.869"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="44.7172"
          result="effect1_foregroundBlur"
        />
      </filter>
      <filter
        id="filter1_dd"
        x="-11.302"
        y="71.698"
        width="397.604"
        height="163.604"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="15.651" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.399641 0 0 0 0 0.453299 0 0 0 0 0.554653 0 0 0 0.6 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2.23586" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"
        />

        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

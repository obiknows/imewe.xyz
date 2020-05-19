import React, { useState } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled, { css, keyframes } from 'styled-components'

import Heading from '@components/Heading'
import Section from '@components/Section'
import Image from '@components/Image'
import ScrollIndicator from '@components/ScrollIndicator'
import LayoutHeroMobile from '@components/Layout/Layout.Hero.Mobile'
import Pill from '@components/Pill'
import Transitions from '@components/Transitions'

import media from '@styles/media'

const heroQuery = graphql`
  query AboutHeroPageQuery {
    heroTop: file(name: { regex: "/about-hero-cable/" }) {
      childImageSharp {
        fluid(maxWidth: 322, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    heroBottom: file(name: { regex: "/about-hero-bulb/" }) {
      childImageSharp {
        fluid(maxWidth: 767, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

function AboutHero() {
  // Start the bulb up animation once the image has laoded
  const [animateBulb, setBulbAnimation] = useState(false)

  return (
    <StaticQuery
      query={heroQuery}
      render={({ heroTop, heroBottom }) => (
        <>
          <LayoutHeroMobile>
            <>
              <Section>
                <GridContainer>
                  <LeftContainer>
                    <Transitions.CSS.FadeIn>
                      <TextContainer>
                        <Pill text="About" />
                        <Heading.h2 styles="h1" style={{fontSize: '2.88rem'}}>
                          Digital Real Estate is a fresh new company with a
                          brand new perspective on digital media, the internet, and
                          its function in the times we live in today.
                        </Heading.h2>
                        <MainText>
                          {/* We partner with companies to bring products to life,
                          and businesses to scale. */}

                          We offer the senior experience of a tight knit development team. We thrive when working with clients to bring their digital presence
to life in a new and exciting way.
                        </MainText>
                      </TextContainer>
                    </Transitions.CSS.FadeIn>
                    <div />
                  </LeftContainer>
                  <ImageContainer desktop>
                    {/* <HeroImageTop>
                      <Image src={heroTop.childImageSharp.fluid} />
                    </HeroImageTop> */}
                    <HeroImageBottom start={animateBulb}>
                      <Image
                        onLoad={() => setBulbAnimation(true)}
                        src={heroBottom.childImageSharp.fluid}
                      />
                    </HeroImageBottom>
                  </ImageContainer>
                </GridContainer>
              </Section>
              <Section>
                <ScrollIndicator />
              </Section>
            </>
          </LayoutHeroMobile>

          {/*
            The below is only for Mobile users. This is because
            we hide the Bulb illustration from the hero and want
            it to scroll up over the fixed hero on mobile.
          */}
          <MobileSection hideOnDesktop relative>
            <ImageContainer>
              {/* <HeroImageTop>
                <Image src={heroTop.childImageSharp.fluid} />
              </HeroImageTop> */}
              <HeroImageBottom>
                <Image
                  src={heroBottom.childImageSharp.fluid}
                  onLoad={() => setBulbAnimation(true)}
                />
              </HeroImageBottom>
            </ImageContainer>
          </MobileSection>

          <Spacer />
        </>
      )}
    />
  )
}

export default AboutHero

const GridContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 505px 1fr;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: calc(100vh - 230px);
  min-height: 600px;

  ${media.desktop_medium`
    min-height: 360px;
  `};

  @media screen and (max-height: 800px) {
    min-height: 360px;
  }

  ${media.desktop`
    height: initial
    grid-template-columns: 1fr;
    height: calc(100vh - 140px);
    min-height: 100%;
    padding: 0;
  `};

  ${media.phablet`
    height: calc(100vh - 180px);
    width: 100%;
  `};
`

const TextContainer = styled.div`
  position: relative;

  h1 {
    max-width: 470px;
  }

  ${media.desktop`
    transition-delay: 0ms !important;
    transition-duration: 500ms !important;
  `};

  ${media.phablet`
    top: -50px;
  `}
`

const MainText = styled.p`
  font-size: 2.88rem;
  font-weight: 400;
  color: ${p => p.theme.colors.grey};
  line-height: 1.3;

  ${media.phablet`
    font-size: 2.2rem;
  `};
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 62.1rem;

  ${media.desktop`
    justify-content: flex-start;
    width: 100%;
    height: initial;
  `};
`

const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  width: 460px;
  right: -20px;
  justify-self: flex-end;

  ${media.desktop_medium`
    right: 2%;
  `};

  ${media.desktop`
    display:  ${p => (p.desktop ? ' none' : 'block')};
    background: #08070b;
    right: 0;
    left: 0;
    position: relative;
    margin: 0 auto;
    padding-bottom: 60px;
    width: 100%;
  `};
`

const HeroImageTop = styled.div`
  max-width: 161.09px;
  margin: 0 auto;
  position: relative;
  left: -6px;

  ${media.tablet`
    max-width: 130px;
  `}
`

const float = keyframes`
  0%, 100% {
    transform: translatey(0px);
  }

  50% {
    transform: translatey(-8px);
  }
`

const HeroImageBottom = styled.div<{ start: boolean }>`
  max-width: 381.46px;
  margin: 0 auto;
  margin-top: 50px;
  transform: translateY(${p => (p.start ? '0' : '60px')});
  transition: transform 1.4s var(--ease-in-out-cubic);

  ${p =>
    p.start &&
    css`
      animation: ${float} 4.8s ease-in-out infinite 1.4s;
    `}

  ${media.tablet`
    transform: none;
  `}
`

const Spacer = styled.div`
  background: ${p => p.theme.colors.hero};
  height: 145px;

  ${media.desktop`
    height: 0;
  `};
`

const MobileSection = styled(Section)`
  background: #08070b;
  box-shadow: 0px -40px 40px rgba(8, 7, 11, 0.8);
`

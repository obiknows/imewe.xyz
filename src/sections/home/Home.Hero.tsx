import React, { useContext } from 'react'
import styled from 'styled-components'

import ButtonArrow from '@components/Button/Button.Arrow'
import Heading from '@components/Heading'
import Section from '@components/Section'
import ScrollIndicator from '@components/ScrollIndicator'
import ShapeShifter from '@components/ShapeShifter'
import IntersectionObserver from '@components/IntersectionObserver'
import Transitions from '@components/Transitions'
import LayoutHeroMobile from '@components/Layout/Layout.Hero.Mobile'
import { ContactContext } from '@components/Contact/Contact.Context'

import media from '@styles/media'

function HomeHero() {
  const { toggleContact } = useContext(ContactContext)

  return (
    <LayoutHeroMobile>
      <HomeHeroContainer id="home-hero">
        <Section>
          <IntersectionObserver
            render={({ intersectionRatio: ir }) => (
              <ContentContainer
                style={ir ? { opacity: ir * ir } : { opacity: 1 }}
              >
                <TextContainer>
                  <Transitions.CSS.FadeIn>
                    <Heading.h1 style={{fontSize:'2.88rem'}}>
                      Welcome to Digital Real Estate. Our name says exactly what we represent at our core.
                    </Heading.h1>
                    <MainText>
                      We’re a team with senior startup experience here to help
                      you build your business in the digital realm.
                    </MainText>
                    <ButtonArrow onClick={toggleContact} text="Get in touch" />
                  </Transitions.CSS.FadeIn>
                </TextContainer>
                <ShapeShifter />
              </ContentContainer>
            )}
          />
          <ScrollIndicator />
        </Section>
      </HomeHeroContainer>
    </LayoutHeroMobile>
  )
}

export default HomeHero

const HomeHeroContainer = styled.div`
  ${media.desktop`
    #mirror-mask {
      display: none;

    margin-top: 50px;
  `}
`

const TextContainer = styled.div`
  position: relative;
  z-index: 10;
  max-width: 570px;
  top: 10px;

  ${media.phablet`
    position: relative;
  `}
`

const MainText = styled.p`
  font-size: 2.88rem;
  font-weight: 400;
  color: ${p => p.theme.colors.grey};
  line-height: 1.3;
  margin-bottom: 50px;

  ${media.phablet`
    font-size: 2.2rem;
  `};
`

const ContentContainer = styled.div`
  height: calc(100vh - 230px);
  min-height: 600px;
  padding-top: 10px;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.phablet`
    height: calc(100vh - 180px);
    min-height: 100%;
    padding: 0;
    top: -40px;
  `};

  ${media.desktop_medium`
    min-height: 360px;
  `};

  @media screen and (max-height: 800px) {
    min-height: 360px;
  }

  @media screen and (max-height: 648px) {
    top: -60px;
  }
`

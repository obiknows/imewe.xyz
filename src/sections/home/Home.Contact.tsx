import React, { useEffect, useContext, useRef } from 'react'
import styled from 'styled-components'
import { Link, graphql } from 'gatsby'

import Logo from '@components/Logo'
import IntersectionObserver from '@components/IntersectionObserver'
import Footer from '@components/Navigation/Navigation.Footer'
import Section from '@components/Section'
import MediaQuery from '@components/MediaQuery'
import { ContactContext } from '@components/Contact/Contact.Context'

import media from '@styles/media'
import shortcuts, { constants } from '@shortcuts'

const ctaLinks = [
  { to: '/about', text: 'About' },
  { to: '/labs', text: 'Labs' },
  // { to: '/articles', text: 'Articles' },
  { to: '/contact', text: 'Contact' },
]

/**
 * <HomeCallToAction />
 * - appearing navigation
 * - background text with an image clip
 * - contact form
 */

function HomeCallToAction() {
  const { showContact, toggleContact } = useContext(ContactContext)
  const buttonRef = useRef()

  useEffect(() => {
    function handleKeyUp(event: KeyboardEvent) {
      if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault()
        toggleContact(event)
      }
    }

    buttonRef.current.addEventListener('keyup', handleKeyUp)

    return () => buttonRef.current.removeEventListener('keyup', handleKeyUp)
  }, [])

  function handleShortcutReset() {
    shortcuts.handleShortcutFeature({ name: constants.ESCAPE })
  }

  return (
    <Background>
      <IntersectionObserver
        render={({ visiblePercentage }) => (
          <Frame narrow>
            <Nav inView={visiblePercentage > 80}>
              <LogoContainer>
                <Logo fill="rgba(255,255,255,0.3)" aria-hidden="true" />
              </LogoContainer>
              <MobileLogoContainer>
                <MobileLogo aria-hidden="true" />
              </MobileLogoContainer>
              <NavLinks>
                {ctaLinks.map(link => {
                  if (link.to === '/contact') {
                    return (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        tabIndex={-1}
                        onClick={event => {
                          event.preventDefault()
                          toggleContact(event)
                        }}
                      >
                        {link.text}
                      </NavLink>
                    )
                  }

                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      tabIndex={-1}
                      onClick={handleShortcutReset}
                    >
                      {link.text}
                    </NavLink>
                  )
                })}
              </NavLinks>
            </Nav>
            <TextContainer>
              <TextBackground>
                <Text>
                  Together, let’s discover what your company is truly capable
                  of.
                </Text>
              </TextBackground>
              <MobileAction to="/contact">Get in touch</MobileAction>
            </TextContainer>
            <CallToAction onClick={toggleContact}>
              <CTAText
                animation={showContact}
                onClick={toggleContact}
                ref={buttonRef}
                data-a11y="false"
              >
                Contact Us <ChevronDownIcon aria-hidden="true" />
              </CTAText>
            </CallToAction>
          </Frame>
        )}
      />
      <MediaQuery maxWidth="tablet">
        <Footer />
      </MediaQuery>
    </Background>
  )
}

export default HomeCallToAction

const Background = styled.div`
  background: #111216;
`

const Frame = styled.div`
  position: relative;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    height: 1px;
    background: radial-gradient(
      571.64px at 50.14% 100.05%,
      rgba(255, 255, 255, 0.25) 0%,
      rgba(255, 255, 255, 0.02) 100%
    );
  }

  ${media.tablet`
    min-height: 88vh;
    overflow: visible;
  `}

  @media screen and (max-height: 800px) {
    min-height: 500px;
  }
`

const Nav = styled(Section)`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-top: 100px;
  opacity: ${p => (p.inView ? 1 : 0)};
  transform: translateY(${p => (p.inView ? 0 : -4)}px);
  transition: opacity ${p => (p.inView ? '1s' : '0.5s')} linear,
    transform 0.5s ease-out;
  z-index: 1;

  @media screen and (max-height: 800px) {
    padding-top: 50px;
  }

  ${media.desktop`
    display: flex;
  `}

  ${media.tablet`
    justify-content: center;
    padding-top: 90px;

    div {
      margin: 0 auto;
      height: 30px;
      width: auto;
    }
  `}
`

const NavLinks = styled.div`
  ${media.tablet`
    display: none;
    visibility: hidden;
    opacity: 0;
  `}
`

const NavLink = styled(Link)`
  font-weight: 600;
  font-size: 18px;
  color: #fafafa;
  transition: opacity 0.3s var(--ease-out-quad);

  &:not(:last-child) {
    margin-right: 60px;
  }

  &:hover {
    opacity: 0.5;
  }
`

const TextContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 20px;

  ${media.tablet`
    padding-top: 100px;
    text-align: center;
  `}
`

const TextBackground = styled.div`
  -webkit-background-clip: text;
  padding-top: 200px;
  margin-top: -200px;
  background-repeat: no-repeat;
  background-image: linear-gradient(
    112.72deg,
    #d2c2b3 4.64%,
    #d7d7d9 30.41%,
    #c3c5c8 49.82%,
    #a0a49b 71.09%,
    #dcdddc 87.93%
  );

  background-size: cover;
  color: transparent !important;
  background-position: 0 120px;
  max-width: 680px;
`

const Text = styled.h2`
  display: inline;
  font-family: ${p => p.theme.fontfamily.serif};
  font-weight: 700;
  line-height: 1.1;
  font-size: 80px;
  letter-spacing: -0.5px;

  color: transparent;

  @media screen and (max-height: 800px) {
    font-size: 72px;
  }

  ${media.desktop`
    font-size: 60px;
  `}

  ${media.phablet`
    font-size: 39.29px;
    line-height: 1.2;
    text-align: center;
    max-width: 335px;
  `}
`

const CallToAction = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: calc(-50vh + 75px);
  width: 100%;
  height: 50vh;
  background: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  text-align: center;
  color: #000;
  cursor: pointer;

  ${media.tablet`
    display: none;
    visibility: hidden;
    opacity: 0;
  `}

  &::after {
    content: '';
    position: fixed;
    bottom: -400px;
    height: 400px;
    width: 100%;
    left: 0;
    background: #fff;
    z-index: 99;
  }
`

const CTAText = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  left: 0;
  right: 0;
  top: 22px;
  font-weight: 600;
  max-height: 55px;

  opacity: ${p => (p.animation ? 0 : 1)};
  transition: opacity 0.3s linear ${p => (p.animation ? 0 : '0.4s')};

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -10px;
    width: 120%;
    height: 55px;
    border: 2px solid ${p => p.theme.colors.purple};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }
`

const ChevronDownIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.41 7.83984L12 12.4198L16.59 7.83984L18 9.24984L12 15.2498L6 9.24984L7.41 7.83984Z"
      fill="black"
      fillOpacity="0.25"
    />
  </svg>
)

const MobileAction = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border: 1px solid #fafafa;
  border-radius: 30px;
  margin: 0 auto;
  font-size: 18px;
  text-align: center;
  color: #fff;
  font-weight: 600;
  margin-top: 75px;

  ${media.desktop_up`
    display: none;
  `}
`

const LogoContainer = styled.div`
  max-width: 114px;

  ${media.tablet`
    display: none;
    position: relative;
    left: 60px;
    max-width: 160px;
    height: 30px;
  `}
`

const MobileLogoContainer = styled.div`
  ${media.desktop_up`
    display: none;
  `}
`

const MobileLogo = () => (
  <svg
    width="23px"
    height="30px"
    viewBox="0 0 23 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Narative</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 30H22.9091V26.4595H0V30Z"
      fill="white"
      fillOpacity="0.25"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.00610352 24.7176L7.01994 19.7873L7.01909 15.2965L0.00610352 10.3745V24.7176Z"
      fill="white"
      fillOpacity="0.25"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.8919 0L15.8494 4.87412V9.29375L22.8941 14.2569L22.892 0H22.8919Z"
      fill="white"
      fillOpacity="0.25"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.0065918 0V8.62637L22.8961 24.7297L22.8948 16.0316L0.0065918 0Z"
      fill="white"
      fillOpacity="0.25"
    />
  </svg>
)

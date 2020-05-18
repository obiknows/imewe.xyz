import React, { useState, useRef, createRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import usePortal from 'react-useportal'
import { useStaticQuery, graphql } from 'gatsby'
import SVG from 'react-inlinesvg'
import OutsideClickHandler from 'react-outside-click-handler'

import Heading from '@components/Heading'
import Section from '@components/Section'
import Sticky, { StickyState } from '@components/Sticky'
import Image from '@components/Image'
import SocialLinksDynamic from '@components/SocialLinks/SocialLinks.Dynamic'

import media from '@styles/media'
import { bodyScroll, useResize, getBreakpointFromTheme } from '@utils'

import { ExIcon, ChevronRightIcon, ChevronLeftIcon } from '../../icons/ui/index'
import { IGraphqlSharpFluidImage, IStaticImage } from '../../types/index'

import AboutTeamModal from './About.Team.Modal'
import AboutBackground from './About.Background'

interface Person {
  name: string
  role: string
  illustrationInactive: IGraphqlSharpFluidImage
  illustration: IGraphqlSharpFluidImage
  signature: IStaticImage
  about: string[]
  social: string[]
}

export const illustrationQuery = graphql`
  query GetIllustrations {
    brad: file(name: { regex: "/portrait-illustration-brad-active/" }) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    bradInactive: file(
      name: { regex: "/portrait-illustration-brad-inactive/" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    bradSig: file(name: { regex: "/brad-signature/" }) {
      publicURL
    }
    dan: file(name: { regex: "/portrait-illustration-dan-active/" }) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    danInactive: file(name: { regex: "/portrait-illustration-dan-inactive/" }) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    danSig: file(name: { regex: "/dan-signature/" }) {
      publicURL
    }
    dennis: file(name: { regex: "/portrait-illustration-dennis-active/" }) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    dennisInactive: file(
      name: { regex: "/portrait-illustration-dennis-inactive/" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    dennisSig: file(name: { regex: "/dennis-signature/" }) {
      publicURL
    }
    mack: file(name: { regex: "/portrait-illustration-mack-active/" }) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    mackInactive: file(
      name: { regex: "/portrait-illustration-mack-inactive/" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    mackSig: file(name: { regex: "/mack-signature/" }) {
      publicURL
    }
    thiago: file(name: { regex: "/portrait-illustration-thiago-active/" }) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    thiagoInactive: file(
      name: { regex: "/portrait-illustration-thiago-inactive/" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    thiagoSig: file(name: { regex: "/thiago-signature/" }) {
      publicURL
    }
    breatherLogo: file(name: { regex: "/company-logo-breather/" }) {
      publicURL
    }
  }
`

function AboutTeam() {
  const illustrations = useStaticQuery(illustrationQuery)

  const people: Person[] = [
    {
      name: `Thiago Costa`,
      role: `Brand and Design`,
      illustrationInactive: illustrations.thiagoInactive,
      illustration: illustrations.thiago,
      signature: illustrations.thiagoSig.publicURL,
      about: [
        `Great products don’t come from great designers, or even great engineers. They come from great teams, working to create experiences that are memorable and meaningful, with the resources and freedom to succeed.`,
        `My career began with a focus on typography and brand. But my combined love for tech, business and game design naturally guided me towards working in product startups — until I founded this one, alongside those I’ve met sharing the same commitment and care.`,
        `At Narative, we don’t simply design products. We design the circumstances for success, for ourselves and everyone we partner with.`,
      ],
      social: [
        `https://twitter.com/tcosta_co`,
        `https://dribbble.com/tcosta`,
        `https://www.linkedin.com/in/tcosta-co/`,
        `https://www.instagram.com/tcosta.co/`,
      ],
    },
    {
      name: `Brad Tiller`,
      role: `Marketing and Growth`,
      illustrationInactive: illustrations.bradInactive,
      illustration: illustrations.brad,
      signature: illustrations.bradSig.publicURL,
      about: [
        `In marketing everything from children’s toys to point of sale software to office space, I’ve noticed that the most consistent obstacles to success come from putting the business’s needs ahead of the customer’s.`,
        `It can be tempting to chase metrics that make short-term growth feel exponential, or create features to fill a strategic gap. But products can succeed and scale only after earning their place in customers’ lives. To generate ongoing value, you first have to deliver it.`,
        `We build everything around an understanding of what success looks like — for both customers and company — and how to tie the two together.`,
      ],
      social: [
        `https://twitter.com/bradtiller`,
        `https://www.linkedin.com/in/bradtiller/`,
      ],
    },
    {
      name: `Dennis Brotzky`,
      role: `Frontend Engineering`,
      illustrationInactive: illustrations.dennisInactive,
      illustration: illustrations.dennis,
      signature: illustrations.dennisSig.publicURL,
      about: [
        `I never expected I’d be an engineer. As a psychology major in university, I was more interested in the inner workings of people than machines.`,
        `It was only when I developed something for myself that I learned first-hand the true potential of code; to not simply take an idea and bring it to digital life, but to expand the kinds of creations that are possible in the first place. To amplify the inner workings of the mind.`,
        `At Narative, there’s no “hand-off” between design and engineering; engineering is design. That’s why we all work in parallel on every project, from start to finish, to expand and explore the possibilities.`,
      ],
      social: [
        `https://twitter.com/_brotzky`,
        `https://dribbble.com/brotzky`,
        `https://github.com/brotzky`,
        `https://www.linkedin.com/in/dennis-brotzky/`,
      ],
    },

    {
      name: `Dan Le Van`,
      role: `Backend Engineering`,
      illustrationInactive: illustrations.danInactive,
      illustration: illustrations.dan,
      signature: illustrations.danSig.publicURL,
      about: [
        `Having worked in software development for over 15 years, I’ve seen countless frameworks and methodologies come and go. To me, their greatest impact is not in what they make technically possible; it’s in how they force us to approach challenges from a new perspective.`,
        `But when we idealize a particular way of working — whether in how we design systems, write code or even collaborate together — we lose sight of the truth that there’s always a better way, yet to be discovered.`,
        `While we leverage our experience as a team, we also pause to reflect and critique what we know, in service of creating something truly new.`,
      ],
      social: [
        `https://twitter.com/8lueberry `,
        `https://github.com/8lueberry`,
        `https://www.instagram.com/_blu38erry/`,
        `https://www.linkedin.com/in/levan/`,
      ],
    },
    {
      name: `Mack Mansouri`,
      role: `Operations and Partnerships`,
      illustrationInactive: illustrations.mackInactive,
      illustration: illustrations.mack,
      signature: illustrations.mackSig.publicURL,
      about: [
        `Every company is built upon a foundation of connections — with colleagues, with customers, with supporters and even with other businesses. The stronger those connections, the firmer the foundation.`,
        `That’s why, in the articles we publish, the open source projects we maintain, and in our conversations with other founders and teams, we put honesty and transparency at the center of everything we do. Because only by building trust can we spread and strengthen those bonds.`,
        `Our mission at Narative goes beyond building products we believe in; it’s to help everyone else do the same.`,
      ],
      social: [
        `https://twitter.com/macknarative`,
        `https://www.linkedin.com/in/mackmansouri`,
        `https://www.instagram.com/mack_os`,
      ],
    },
  ]

  const [childRef, setChildRef] = useState()
  const [modalRef, setModalRef] = useState()
  const cardsRef = useRef()
  const cardRefs = useRef([...Array(people.length)].map(() => createRef()))

  const [selectedPersonIndex, setSelectedPersonIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [horizontalOffset, setHorizontalOffset] = useState(0)

  const { Portal } = usePortal()
  const { width } = useResize()

  const isDesktop = width > 540
  const person = people[selectedPersonIndex]

  function handleRef(ref: any) {
    setChildRef(ref)
  }

  function handleModalRef(ref: any) {
    setModalRef(ref)
  }

  function handleSetSelectedPersonIndex(index: number) {
    if (cardRefs.current[index]) {
      setSelectedPersonIndex(index)

      const el: React.RefObject<any> = cardRefs.current[index]
      const box = el.current.getBoundingClientRect()

      if (childRef.current) {
        childRef.current.style.top = `${box.y}px`
        childRef.current.style.left = `${box.x}px`
      }
    }
  }

  function handleModalToggle(open: boolean, index?: number) {
    if (typeof index === 'number') {
      handleSetSelectedPersonIndex(index)
    }

    if (open) {
      bodyScroll('disable', modalRef.current)
    } else {
      document.body.style.pointerEvents = 'none'

      setTimeout(() => {
        document.body.style.pointerEvents = ''
        bodyScroll('enable')
      }, 460)
    }

    setIsOpen(open)
  }

  useEffect(() => {
    function handleEscKeyPress(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleModalToggle(false)
        document.body.style.pointerEvents = ''
        bodyScroll('enable')
      }
    }

    window.addEventListener('keydown', handleEscKeyPress, true)
    return () => window.removeEventListener('keydown', handleEscKeyPress, true)
  }, [modalRef])

  useEffect(() => {
    if (cardsRef.current) {
      const GAP_BETWEEN_CARDS = 80

      const $cards = cardsRef.current
      const { width: cardsWidth } = $cards.getBoundingClientRect()
      const { width: cardWidth } = $cards.firstChild.getBoundingClientRect()

      let offset = cardsWidth - cardWidth

      if (width <= 768) {
        offset = cardsWidth - cardWidth - cardWidth + GAP_BETWEEN_CARDS - 30
      }

      if (width <= 540) {
        offset = 20
      }

      if (width >= 1024) {
        offset = cardsWidth - cardWidth - cardWidth - GAP_BETWEEN_CARDS
      }

      setHorizontalOffset(offset)
    }
  }, [cardsRef, cardRefs, width])

  return (
    <>
      <AboutTeamContainer>
        <AboutRow header="Our Team">
          <TextContainer>
            <Text>
              Our team functions as a cohesive unit of thinkers and creators.
              Together we create marvelous realities in the digital
              world.
            </Text>
            <Text>
              We are loyal and dedicated to each other, our clients, and our
              projects. We understand the concept that there is NO I in TEAM,
              use this to create a real impact on our work.
            </Text>
          </TextContainer>
        </AboutRow>
        {/* {isDesktop ? (
          <Sticky
            cover
            height="3300px"
            render={({ progress: prog }: StickyState) => {
              return (
                <Section narrow>
                  <TeamCardsContainer
                    style={{
                      transform: `translate3d(-${prog *
                        horizontalOffset}px, 0, 0)`,
                      width: `${horizontalOffset}px`,
                    }}
                  >
                    <Cards ref={cardsRef}>
                      {people.map((person, index) => {
                        const cardIsOpen =
                          isOpen && selectedPersonIndex === index

                        return (
                          <Card
                            isOpen={isOpen}
                            key={person.name}
                            ref={cardRefs.current[index]}
                            isSelected={selectedPersonIndex === index}
                            onClick={() => handleModalToggle(true, index)}
                          >
                            <IllustrationColored isOpen={cardIsOpen}>
                              <Image
                                src={person.illustration.childImageSharp.fluid}
                                loading="eager"
                              />
                            </IllustrationColored>
                            <Illustration isOpen={cardIsOpen}>
                              <Image
                                src={
                                  person.illustrationInactive.childImageSharp
                                    .fluid
                                }
                                loading="eager"
                              />
                            </Illustration>
                            <div style={{ position: 'relative' }}>
                              <Name isOpen={cardIsOpen}>{person.name}</Name>
                              <Role isOpen={cardIsOpen}>
                                {person.role} <ArrowIcon />
                              </Role>
                            </div>
                          </Card>
                        )
                      })}
                    </Cards>
                  </TeamCardsContainer>
                  <Progress>
                    <Value
                      style={{ transform: `translate3d(${prog * 437}%, 0, 0)` }}
                    />
                  </Progress>
                </Section>
              )
            }}
          />
        ) : (
          <Section narrow>
            {people.map((person, index) => {
              const cardIsOpen = isOpen && selectedPersonIndex === index

              return (
                <Card
                  isOpen={isOpen}
                  key={person.name}
                  ref={cardRefs.current[index]}
                  isSelected={selectedPersonIndex === index}
                  onClick={() => handleModalToggle(true, index)}
                >
                  <IllustrationColored isOpen={cardIsOpen}>
                    <Image
                      src={person.illustration.childImageSharp.fluid}
                      loading="eager"
                    />
                  </IllustrationColored>
                  <Illustration isOpen={cardIsOpen}>
                    <Image
                      src={person.illustrationInactive.childImageSharp.fluid}
                      loading="eager"
                    />
                  </Illustration>
                  <div style={{ position: 'relative' }}>
                    <Name isOpen={cardIsOpen}>{person.name}</Name>
                    <Role isOpen={cardIsOpen}>
                      {person.role} <ArrowIcon />
                    </Role>
                  </div>
                </Card>
              )
            })}
          </Section>
        )} */}
        {/* <AboutBackground /> */}
      </AboutTeamContainer>

      {/* 
      
      The way the modal works for this is we have two parts.
      1. The Framer Motion animation that makes it look like the component is
          moving as a single piece
      2. The Modal content which is placed on top of the Framer Motion black modal
      
      */}
      <Portal>
        <AboutTeamModal isSelected={isOpen} handleRef={handleRef} />
        <AboutTeamModalContent
          isOpen={isOpen}
          people={people}
          person={person}
          handleModalRef={handleModalRef}
          handleOutsideClick={
            isOpen ? () => handleModalToggle(false) : () => {}
          }
          handleSetSelectedPersonIndex={handleSetSelectedPersonIndex}
        />
      </Portal>
    </>
  )
}

export function AboutRow({
  children,
  header,
}: {
  children: React.ReactNode
  header: string
}) {
  return (
    <AboutRowSpacer data-scroll-fade={true}>
      <Section narrow>
        <AboutRowContainer>
          <AboutRowHeader>{header}</AboutRowHeader>
          <AboutRowContent>{children}</AboutRowContent>
        </AboutRowContainer>
      </Section>
    </AboutRowSpacer>
  )
}

function AboutTeamModalContent({
  isOpen,
  people,
  person,
  handleModalRef,
  handleOutsideClick,
  handleSetSelectedPersonIndex,
}: {
  isOpen: boolean
  people: Person[]
  person: Person
  handleModalRef: () => void
  handleOutsideClick: () => void
  handleSetSelectedPersonIndex: (index: number) => void
}) {
  const [buttonPlacement, setButtonPlacement] = useState({ top: 0, right: 0 })
  const modalRef = useRef()
  const modalScrollRef = useRef()
  const { width } = useResize()

  useEffect(() => {
    handleModalRef(modalRef)
  }, [])

  useEffect(() => {
    const { top, left } = modalRef.current.getBoundingClientRect()
    const tablet = getBreakpointFromTheme('tablet')

    if (width > tablet) {
      setButtonPlacement({})
    } else {
      setButtonPlacement({
        top: `${top + 30}px`,
        left: `${left + 20}px`,
      })
    }
  }, [isOpen, modalRef, setButtonPlacement, width])

  const modalStyles = isOpen
    ? { opacity: 1, transition: `opacity 0s ease 0.4s` }
    : { opacity: 0, pointerEvents: 'none' }

  const activeIndex = people.findIndex(p => p.name === person.name)

  let nextIndex = activeIndex + 1
  if (activeIndex === people.length - 1) {
    nextIndex = 0
  }

  let prevIndex = activeIndex - 1
  if (activeIndex === 0) {
    prevIndex = people.length - 1
  }

  useEffect(() => {
    if (isOpen) {
      function handleKeyDown(event: KeyboardEvent) {
        switch (event.key) {
          case 'ArrowLeft':
            activeIndex === 0
              ? handleSetSelectedPersonIndex(people.length - 1)
              : handleSetSelectedPersonIndex(activeIndex - 1)
            break
          case 'ArrowRight':
            activeIndex === people.length - 1
              ? handleSetSelectedPersonIndex(0)
              : handleSetSelectedPersonIndex(activeIndex + 1)
            break
          default:
            return
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, activeIndex])

  return (
    <Modal style={modalStyles}>
      <OutsideClickHandler onOutsideClick={handleOutsideClick}>
        <ModalContent ref={modalRef}>
          <CloseButton
            onClick={handleOutsideClick}
            style={buttonPlacement}
            isOpen={isOpen}
          >
            <ExIcon fill="#fff" />
          </CloseButton>
          {isOpen && (
            <ModalGrid key={person.name}>
              <ModalAbout>
                <ModalName>{person.name}</ModalName>
                <ModalRole>{person.role}</ModalRole>
                <div>
                  {person.about.map((text, index) => (
                    <ModalText key={text} index={index}>
                      {text}
                    </ModalText>
                  ))}
                </div>
                <SocialAnimator>
                  <SocialLinksDynamic links={person.social} />
                </SocialAnimator>
                <ModalSignature>
                  <SVG src={person.signature} />
                </ModalSignature>
              </ModalAbout>
              <MediaAnimator>
                <Image src={person.illustration.childImageSharp.fluid} />
              </MediaAnimator>
            </ModalGrid>
          )}
          <ModalPrev
            onClick={() => handleSetSelectedPersonIndex(prevIndex)}
            isOpen={isOpen}
          >
            <ChevronLeftIcon />
          </ModalPrev>
          <ModalNext
            onClick={() => handleSetSelectedPersonIndex(nextIndex)}
            isOpen={isOpen}
          >
            <ChevronRightIcon />
          </ModalNext>
        </ModalContent>
      </OutsideClickHandler>
    </Modal>
  )
}

export default AboutTeam

const fadeInAndUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const AboutTeamContainer = styled.div`
  padding: 0 0 240px;

  ${media.desktop`
    padding: 0 0 200px;
  `}

  ${media.tablet`
    padding: 0 0 160px;
  `}

  ${media.phablet`
    padding: 0 0 90px;
  `}
`

const AboutRowSpacer = styled.div`
  overflow: hidden;
`

const AboutRowContainer = styled.div`
  display: flex;

  ${media.desktop`
    flex-direction: column;
  `};
`

const AboutRowHeader = styled(Heading.h2)`
  align-self: flex-start;
  font-size: 3.2rem;
  color: ${p => p.theme.colors.grey};
  width: 20rem;
  min-width: 20rem;
  line-height: 1.4;
  padding-bottom: 1rem;
  margin-right: 6.3rem;

  ${media.desktop`
    flex-direction: column;
    margin: 0 0 3.5rem 0;
  `};

  ${media.tablet`
    padding-bottom: 0;
    margin-bottom: 1rem;
    width: 100%;
    font-size: 2.4rem;
  `};
`

const AboutRowContent = styled.div`
  flex: 1;
`

const TextContainer = styled.div`
  display: grid;
  grid-template-columns: 261px 361px;
  grid-column-gap: 57px;

  ${media.tablet`
    display: block;
    max-width: 355px;
  `}
`

const Text = styled.p`
  font-size: 22px;
  line-height: 28px;
  color: #fafafa;

  ${media.tablet`
    margin-bottom: 20px;
  `}

  ${media.phablet`
    font-size: 18px;
  `}
`

const TeamCardsContainer = React.memo(styled.div`
  display: flex;
  color: ${p => p.theme.colors.grey};
  width: 20rem;
  min-width: 20rem;
  padding-bottom: 1rem;
  width: 100%;
  padding: 16vh 0 0 263px;
  align-items: center;
  will-change: transform;
  transform-style: preserve-3d;

  ${media.desktop`
    padding: 16vh 0 0 0;
  `}
`)

const Cards = React.memo(styled.div`
  display: grid;
  grid-template-columns: repeat(5, 390px);
  grid-column-gap: 20px;

  ${media.phablet`
    grid-template-columns: repeat(5, 90vw);
    grid-column-gap: 10px;
  `}
`)

const Illustration = styled.div<{ isOpen: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  opacity: ${p => (p.isOpen ? 0 : 1)};
  transition: opacity 0.4s;
  will-change: opacity;
`

const IllustrationColored = styled.div<{ isOpen: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  opacity: ${p => (p.isOpen ? 0 : 1)};
  transition: ${p => (p.isOpen ? 'opacity 0.4s 0.3s' : 'opacity 0.3s;')};
  will-change: opacity;
`

const Name = styled(Heading.h2)<{ isOpen: boolean }>`
  margin-bottom: 0;
  transform: translateY(${p => (p.isOpen ? 0 : -8)}px);
  opacity: ${p => (p.isOpen ? 0 : 1)};
  transition: transform 0.4s 0.5s, opacity 0.4s 0.5s;
`

const Role = styled.div<{ isOpen: boolean }>`
  display: inline-block;
  position: relative;
  color: ${p => p.theme.colors.grey};
  font-size: 22px;
  transform: translateY(${p => (p.isOpen ? 0 : -8)}px);
  opacity: ${p => (p.isOpen ? 0 : 1)};
  transition: transform 0.5s 0.475s, opacity 0.4s 0.475s, color 0.4s;

  svg {
    position: absolute;
    right: -24px;
    top: 30%;
    transform: translateY(-30%);
    opacity: 0;
    transform: translateX(-3px);
    transition: opaicty 0.3s, transform 0.3s ease;
  }
`

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.00008 2.66602L7.06008 3.60602L10.7801 7.33268H2.66675V8.66602H10.7801L7.06008 12.3927L8.00008 13.3327L13.3334 7.99935L8.00008 2.66602Z"
      fill="#E9DAAC"
    />
  </svg>
)

const Card = styled.div<{ isSelected: boolean; isOpen: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 470px;
  background: #000;
  box-shadow: 0px 24px 48px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: center;
  padding: 0 0 44px;
  cursor: pointer;
  will-change: filter;
  transition: filter 0.2s, opacity 0s;
  overflow: hidden;
  opacity: ${p => (p.isSelected && p.isOpen ? 0 : 1)};

  ${p => !p.isOpen && `transition-delay: 0.4s;`}

  &:hover svg {
    opacity: 1;
    transform: translateX(0);
  }

  &:hover ${Role} {
    color: ${p => p.theme.colors.gold};
  }

  &:hover ${Illustration} {
    opacity: 0;
  }

  ${media.tablet`
    height: 66vh;
    max-height: 550px;
    padding: 0 0 30px;
  `}

  ${media.phablet`
    height: 410px;
    margin-bottom: 20px;

    &:first-child {
      margin-top: 40px
    }

    &:last-child {
      margin-bottom: 70px
    }
  `}

  ${media.phone_small`
    height: 380px;
  `}
`

const Progress = styled.div`
  margin: 40px 15px 180px 263px;
  position: relative;
  height: 1px;
  background: rgba(250, 250, 250, 0.15);
  overflow: hidden;

  ${media.desktop`
    margin: 40px 0 180px;
  `}

  ${media.tablet`
    margin: 40px 0 20vh;
  `}
`

const Value = styled.div`
  position: absolute;
  left: 0;
  width: 18.6%;
  height: 1px;
  background: ${p => p.theme.colors.sirius};
`

const CloseButton = styled.button<{ isOpen: boolean }>`
  position: absolute;
  top: 30px;
  left: 30px;
  height: 24px;
  width: 24px;
  z-index: 1;
  opacity: ${p => (p.isOpen ? 1 : 0)};
  transition: opacity 0.4s ease 0.4s;

  ${media.phablet`
    position: fixed;

    &::before {
      content: '';
      position: absolute;
      left: -50%;
      top: -50%;
      width: 200%;
      height: 200%;
      background: black;
      border-radius: 50%;
      z-index: -1;
    }
  `}
`

const Modal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 20px;

  & > div {
    flex: 1;
    max-width: 1140px;
    max-height: 630px;
    height: 100%;
  }

  ${media.phablet`
    padding: 30px 15px;
   
    & > div {
      max-height: 92vh;
      max-height: calc(var(--vh, 1vh) * 92);
    }
  `}
`

const ModalContent = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1140px;
  height: 100%;
  width: 100%;
  background: #000;
  border-radius: 5px;
  box-shadow: 0px 24px 48px rgba(0, 0, 0, 0.2);

  ${media.tablet`
    overflow-y: scroll;
    max-height: 92vh;
    max-height: calc(var(--vh, 1vh) * 92);
    -webkit-overflow-scrolling: touch;
  `}
`

const ModalGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ModalAbout = styled.div`
  width: 100%;
  max-width: 520px;
  margin: 40px 0 0 75px;
  max-height: 92vh;
  max-height: calc(var(--vh, 1vh) * 92);
  -webkit-overflow-scrolling: touch;

  ${media.desktop_small`
    max-width: initial;
    padding: 40px 80px;
    margin: 0 auto;
  `}
  
  ${media.tablet`
    padding: 30px;
  `}

  ${media.phablet`
    padding: 80px 20px;
    pointer-events: none;
  `}

`

const ModalText = styled.p<{ index: number }>`
  color: #fff;
  margin-bottom: 25px;
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1)
    ${p => p.index * 100 + 300}ms forwards;

  ${media.phablet`
    margin-bottom: 20px;
  `}
`

const ModalName = styled(Heading.h2)`
  margin-bottom: 5px;
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 200ms
    forwards;
`

const ModalRole = styled.div`
  font-size: 22px;
  color: ${p => p.theme.colors.grey};
  margin-bottom: 30px;
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 300ms
    forwards;

  ${media.phablet`
    margin-bottom: 20px;
  `}
`

const SocialAnimator = styled.div`
  margin-bottom: 25px;
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 600ms
    forwards;
`

const ModalSignature = styled.div`
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 700ms
    forwards;

  ${media.phablet`
    padding-bottom: 40px;
  `}
`

const MediaAnimator = styled.div`
  width: 472px;
  margin-left: 35px;
  flex: 1;
  opacity: 0;
  animation: ${fadeIn} 1s cubic-bezier(0.165, 0.84, 0.44, 1) 300ms forwards;

  ${media.desktop_small`
    display: none;
  `}
`

const ModalNext = styled.button<{ isOpen: boolean }>`
  position: absolute;
  right: -20px;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  background: #fff;
  border-radius: 50%;
  opacity: ${p => (p.isOpen ? 1 : 0)};
  transform: translate(${p => (p.isOpen ? 0 : -8)}px, -50%);
  transition: all 0.4s ease 0.4s;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(2px);
  }

  &:hover svg {
    background: #fafafa;
  }

  opacity: 0;
  animation: ${fadeIn} 1s cubic-bezier(0.165, 0.84, 0.44, 1) 100ms forwards;

  ${media.desktop_medium`
    right: -10px;
  `}

  ${media.tablet`
    display: none;
  `}
`

const ModalPrev = styled.button<{ isOpen: boolean }>`
  position: absolute;
  left: -20px;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  background: #fff;
  border-radius: 50%;
  opacity: ${p => (p.isOpen ? 1 : 0)};
  transform: translate(${p => (p.isOpen ? 0 : 8)}px, -50%);
  transition: all 0.4s ease 0.4s;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(-2px);
  }

  &:hover svg {
    background: #fafafa;
  }

  opacity: 0;
  animation: ${fadeIn} 1s cubic-bezier(0.165, 0.84, 0.44, 1) 100ms forwards;

  ${media.desktop_medium`
    left: -10px;
  `}

  ${media.tablet`
    display: none;
  `}
`

const Desktop = styled.div`
  ${media.phablet`
    display: none;
  `}
`

const Mobile = styled.div`
  display: none;
  margin: 50px auto 80px;

  ${media.phablet`
    position: relative;
    display: block;
  `}
`

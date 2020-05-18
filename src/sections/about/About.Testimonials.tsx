import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import SVG from 'react-inlinesvg'

import Section from '@components/Section'
import Sticky, { StickyState } from '@components/Sticky'
import HorizontalScroll from '@components/HorizontalScroll'
import media from '@styles/media'
import { clamp, useResize } from '@utils'

import AboutHeading from './About.Heading'

const BACKGROUND_COLOR_BLENDS = [
  '#1D2128',
  '#1C1F26',
  '#1A1E24',
  '#191C23',
  '#181B21',
  '#17191F',
  '#15181D',
  '#14161B',
  '#131519',
  '#121318',
  '#101216',
  '#0F1014',
]

const companyLogosQuery = graphql`
  {
    hopperLogo: file(name: { regex: "/testimonial-company-logo-hopper/" }) {
      publicURL
    }
    flowLogo: file(name: { regex: "/testimonial-company-logo-flow/" }) {
      publicURL
    }
    gatsbyLogo: file(name: { regex: "/testimonial-company-logo-gatsby/" }) {
      publicURL
    }
    netlifyLogo: file(name: { regex: "/testimonial-company-logo-netlify/" }) {
      publicURL
    }
  }
`

function AboutTestimonial() {
  const { hopperLogo, flowLogo, gatsbyLogo, netlifyLogo } = useStaticQuery(
    companyLogosQuery
  )
  const { height, width } = useResize()

  const testimonials = [
    {
      name: 'Kyle Mathews',
      title: 'CEO & Founder',
      testimonial:
        "Our mission at Gatsby is to empower digital creators to build fast, responsive experiences — and Narative does so in ways that are consistently beautiful and inspiring. We're always excited to see what they build, and grateful for their contributions to the Gatsby community.",
      logo: gatsbyLogo,
    },
    {
      name: 'Shawn Wang',
      title: 'Developer Experience',
      testimonial:
        "Narative's work is more than just beautifully designed — their code is beautifully clear and well-documented, too. Their contributions to the open source community are among the most polished that I’ve seen.",
      logo: netlifyLogo,
    },
    {
      name: 'Peter Bailey',
      title: 'Partner',
      testimonial:
        'I never hesitate to recommend that startups at any stage reach out and talk to the Narative team. Not only are they brilliant professionals in each of their fields, they approach every conversation with thoughtfulness and sincerity.',
      logo: flowLogo,
    },
    {
      name: 'Pierre-Etienne Corriveau',
      title: 'Product Design Lead',
      testimonial:
        "Narative took a personal and hands-on approach to building the new Hopper.com, meeting with many Hopper Humans to understand what makes us unique to create a digital destination that truly represents us. I'd be more than happy to collaborate with Narative, again and again.",
      logo: hopperLogo,
    },
  ]

  return (
    <>
      <Desktop>
        <Sticky
          cover
          height={width < 767 ? `1800px` : `2600px`}
          render={({ progress }: StickyState) => {
            const four = progress * 2
            const textStyles =
              progress > 0
                ? ` style="display: block; opacity: ${1 -
                    four}; transform: scale(${1 -
                    progress / 4}); will-change: opacity, transform;"`
                : ``

            return (
              <AboutTestimonialContainer>
                <HeadingLineBreak>
                  <AboutHeading
                    heading="<span>Design and<br /> development</span>"
                    text={`<span${textStyles}>Our passionate team of designers and developers work day in and day out to create unique products, assuring that we offer the most
innovative and attractive results.<span style="color:#73737D">We believe in immersing ourselves into every project until we successfully achieve our goal of consumer
satisfaction, both for the companies we work for and their customers. We boast a tireless dedication to our craft and we love what we do.</span></span>`}
                  />
                  {/* <AboutHeading
                    heading="<span>Independent,<br /> but never alone</span>"
                    text={`<span${textStyles}>While we like to do things our own way, nobody can do it all by themselves. <span style="color:#73737D">Narative believes in building ongoing partnerships based on trust, and in contributing our ideas and work to the open source community. When we do honest work, good word spreads, and we can all build ever-greater things.</span></span>`}
                  /> */}
                </HeadingLineBreak>
                <Section narrow>
                  <TestimonialCardContainer>
                    {testimonials.map((testimonial, index) => {
                      const total = testimonials.length
                      const nextIndex = index + 1
                      const previousIndex = index - 1
                      const first = index === 0
                      const minZeroMaxOne = (num: number) => clamp(num, 0, 1)

                      const prevStaggered = minZeroMaxOne(
                        progress - previousIndex / total
                      )
                      const currentStaggered = minZeroMaxOne(
                        progress - index / total
                      )
                      const nextStaggered = minZeroMaxOne(
                        progress - nextIndex / total
                      )

                      const prevProgress = minZeroMaxOne(prevStaggered * total)
                      const currentProgress = minZeroMaxOne(
                        currentStaggered * total
                      )
                      const nextProgress = minZeroMaxOne(nextStaggered * total)

                      let offsetHeight = first ? 100 : 450

                      if (width < 460 && height < 750) {
                        offsetHeight = first ? 180 : 540
                      }

                      if (width < 460 && height < 668) {
                        offsetHeight = first ? 230 : 580
                      }

                      const transalteYFirst = currentProgress * offsetHeight

                      const transalteYSecond =
                        transalteYFirst +
                        nextProgress * 22 * (total - nextIndex)

                      const scaleCurve = 1 - nextStaggered * 0.25

                      const selectedBlend = Math.round(
                        ((((1 - scaleCurve) * 100) / 9) * 10) / 2
                      )

                      return (
                        <TestimonialCard
                          data-card={index}
                          key={testimonial.name}
                          style={{
                            transform: `translateY(-${transalteYSecond}px) scale(${scaleCurve})`,
                            opacity: prevProgress,
                            willChange: 'transform, opacity',
                          }}
                        >
                          <Card
                            style={{
                              background:
                                BACKGROUND_COLOR_BLENDS[selectedBlend],
                            }}
                          >
                            <LogoContainer>
                              <SVG src={testimonial.logo.publicURL} />
                            </LogoContainer>
                            <VerticalDivider />
                            <div>
                              <Title>
                                {testimonial.name} · {testimonial.title}
                              </Title>
                              <Text>{testimonial.testimonial}</Text>
                            </div>
                          </Card>
                        </TestimonialCard>
                      )
                    })}
                  </TestimonialCardContainer>
                </Section>
              </AboutTestimonialContainer>
            )
          }}
        />
      </Desktop>

      <Mobile>
        <HeadingLineBreak>
          {/* <AboutHeading
            heading="Independent,<br /> but never alone"
            text={`While we like to do things our own way, nobody can do it all by themselves. <span style="color:#73737D">Narative believes in building ongoing partnerships based on trust, and in contributing our ideas and work to the open source community. When we do honest work, good word spreads, and we can all build ever-greater things.</span></span>`}
          /> */}
          <AboutHeading
            heading="Independent,<br /> but never alone"
            text={`While we like to do things our own way, nobody can do it all by themselves. <span style="color:#73737D">Narative believes in building ongoing partnerships based on trust, and in contributing our ideas and work to the open source community. When we do honest work, good word spreads, and we can all build ever-greater things.</span></span>`}
          />
        </HeadingLineBreak>
        <Section narrow>
          <TestimonialCardContainer>
            <HorizontalScroll
              list={testimonials}
              name="testimonial"
              narrow
              render={({ testimonial }: any) => {
                return (
                  <TestimonialCard key={testimonial.name} as="div">
                    <Card>
                      <LogoContainer>
                        <SVG src={testimonial.logo.publicURL} />
                      </LogoContainer>
                      <VerticalDivider />
                      <div style={{ width: '100%' }}>
                        <Name>{testimonial.name}</Name>
                        <Title>{testimonial.title}</Title>
                        <Text>{testimonial.testimonial}</Text>
                      </div>
                    </Card>
                  </TestimonialCard>
                )
              }}
            />
          </TestimonialCardContainer>
        </Section>
      </Mobile>
    </>
  )
}

export default AboutTestimonial

const AboutTestimonialContainer = styled.div`
  position: relative;
  padding-top: 10vh;
  height: 100vh;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    height: 20vh;
    min-height: 200px;
    right: 0;
    left: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(11, 12, 15, 0) 0%, #090a0d 80%);
    pointer-events: none;

    @media (min-height: 800px) {
      height: 25vh;
      min-height: 300px;
      background: linear-gradient(180deg, rgba(11, 12, 15, 0) 0%, #090a0d 60%);
    }

    @media (min-height: 950px) {
      height: 35vh;
      min-height: 400px;
      background: linear-gradient(180deg, rgba(11, 12, 15, 0) 0%, #090a0d 50%);
    }

    @media (min-height: 1050px) {
      height: 40vh;
      min-height: 400px;
      background: linear-gradient(180deg, rgba(11, 12, 15, 0) 0%, #090a0d 30%);
    }

    ${media.tablet`
      height: 20vh;
      min-height: 100px;
    `}

    ${media.phone_small`
      height: 10vh;
      min-height: auto;
      background: linear-gradient(180deg, rgba(11, 12, 15, 0) 0%, #0b0c0f 70%);
    `}
  }

  ${media.phone_small`
    padding-top: 5vh;
  `}
`

const TestimonialCardContainer = styled.ul`
  position: relative;
  max-width: 750px;
  margin: 90px auto 0;
  list-style: none;

  ${media.desktop`
    margin: 50px auto 0;
  `}
`

const TestimonialCard = styled.li`
  top: 350px;
  height: 350px;
  position: absolute;

  &:first-child {
    top: 0;
  }

  ${media.desktop`
    position: relative;
    top: 0;
    height: auto;
    margin-bottom: 20px;
  `}
`

const Card = styled.div`
  display: flex;
  align-items: center;
  height: 200px;
  width: 100%;
  border-radius: 5px;
  background: #1d2128;
  padding: 40px 40px 40px 0;
  font-size: 18px;
  box-shadow: 0px 0px 35px rgba(0, 0, 0, 0.35);
  transition: background 0.1s;

  ${media.tablet`
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    height: auto;
    padding: 30px 30px 0;
  `}

  ${media.phablet`
    padding: 30px 15px 0;
    min-height: 365px;
  `}
`

const LogoContainer = styled.div`
  ${media.tablet`
    width: 100%;
    border-top: 1px solid rgba(250, 250, 250, 0.05);
    order: 3;
  `}
`

const Name = styled.div`
  font-weight: 700;
  color: #fff;
  white-space: pre-wrap;
`

const Title = styled.div`
  font-weight: 700;
  color: #fff;

  ${media.tablet`
  font-weight: 400;
    margin-bottom: 22px;
    white-space: pre-wrap;
  `}
`

const Text = styled.p`
  color: ${p => p.theme.colors.grey};

  ${media.tablet`
    padding-bottom: 30px;
  `}

  ${media.phablet`
    font-size: 16px;
    white-space: pre-wrap;
    padding-bottom: 20px;
  `}
`

const VerticalDivider = styled.div`
  height: 120px;
  width: 5px;
  margin-right: 40px;
  background: rgba(250, 250, 250, 0.05);

  ${media.tablet`
    display: none;
  `}
`

const HeadingLineBreak = styled.div`
  h2 {
    width: 70%;
    display: block;

    ${media.tablet`
      width: 80%;
    `}

    ${media.phone`
      width: 90%;
    `}
  }
`

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
    margin: 100px auto 160px;
  `}

  ${media.phablet`
    margin: 100px auto;
  `}
`

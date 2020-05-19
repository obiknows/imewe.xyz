import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import SEO from '@components/SEO'
import Layout from '@components/Layout'
import Section from '@components/Section'
import Heading from '@components/Heading'
import LayoutHeroMobile from '@components/Layout/Layout.Hero.Mobile'
import Image from '@components/Image'
import ScrollIndicator from '@components/ScrollIndicator'
import Pill from '@components/Pill'
import Transitions from '@components/Transitions'

import media from '@styles/media'
import { keyToSymbol } from '@shortcuts'

import LabsPreview from '../../sections/labs/Labs.Preview'
import LabsPreviewMobile from '../../sections/labs/Labs.Preview.Mobile'

/**
 * The labs page is a bit of a mess with the inlined Product Array but it
 * works for now. In the event that we redesign this page it's recommended
 * to start a new file to handle things neater!
 */

function LabsPage({ data, location }) {
  const {
    allContentfulPage,
    hero,
    heroBody,
    heroScreen,
    needlBackground,
    memoirBackground,
    feyBackground,
    odeeBackground,
    ourSoulAgendaBackground,
    novelaBackground,
    commandlineBackground,
  } = data
  const { seo } = allContentfulPage.edges[0].node
  const pageBackground =
    'linear-gradient(180deg, #08070B 40%, #111216 50%, #191D23 100%)'
  const navConfig = {
    fixed: true,
    theme: 'light',
    offset: true,
  }
  const footerConfig = {
    visible: true,
  }

  // Start the bulb up animation once the image has laoded
  const [showScreen, setShowScreen] = useState(false)

  // Inlining our products to get the right variables we need in scope!
  const products = [
    {
      logo: ODEELogo,
      background: odeeBackground.childImageSharp.fluid.src,
      backgroundColor: '#060608',
      excerpt:
        "This up and coming streetwear brand dedicated asked us to design their products, webstore, growth strategy dedicated to the brands' message of pushing its members to Overcome Doubt and Excel Endlessly.",
        // "Whether you're looking to get inked or you're a tattoo artist yourself, this upcoming app will help you get what you need. Find artists and styles, schedule appointments, book flashes and get paid.",
      children: (
        <>
          <HorizontalRule />
          <div>
            <LinkToProduct
              target="_blank"
              data-a11y="false"
              href="https://odee.bigcartel.com"
            >
              <GlobeIcon aria-hidden="true" />
              Visit website
            </LinkToProduct>
          </div>
        </>
      ),
    },
    {
      logo: OSALogo,
      background: ourSoulAgendaBackground.childImageSharp.fluid.src,
      backgroundColor: '#16171C',
      excerpt:
        "We designed a website complete with: a blog space, donation capabilities, an online store, and affliate link section for these YouTubers dedicated to helping others to live out our soul's purpose.",
      children: (
        <>
          <HorizontalRule />
          <div>
            <LinkToProduct
              target="_blank"
              data-a11y="false"
              href="https://oursoulagenda.com"
            >
              <GlobeIcon aria-hidden="true" />
              Visit website
            </LinkToProduct>
            {/* <LinkToProduct
              target="_blank"
              data-a11y="false"
              href="https://narative.co/design/open/fey"
            >
              <FigmaIcon aria-hidden="true" /> View in Figma
            </LinkToProduct> */}
          </div>
        </>
      ),
    },
    // {
    //   logo: NeedlLogo,
    //   background: needlBackground.childImageSharp.fluid,
    //   backgroundColor: '#060608',
    //   excerpt:
    //     "Whether you're looking to get inked or you're a tattoo artist yourself, this upcoming app will help you get what you need. Find artists and styles, schedule appointments, book flashes and get paid.",
    //   children: (
    //     <>
    //       <HorizontalRule dark />
    //       <LinkToProduct dark as="div">
    //         Coming: when it’s ready
    //       </LinkToProduct>
    //     </>
    //   ),
    // },
    // {
    //   logo: FeyLogo,
    //   background: feyBackground.childImageSharp.fluid,
    //   backgroundColor: '#16171C',
    //   excerpt:
    //     'Sick of tracking your trades across Evernote, Excel files and countless screenshots? Fey gives you the complete picture of your portfolio, with fast data entry, always-on risk analysis and more.',
    //   children: (
    //     <>
    //       <HorizontalRule />
    //       <div>
    //         <LinkToProduct
    //           target="_blank"
    //           data-a11y="false"
    //           href="https://feyapp.com"
    //         >
    //           <GlobeIcon aria-hidden="true" />
    //           Visit website
    //         </LinkToProduct>
    //         <LinkToProduct
    //           target="_blank"
    //           data-a11y="false"
    //           href="https://narative.co/design/open/fey"
    //         >
    //           <FigmaIcon aria-hidden="true" /> View in Figma
    //         </LinkToProduct>
    //       </div>
    //     </>
    //   ),
    // },
    // {
    //   logo: CommandlineLogo,
    //   background: commandlineBackground.childImageSharp.fluid,
    //   backgroundColor: '#222838',
    //   excerpt:
    //     'Computers have plenty of buttons, so we wondered: why explore the web with just one? Narative Command lets you instantly access any page on Narative.co with simple keyboard shortcuts.',
    //   children: (
    //     <>
    //       <HorizontalRule />
    //       <LinkToProduct dark as="div">
    //         Try it out! Just press <Symbol>{keyToSymbol('meta')}</Symbol>{' '}
    //         <Symbol>K</Symbol>
    //       </LinkToProduct>
    //     </>
    //   ),
    // },
    // {
    //   logo: NovelaLogo,
    //   background: novelaBackground.childImageSharp.fluid,
    //   backgroundColor: '#a8cee8',
    //   excerpt:
    //     'With minimal styling and maximum features — including multiple homepage layouts, built-in social sharing and dark mode — Novela makes it easy to publish beautiful articles and stories with Gatsby.',
    //   children: (
    //     <>
    //       <HorizontalRule dark />
    //       <div>
    //         <LinkToProduct
    //           as={Link}
    //           to="/labs/novela"
    //           style={{ color: '#08080B' }}
    //         >
    //           <EyeIcon aria-hidden="true" fill="#08080B" />
    //           Preview
    //         </LinkToProduct>
    //         <LinkToProduct
    //           target="_blank"
    //           data-a11y="false"
    //           href="https://narative.co/design/open/novela"
    //           style={{ color: '#08080B' }}
    //         >
    //           <FigmaIcon aria-hidden="true" fill="#08080B" /> View in Figma
    //         </LinkToProduct>
    //       </div>
    //     </>
    //   ),
    // },
    // {
    //   logo: MemoirLogo,
    //   background: memoirBackground.childImageSharp.fluid,
    //   backgroundColor: '#D4D7DB',
    //   excerpt:
    //     'Memoir is a Gatsby theme that puts your writing first. Designed to be beautiful without adding a single image, it includes all the features of our other theme Novela, like dark mode and social sharing.',
    //   children: (
    //     <>
    //       <HorizontalRule dark />
    //       <LinkToProduct dark as="div">
    //         Coming soon
    //       </LinkToProduct>
    //     </>
    //   ),
    // },
  ]
  // ].reverse()

  return (
    <Layout nav={navConfig} background={pageBackground} footer={footerConfig}>
      <>
        <SEO
          title={seo.title}
          description={seo.description}
          image={seo.image.file.url}
          pathname={location.pathname}
        />
        <LayoutHeroMobile>
          <HeroSection hideOverflow>
            <ContentContainer>
              <div />
              <Transitions.CSS.FadeIn>
                <TextContainer>
                  <Pill text="Labs" />
                  <Heading.h2 styles="h1" style={{fontSize: '2.88rem'}}>
                    Creation is our nature. Whether we're working with clients
                    or creating innovative apps and sites for ourselves, we're
                    always moving forward into the brightest future we can
                    conceive
                  </Heading.h2>
                  <MainText>
                    We'd like you to take a look into some of the products we
                    are working on and have created in-house...
                  </MainText>
                </TextContainer>
              </Transitions.CSS.FadeIn>
              <ScrollIndicator />
            </ContentContainer>

            <HeroImage>
              <Image
                onLoad={() => setShowScreen(true)}
                src={heroBody.childImageSharp.fluid}
              />
              <div
                style={{
                  opacity: showScreen ? 1 : 0,
                  transition: 'opacity 1s ease 0.5s',
                }}
              >
                <Image src={heroScreen.childImageSharp.fluid} />
              </div>
            </HeroImage>
          </HeroSection>
        </LayoutHeroMobile>
        <HeroImageMobile>
          <Image src={hero.childImageSharp.fluid} />
        </HeroImageMobile>
        <LabsBody>
          <Section narrow>
            {products.map(product => (
              <LabsPreview key={product.excerpt} product={product} />
            ))}
          </Section>
          <Section narrow>
            <LabsPreviewMobile />
          </Section>
        </LabsBody>
      </>
    </Layout>
  )
}

export default LabsPage

export const pageQuery = graphql`
  query LabsPageQuery {
    allContentfulPage(filter: { pageName: { eq: "Labs" } }) {
      edges {
        node {
          seo {
            title
            description
            image {
              file {
                url
              }
            }
          }
        }
      }
    }
    hero: file(name: { regex: "/labs-hero-phone/" }) {
      childImageSharp {
        fluid(maxWidth: 1060, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    heroBody: file(name: { regex: "/labs-floating-phone-body/" }) {
      childImageSharp {
        fluid(maxWidth: 1060, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    heroScreen: file(name: { regex: "/labs-floating-phone-screen/" }) {
      childImageSharp {
        fluid(maxWidth: 1060, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    needlBackground: file(name: { regex: "/labs-needl-desktop/" }) {
      childImageSharp {
        fluid(maxWidth: 793, maxHeight: 381, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    odeeBackground: file(name: { regex: "/labs-odee-desktop/" }) {
      childImageSharp {
        fluid(maxWidth: 793, maxHeight: 381, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    ourSoulAgendaBackground: file(name: { regex: "/labs-osa-desktop/" }) {
      childImageSharp {
        fluid(maxWidth: 793, maxHeight: 381, quality: 100) {
          src
        }
      }
    }
    feyBackground: file(name: { regex: "/labs-fey-desktop/" }) {
      childImageSharp {
        fluid(maxWidth: 793, maxHeight: 381, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    commandlineBackground: file(name: { regex: "/labs-command-desktop/" }) {
      childImageSharp {
        fluid(maxWidth: 793, maxHeight: 381, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    novelaBackground: file(name: { regex: "/labs-novela-desktop/" }) {
      childImageSharp {
        fluid(maxWidth: 793, maxHeight: 381, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    memoirBackground: file(name: { regex: "/labs-memoir-desktop/" }) {
      childImageSharp {
        fluid(maxWidth: 793, maxHeight: 381, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

const HeroSection = styled(Section)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.tablet`
    pointer-events: none;
  `};
`

const HeroImage = styled.div`
  position: relative;
  width: 610px;
  top: -180px;
  right: -40px;
  animation: float 4.8s ease-in-out infinite 1.4s;
  margin-top: 12.5vh;

  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-8px);
    }
    100% {
      transform: translatey(0px);
    }
  }

  ${media.desktop`
    display: none;
  `};
  
  ${media.desktop_small`
    display: none;
  `};

  ${media.tablet`
    display: none;
  `};

  .gatsby-image-wrapper {
    position: absolute !important;
    top: -180px;
    left: 0;
    width: 100%;
  }
`

const HeroImageMobile = styled(HeroImage)`
  display: none;

  ${media.tablet`
    box-shadow: 0px -40px 40px rgba(8, 7, 11, 0.8);
    display: none;
    width: 100%;
    top: 0;
    right: 0;
    margin-bottom: 60px;
  `};

  .gatsby-image-wrapper {
    position: relative !important;
    top: 0;
    left: 0;
    width: 100%;
  }
`

const TextContainer = styled.div`
  max-width: 560px;

  ${media.phablet`
    position: relative;
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

const ContentContainer = styled.div`
  height: calc(100vh - 140px);
  min-height: 440px;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.tablet`
    height: calc(100vh - 90px);
    padding: 0;
    user-select: none;
    pointer-events: none;
  `};
`

const HorizontalRule = styled.hr`
  width: 140px;
  height: 1px;
  border: none;
  margin-bottom: 30px;
  background: ${p => (p.dark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255,255,255,0.1)')};

  ${media.phablet`
    width: 100%;
    margin: 0 auto 25px;
    background: ${p =>
      p.dark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255,255,255,0.1)'};
  `}
`

const LabsBody = styled.div`
  position: relative;
  z-index: 1;
`

const LinkToProduct = styled.a`
  position: relative;
  font-weight: 600;
  font-size: 16px;
  color: ${p => (p.dark ? p.theme.colors.grey : '#fff')};

  svg {
    margin-right: 13px;
  }

  &:nth-child(2) {
    margin-left: 30px;
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -42%;
    width: 120%;
    height: 200%;
    border: 2px solid ${p => p.theme.colors.purple};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${media.tablet`
    display: block;
    margin: 0 auto;
    color: ${p => (p.dark ? '#000' : '#fff')};

    &:nth-child(2) {
      margin: 15px auto 0;
    }

      svg {
        display: none;
      }
  `}
`

const Symbol = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  min-width: 16px;
  text-align: center;
  border-radius: 2.5px;
  padding: 1px 2px;
  color: ${p => p.theme.colors.bg};
  background: ${p => p.theme.colors.moon};
  font-size: 12px;
  font-weight: 400;
  margin-left: 5px;
`

const ODEELogo = () => (
  <svg
    width="152"
    height="41"
    viewBox="0 0 152 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.6919 3.56371C10.0018 1.67229 11.9421 0.703515 13.5128 0.657384C14.2058 0.611252 14.5522 0.841913 14.5522 1.34937C14.5522 1.76456 13.8593 2.71027 12.4734 4.1865C11.2722 5.43207 10.8333 6.12405 11.1567 6.26245L12.1962 6.40084C13.3973 6.40084 16.1461 5.38594 20.4424 3.35612L26.9563 0.449791L30.2132 3.56371C33.4009 6.60844 35.4798 10.299 36.4499 14.6354C37.4663 18.9719 37.2584 23.2622 35.8262 27.5063C34.3941 31.7505 31.9456 35.2796 28.4808 38.0937C26.8177 39.3854 25.4318 40.1927 24.323 40.5156C23.2143 40.8385 21.2047 41 18.2942 41C15.43 41 13.4435 40.8385 12.3348 40.5156C11.226 40.1927 9.84009 39.3854 8.17697 38.0937C5.58991 36.0177 3.58031 33.4343 2.14819 30.3435C0.76226 27.2065 0.0461976 24.0464 0 20.8633C0 17.634 0.646766 14.474 1.9403 11.3831C3.28003 8.24613 5.19723 5.63966 7.6919 3.56371ZM25.1546 7.9924C24.1844 6.93136 23.4222 6.40084 22.8678 6.40084C22.4058 6.40084 22.1286 9.46863 22.0363 15.6042C22.0363 18.0492 22.0132 19.8945 21.967 21.1401C21.9208 22.3857 21.8053 23.6543 21.6205 24.946C21.4357 26.1916 21.2509 27.0911 21.0661 27.6447C20.8813 28.1522 20.4886 28.7288 19.8881 29.3747C19.3337 29.9744 18.7562 30.4357 18.1557 30.7586C17.6013 31.0816 16.7466 31.5198 15.5917 32.0734L10.4638 34.6338L13.097 36.3637C15.8227 38.1167 18.6869 38.5089 21.6898 37.5401C24.6926 36.5713 27.1411 34.4723 29.0352 31.243C30.7907 28.2906 31.2758 24.4616 30.4904 19.7561C29.7051 15.0506 27.9264 11.1294 25.1546 7.9924ZM15.0373 18.5105C15.0373 14.3587 14.9218 11.8444 14.6908 10.9679C14.506 10.0914 13.9517 9.58397 13.0277 9.44557C11.1798 9.16878 9.6784 9.79156 8.52346 11.3139C7.36852 12.8363 6.65245 15.189 6.37527 18.3722C6.05188 21.463 6.19048 24.3463 6.79105 27.0219C7.43781 29.6976 8.26937 31.0354 9.28572 31.0354C10.0249 31.0354 11.1798 30.4357 12.7505 29.2363C13.7669 28.4059 14.3906 27.4371 14.6215 26.33C14.8987 25.2228 15.0373 22.6163 15.0373 18.5105Z"
      fill="white"
    />
    <path
      d="M41.3532 0.934177C41.3532 0.472856 45.1876 0.172996 52.8564 0.0345987C56.2288 -0.0115329 58.862 -0.0115329 60.7561 0.0345987C62.6502 0.0807331 64.4289 0.380593 66.092 0.934177C67.8013 1.48777 69.0024 2.13362 69.6954 2.87173C70.3883 3.60985 71.012 4.90155 71.5664 6.74683C72.1208 8.54599 72.4441 10.4605 72.5365 12.4903C72.6289 14.474 72.6751 17.288 72.6751 20.9325C72.6751 29.3286 73.0216 33.8726 73.7146 34.5646C74.4999 35.3488 74.5692 36.0639 73.9225 36.7097C73.3219 37.3556 72.2362 37.6785 70.6655 37.6785C68.679 37.6785 67.039 38.0475 65.7455 38.7857C65.0987 39.1547 63.5511 39.4546 61.1026 39.6852C58.6542 39.9159 55.813 40.0312 52.5792 40.0312L41.4225 40.2388L44.1943 36.9865C45.0721 36.0639 45.6957 35.2565 46.0653 34.5646C46.4349 33.8264 46.689 33.0191 46.8276 32.1426C46.9662 31.22 47.0355 29.8821 47.0355 28.1291C47.0355 25.315 46.92 23.6774 46.689 23.216C46.5042 22.7547 45.765 22.5933 44.4715 22.7316C43.8247 22.7778 43.2935 22.7778 42.8777 22.7316C42.5081 22.6394 42.2078 22.4779 41.9768 22.2473C41.792 22.0166 41.6534 21.6937 41.561 21.2785C41.3301 20.2174 41.5841 19.2256 42.3233 18.303C43.1087 17.3342 44.0557 16.8498 45.1645 16.8498C45.9036 16.8498 46.5042 16.0425 46.9662 14.4278C47.4281 12.8132 47.5898 11.1063 47.4512 9.30717C47.3588 7.50802 46.9662 6.37778 46.2732 5.91646C45.1183 5.13221 44.0095 4.20956 42.947 3.14852C41.8844 2.08748 41.3532 1.34937 41.3532 0.934177ZM64.4982 7.92321C63.6666 7.0467 62.0497 6.56231 59.6474 6.47004C57.2451 6.37778 55.6513 6.72377 54.866 7.50802C54.0806 8.29226 53.6879 13.1361 53.6879 22.0397V35.3949H66.0227V22.3857C66.0227 17.0804 65.9303 13.4821 65.7455 11.5907C65.5607 9.6993 65.1449 8.47679 64.4982 7.92321Z"
      fill="white"
    />
    <path
      d="M80.3042 0.934177C81.182 0.426724 85.2474 0.242195 92.5004 0.38059C99.7996 0.472856 105.159 0.795781 108.577 1.34937L113.22 2.11055C111.649 4.0481 110.032 5.96259 108.369 7.85401L105.667 5.84726C103.495 4.23263 101.763 3.33305 100.469 3.14852C99.2221 2.96399 97.9055 3.44838 96.5196 4.60169C95.3646 5.43207 94.6486 6.30858 94.3714 7.23122C94.0942 8.10774 93.9556 9.90689 93.9556 12.6287C93.9556 15.8579 94.0711 17.7263 94.3021 18.2338C94.5793 18.6951 95.4108 18.5336 96.7968 17.7494C97.3049 17.5187 98.1365 17.3803 99.2914 17.3342C100.493 17.2419 101.694 17.265 102.895 17.4034C104.974 17.6802 106.129 17.957 106.36 18.2338C106.637 18.4644 106.406 19.1333 105.667 20.2405C105.02 21.2093 104.373 21.7859 103.726 21.9705C103.126 22.155 101.925 22.1089 100.123 21.8321C99.3838 21.7398 98.7602 21.6937 98.252 21.6937C97.79 21.6937 97.328 21.7398 96.8661 21.8321C96.4503 21.8782 96.1038 22.0397 95.8266 22.3165C95.5494 22.5932 95.2722 22.9162 94.9951 23.2852C94.7641 23.6082 94.5562 24.1156 94.3714 24.8076C94.2328 25.4534 94.0942 26.1685 93.9556 26.9527C93.817 27.6909 93.6553 28.6366 93.4705 29.7899L92.8469 34.7722L100.331 34.8414C106.983 34.8875 110.725 35.1412 111.557 35.6025C112.25 36.0177 112.134 36.9173 111.21 38.3013C111.072 38.5319 110.864 38.8318 110.587 39.2008C109.986 40.0774 109.339 40.5848 108.646 40.7232C107.953 40.8616 106.475 40.7232 104.211 40.308C101.07 39.8006 96.2424 39.7083 89.7285 40.0312L80.2349 40.7232L83.3533 37.4709C84.7392 35.9947 85.5938 34.7722 85.9172 33.8034C86.2406 32.8346 86.4023 31.0354 86.4023 28.4059C86.4023 24.4847 85.9865 22.4779 85.155 22.3857C84.8778 22.3395 84.5775 22.7086 84.2541 23.4928L84.1848 23.6312C84.0462 24.0925 83.8152 24.3001 83.4919 24.254C83.1685 24.1617 82.6834 23.8388 82.0366 23.2852C81.2975 22.5932 80.8817 22.0166 80.7893 21.5553C80.7431 21.0478 80.951 20.2636 81.413 19.2025C81.6902 18.5567 82.1059 18.0031 82.6603 17.5418C83.2609 17.0805 83.7921 16.8498 84.2541 16.8498C84.8085 16.8498 85.2243 16.7114 85.5014 16.4346C85.7786 16.1117 85.9865 15.5812 86.1251 14.843C86.3099 14.1049 86.4947 12.9747 86.6795 11.4523C87.0029 7.80788 87.026 5.75499 86.7488 5.29367C86.4254 4.74008 85.4784 4.48636 83.9076 4.53249C82.3831 4.57862 81.4592 4.87848 81.1358 5.43207C80.6276 6.30858 80.0963 6.58537 79.542 6.26245C79.0338 5.93952 78.7797 5.20141 78.7797 4.0481C78.7797 3.40225 78.9183 2.77947 79.1955 2.17975C79.5189 1.58003 79.8884 1.16484 80.3042 0.934177Z"
      fill="white"
    />
    <path
      d="M119.084 0.934177C119.962 0.426724 124.027 0.242195 131.28 0.38059C138.58 0.472856 143.939 0.795781 147.357 1.34937L152 2.11055C150.429 4.0481 148.812 5.96259 147.149 7.85401L144.447 5.84726C142.275 4.23263 140.543 3.33305 139.249 3.14852C138.002 2.96399 136.685 3.44838 135.3 4.60169C134.145 5.43207 133.429 6.30858 133.151 7.23122C132.874 8.10774 132.736 9.90689 132.736 12.6287C132.736 15.8579 132.851 17.7263 133.082 18.2338C133.359 18.6951 134.191 18.5336 135.577 17.7494C136.085 17.5187 136.916 17.3803 138.071 17.3342C139.273 17.2419 140.474 17.265 141.675 17.4034C143.754 17.6802 144.909 17.957 145.14 18.2338C145.417 18.4644 145.186 19.1333 144.447 20.2405C143.8 21.2093 143.153 21.7859 142.506 21.9705C141.906 22.155 140.705 22.1089 138.903 21.8321C138.164 21.7398 137.54 21.6937 137.032 21.6937C136.57 21.6937 136.108 21.7398 135.646 21.8321C135.23 21.8782 134.884 22.0397 134.607 22.3165C134.329 22.5932 134.052 22.9162 133.775 23.2852C133.544 23.6082 133.336 24.1156 133.151 24.8076C133.013 25.4534 132.874 26.1685 132.736 26.9527C132.597 27.6909 132.435 28.6366 132.251 29.7899L131.627 34.7722L139.111 34.8414C145.763 34.8875 149.505 35.1412 150.337 35.6025C151.03 36.0177 150.914 36.9173 149.99 38.3013C149.852 38.5319 149.644 38.8318 149.367 39.2008C148.766 40.0774 148.119 40.5848 147.426 40.7232C146.733 40.8616 145.255 40.7232 142.991 40.308C139.85 39.8006 135.022 39.7083 128.509 40.0312L119.015 40.7232L122.133 37.4709C123.519 35.9947 124.374 34.7722 124.697 33.8034C125.021 32.8346 125.182 31.0354 125.182 28.4059C125.182 24.4847 124.767 22.4779 123.935 22.3857C123.658 22.3395 123.357 22.7086 123.034 23.4928L122.965 23.6312C122.826 24.0925 122.595 24.3001 122.272 24.254C121.948 24.1617 121.463 23.8388 120.817 23.2852C120.077 22.5932 119.662 22.0166 119.569 21.5553C119.523 21.0478 119.731 20.2636 120.193 19.2025C120.47 18.5567 120.886 18.0031 121.44 17.5418C122.041 17.0805 122.572 16.8498 123.034 16.8498C123.588 16.8498 124.004 16.7114 124.281 16.4346C124.559 16.1117 124.767 15.5812 124.905 14.843C125.09 14.1049 125.275 12.9747 125.459 11.4523C125.783 7.80788 125.806 5.75499 125.529 5.29367C125.205 4.74008 124.258 4.48636 122.688 4.53249C121.163 4.57862 120.239 4.87848 119.916 5.43207C119.408 6.30858 118.876 6.58537 118.322 6.26245C117.814 5.93952 117.56 5.20141 117.56 4.0481C117.56 3.40225 117.698 2.77947 117.975 2.17975C118.299 1.58003 118.668 1.16484 119.084 0.934177Z"
      fill="white"
    />
  </svg>
)

const NeedlLogo = () => (
  <svg
    width="141"
    height="21"
    viewBox="0 0 141 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.56191 10.7528H7.55691C11.5889 10.7528 12.7439 8.52681 12.7439 6.21681C12.7439 3.17181 10.8329 1.76481 7.51491 1.76481H0.836914V2.77281C1.92891 2.79381 2.26491 3.08781 2.26491 4.28481V13.9028C2.26491 15.0998 1.92891 15.3938 0.836914 15.3938V16.3598H7.34691V15.3938C5.91891 15.3938 5.56191 15.0788 5.56191 13.8818V10.7528ZM9.23691 6.25881C9.23691 8.52681 8.62791 9.19881 6.96891 9.19881H5.56191V3.25581H6.80091C8.62791 3.25581 9.23691 4.05381 9.23691 6.25881Z"
      fill="#FAFAFA"
    />
    <path
      d="M18.39 8.08581C18.348 6.69981 17.886 5.67081 17.739 5.39781H17.424L14.043 6.23781V7.16181C15.093 7.20381 15.303 7.41381 15.303 8.94681V13.9448C15.303 15.1418 15.072 15.3938 14.022 15.4148V16.3598H20.091V15.4148C18.663 15.3938 18.432 15.1418 18.432 13.9448V10.6688C18.432 9.03081 18.852 8.52681 20.448 8.52681C20.952 8.52681 21.225 8.58981 21.603 8.69481L22.191 5.52381C22.023 5.46081 21.729 5.39781 21.414 5.39781C20.259 5.39781 18.915 6.27981 18.39 8.08581Z"
      fill="#FAFAFA"
    />
    <path
      d="M33.4307 10.8578C33.4307 7.18281 31.2467 5.39781 28.2017 5.39781C24.8627 5.39781 22.7627 7.64481 22.7627 11.0468C22.7627 14.5748 24.7367 16.6328 28.0337 16.6328C30.9527 16.6328 33.4307 14.8478 33.4307 10.8578ZM30.0077 10.7738C30.0077 14.0078 29.3777 15.3308 28.1387 15.3308C26.6267 15.3308 26.1857 14.0288 26.1857 11.0888C26.1857 7.77081 26.7737 6.74181 28.0967 6.74181C29.3567 6.74181 30.0077 7.72881 30.0077 10.7738Z"
      fill="#FAFAFA"
    />
    <path
      d="M35.9743 16.0238C35.9743 18.1868 35.5753 19.1738 34.2943 19.7618L34.9033 20.6858C36.8353 20.2238 39.0823 19.1528 39.0823 16.0238V5.50281H38.6203L34.6933 6.23781V7.16181C35.7433 7.20381 35.9743 7.41381 35.9743 8.94681V16.0238ZM39.2713 2.70981C39.2713 1.70181 38.4733 0.882812 37.4443 0.882812C36.3943 0.882812 35.5333 1.70181 35.5333 2.70981C35.5333 3.73881 36.3733 4.55781 37.3813 4.55781C38.4313 4.55781 39.2713 3.73881 39.2713 2.70981Z"
      fill="#FAFAFA"
    />
    <path
      d="M47.0471 14.8058C45.0311 14.8058 44.2331 13.8398 44.1491 11.4668H50.5331V10.5638C50.5331 7.35081 49.1891 5.39781 45.8921 5.39781C42.8471 5.39781 40.7891 7.43481 40.7891 10.9838C40.7891 14.5538 42.7001 16.6118 45.9551 16.6118C47.8241 16.6118 49.2101 16.0448 50.3441 14.9318L49.8401 14.0708C48.9371 14.5538 47.9291 14.8058 47.0471 14.8058ZM45.9131 6.69981C47.0051 6.69981 47.4251 7.49781 47.4251 10.0388H44.1701C44.3171 7.47681 44.8421 6.69981 45.9131 6.69981Z"
      fill="#FAFAFA"
    />
    <path
      d="M60.7453 6.25881C60.0103 5.77581 58.9603 5.41881 57.3013 5.41881C54.3823 5.41881 51.9043 7.41381 51.9043 11.1938C51.9043 14.8688 54.2143 16.6118 57.0283 16.6118C58.6243 16.6118 60.0523 16.0448 61.0183 14.9108L60.4513 14.1128C59.5693 14.6378 58.9603 14.8688 57.9733 14.8688C56.3983 14.8688 55.1383 13.8608 55.1383 10.7108C55.1383 7.49781 56.3143 6.72081 57.3013 6.72081C58.1623 6.72081 58.3303 7.26681 58.4143 8.56881H60.7453V6.25881Z"
      fill="#FAFAFA"
    />
    <path
      d="M68.8113 5.67081H66.2703C66.2703 4.59981 66.3543 3.33981 66.4593 2.58381L64.2753 2.85681C63.7503 3.65481 63.4353 4.68381 63.3093 5.62881L61.9023 6.19581V7.26681H63.1623V13.6088C63.1623 15.9188 64.2333 16.6328 66.1443 16.6328C67.2993 16.6328 68.2023 16.3808 69.0003 15.8768L68.6853 14.7848C68.2023 14.9738 67.8663 15.0368 67.4883 15.0368C66.4383 15.0368 66.2913 14.4698 66.2913 12.9158V7.26681H68.4753L68.8113 5.67081Z"
      fill="#FAFAFA"
    />
    <path
      d="M85.0445 8.35881C85.0445 9.57681 85.1705 11.0048 85.2335 11.4878H85.1285C84.8975 10.8788 84.3935 9.78681 83.7425 8.75781L79.2905 1.76481H74.4395V2.77281C75.5315 2.79381 75.8675 3.08781 75.8675 4.28481V13.9028C75.8675 15.0998 75.5315 15.3938 74.4395 15.3938V16.3598H79.1225V15.3938C78.0095 15.3938 77.6735 15.0998 77.6735 13.9028V8.46381C77.6735 7.11981 77.5475 5.73381 77.4845 5.25081H77.5685C77.7785 5.71281 78.3245 6.84681 79.3115 8.37981L84.4565 16.3598H86.8084V4.28481C86.8084 3.08781 87.1235 2.79381 88.2155 2.77281V1.76481H83.5955V2.77281C84.7085 2.79381 85.0445 3.08781 85.0445 4.28481V8.35881Z"
      fill="#FAFAFA"
    />
    <path
      d="M95.507 14.8058C93.491 14.8058 92.693 13.8398 92.609 11.4668H98.993V10.5638C98.993 7.35081 97.649 5.39781 94.352 5.39781C91.307 5.39781 89.249 7.43481 89.249 10.9838C89.249 14.5538 91.16 16.6118 94.415 16.6118C96.284 16.6118 97.67 16.0448 98.804 14.9318L98.3 14.0708C97.397 14.5538 96.3891 14.8058 95.507 14.8058ZM94.373 6.69981C95.465 6.69981 95.885 7.49781 95.885 10.0388H92.63C92.777 7.47681 93.302 6.69981 94.373 6.69981Z"
      fill="#FAFAFA"
    />
    <path
      d="M106.622 14.8058C104.606 14.8058 103.808 13.8398 103.724 11.4668H110.108V10.5638C110.108 7.35081 108.764 5.39781 105.467 5.39781C102.422 5.39781 100.364 7.43481 100.364 10.9838C100.364 14.5538 102.275 16.6118 105.53 16.6118C107.399 16.6118 108.785 16.0448 109.919 14.9318L109.415 14.0708C108.512 14.5538 107.504 14.8058 106.622 14.8058ZM105.488 6.69981C106.58 6.69981 107 7.49781 107 10.0388H103.745C103.892 7.47681 104.417 6.69981 105.488 6.69981Z"
      fill="#FAFAFA"
    />
    <path
      d="M118.956 14.9318C119.019 15.8138 119.376 16.4648 119.523 16.6328H119.838L123.24 15.8768V15.0158C122.127 14.9318 121.896 14.7638 121.896 13.2308V0.945813H121.35L117.444 1.51281V2.43681C118.473 2.47881 118.788 2.68881 118.788 4.22181V6.44781C118.263 5.79681 117.339 5.41881 116.289 5.41881C113.538 5.41881 111.48 7.14081 111.48 11.0888C111.48 14.9318 113.244 16.6118 115.701 16.6118C117.129 16.6118 118.368 15.9188 118.956 14.9318ZM114.882 10.8578C114.882 7.91781 115.722 7.18281 116.982 7.18281C117.654 7.18281 118.305 7.39281 118.788 7.95981V13.7978C118.2 14.3858 117.549 14.6798 116.856 14.6798C115.596 14.6798 114.882 13.8188 114.882 10.8578Z"
      fill="#FAFAFA"
    />
    <path
      d="M128.433 3.02481C128.433 1.76481 128.16 1.15581 128.055 0.945813H127.74L123.939 1.51281V2.43681C125.01 2.47881 125.325 2.68881 125.325 4.22181V13.9448C125.325 15.1418 125.094 15.3938 124.023 15.4148V16.3598H129.735V15.4148C128.643 15.3938 128.433 15.1208 128.433 13.9238V3.02481Z"
      fill="#FAFAFA"
    />
    <path
      d="M137.117 14.8058C135.101 14.8058 134.303 13.8398 134.219 11.4668H140.603V10.5638C140.603 7.35081 139.259 5.39781 135.962 5.39781C132.917 5.39781 130.859 7.43481 130.859 10.9838C130.859 14.5538 132.77 16.6118 136.025 16.6118C137.894 16.6118 139.28 16.0448 140.414 14.9318L139.91 14.0708C139.007 14.5538 137.999 14.8058 137.117 14.8058ZM135.983 6.69981C137.075 6.69981 137.495 7.49781 137.495 10.0388H134.24C134.387 7.47681 134.912 6.69981 135.983 6.69981Z"
      fill="#FAFAFA"
    />
  </svg>
)

const OSALogo = () => (
  <svg
    width="312"
    height="47"
    viewBox="0 0 312 47"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.6323 4.96409C16.101 2.86412 17.8787 1.13574 19.9566 0C16.8597 0.49426 13.9623 1.58483 11.3863 3.15001C12.4476 3.85008 13.5316 4.45469 14.6323 4.96409Z"
      fill="#FEC502"
    />
    <path
      d="M32.8633 5.01596C33.9925 4.51023 35.1073 3.90892 36.2016 3.21226C33.8707 1.7799 31.2734 0.737301 28.5012 0.17578C30.1473 1.30956 31.6192 3.01463 32.8633 5.01596Z"
      fill="#FEC502"
    />
    <path
      d="M10.8163 13.261C11.4251 11.1511 12.2123 9.15645 13.1718 7.35628C13.2798 7.15365 13.3902 6.95309 13.5029 6.75497C12.1438 6.10861 10.8101 5.32883 9.51136 4.41489C7.14052 6.18332 5.11115 8.38265 3.53964 10.8964C6.04948 11.857 8.4632 12.6445 10.8163 13.261Z"
      fill="#FEC502"
    />
    <path
      d="M36.3795 13.1746C38.7907 12.5489 41.2803 11.7565 43.8837 10.7968C42.3442 8.36104 40.3734 6.22397 38.0783 4.49253C36.7172 5.4166 35.3214 6.20309 33.9017 6.85116C34.8804 8.74849 35.7183 10.89 36.3795 13.1746Z"
      fill="#FEC502"
    />
    <path
      d="M34.4306 13.6479C31.0986 14.4002 27.9027 14.8239 24.745 14.9217V9.0937C27.1969 8.98921 29.646 8.49532 32.0419 7.61617C32.9779 9.40315 33.7884 11.4476 34.4306 13.6479Z"
      fill="#FEC502"
    />
    <path
      d="M37.3252 32.1428C39.7228 32.7629 42.2067 33.5471 44.8128 34.4991C45.8771 32.4814 46.659 30.2923 47.106 27.9839C46.7377 27.8737 45.9521 27.6794 45.021 27.4492L45.0204 27.4491C44.454 27.309 43.8338 27.1557 43.221 26.9999C43.8394 24.6619 43.7187 22.362 43.5312 20.3416C43.3515 18.4054 43.1075 16.3584 41.9536 13.7025C40.2362 14.2773 38.5589 14.7788 36.9118 15.2063C37.304 16.8732 37.6027 18.5968 37.7953 20.3416C38.2279 24.261 38.1297 28.3312 37.3252 32.1428Z"
      fill="#FEC502"
    />
    <path
      d="M32.0515 39.8193C32.8111 38.7091 33.4522 37.5058 33.984 36.2308C34.3232 35.4173 34.6178 34.5748 34.8696 33.7094C31.3364 32.9156 28.0077 32.5089 24.745 32.4644V37.8344C27.0725 38.014 29.4508 38.6806 32.0515 39.8193Z"
      fill="#FEC502"
    />
    <path
      d="M24.745 39.9414C26.5978 40.1047 28.541 40.6231 30.716 41.5325C29.1332 43.3159 27.1602 44.7677 24.745 45.7669V39.9414Z"
      fill="#FEC502"
    />
    <path
      d="M15.1542 39.8083C17.7693 38.6028 20.2237 37.9122 22.7411 37.8008V32.4827C19.3854 32.5898 16.0513 33.0803 12.5847 33.9398C13.0093 35.3997 13.5398 36.7861 14.1786 38.0679C14.4803 38.6735 14.8054 39.2544 15.1542 39.8083Z"
      fill="#FEC502"
    />
    <path
      d="M12.3843 38.9585C12.6839 39.5596 13.0067 40.1425 13.3532 40.7041C12.3237 41.2514 10.9334 42.031 9.82991 42.7202C7.21885 40.9884 5.72959 39.2809 3.98086 36.6847C6.28657 35.8067 8.49714 35.0621 10.6477 34.454C11.1056 36.0374 11.6827 37.5505 12.3843 38.9585Z"
      fill="#FEC502"
    />
    <path
      d="M14.5581 42.444C13.6829 42.9021 12.7723 43.4227 11.8165 44.0069C14.2461 45.4141 16.948 46.4044 19.8242 46.8801C17.7437 45.8189 15.9941 44.2916 14.5581 42.444Z"
      fill="#FEC502"
    />
    <path
      d="M22.7411 39.9031C20.7008 40.0066 18.6555 40.5495 16.404 41.5486C18.0883 43.603 20.194 45.1245 22.7411 45.9115V39.9031Z"
      fill="#FEC502"
    />
    <path
      d="M35.6514 44.0173C34.585 43.4058 33.5757 42.866 32.6133 42.3954C31.0704 44.2526 29.1634 45.8267 26.8503 47C30.023 46.587 32.9992 45.5504 35.6514 44.0173Z"
      fill="#FEC502"
    />
    <path
      d="M33.885 40.6805C34.758 41.1167 35.7978 41.732 36.7869 42.3174C37.0354 42.4646 37.2809 42.6098 37.5196 42.7498C40.2504 40.9409 41.9501 39.0884 43.7322 36.3414C41.3208 35.4711 39.027 34.7531 36.8189 34.1812C36.5416 35.1456 36.2143 36.0873 35.8339 36.9993C35.2943 38.2931 34.6473 39.5275 33.885 40.6805Z"
      fill="#FEC502"
    />
    <path
      d="M24.745 30.3642C28.1829 30.4089 31.6702 30.8372 35.3436 31.6633C35.4242 31.3407 35.4981 31.0143 35.5653 30.684C36.1308 27.4224 36.1781 23.9547 35.8035 20.5606C35.6198 18.8964 35.3356 17.2586 34.9649 15.6803C33.559 15.9995 32.1726 16.263 30.7996 16.4705C31.4447 20.1377 31.5756 22.2888 31.0048 26.0374L30.9685 26.2755L30.7288 26.2483C29.6162 26.1219 29.0455 26.1376 28.029 26.2484L27.7514 26.2787V16.8406C26.7455 16.9323 25.7442 16.9931 24.745 17.0226V30.3642Z"
      fill="#FEC502"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.2325 15.8003C11.7023 18.1475 11.3902 20.6203 11.3123 23.1071C11.2183 26.1105 11.4668 29.1073 12.0707 31.9034C15.063 31.1612 17.9806 30.6792 20.91 30.4739C21.4863 30.4073 22.0928 30.3413 22.7411 30.2743V17.0401C19.4939 17.0001 16.2634 16.6286 12.9592 15.9276C12.7226 15.8865 12.4807 15.8441 12.2325 15.8003ZM15.7496 21.7098C15.6099 23.481 15.5582 25.2081 16.0518 27.059L16.2962 26.9906C16.6104 26.9026 16.8467 26.8396 17.156 26.7994C17.4672 26.7588 17.8594 26.7405 18.4791 26.7499L18.7334 26.7536V21.7121L18.4478 21.7523C17.4893 21.8875 16.6993 21.863 15.7496 21.7098Z"
      fill="#FEC502"
    />
    <path
      d="M9.2391 24.2449C9.26658 24.2452 9.2892 24.2676 9.28917 24.295C9.2865 26.7718 9.50746 29.2477 9.9675 31.6203C10.0189 31.8939 10.0738 32.1604 10.1319 32.4173C7.78036 33.0798 5.37264 33.8972 2.86848 34.8615C2.33951 33.8996 1.8753 32.8971 1.48178 31.8599C1.21796 31.069 1.00374 30.2646 0.794818 29.3838C0.784329 29.3396 0.821457 29.2986 0.866585 29.3047C1.10959 29.3371 1.33303 29.3694 1.54415 29.4001C2.61225 29.5549 3.36425 29.6639 4.7364 29.498L5.00426 29.4657L4.95209 29.2015C4.7413 28.1345 4.67225 27.551 4.70699 26.5082L4.71549 26.2536L4.4603 26.2499C2.83763 26.2264 1.87469 26.1319 0.212195 25.7984C0.17406 25.7908 0.143229 25.7617 0.1348 25.7238C0.00354325 25.1337 -0.0297862 24.2545 0.025781 23.2005C0.0877902 22.0257 0.258407 20.6615 0.507362 19.2946C0.756316 17.9278 1.08269 16.5633 1.45456 15.3877C1.7983 14.3011 2.17568 13.3931 2.55752 12.793L2.84781 12.8808C5.40322 13.8566 7.87344 14.6615 10.2925 15.2948C9.98713 16.6357 9.75047 18.011 9.58383 19.4021C8.06882 19.0381 7.17959 18.7711 5.79503 18.2652L5.54901 18.1753L5.47012 18.4246C4.82428 20.4643 4.6182 21.6458 4.70711 23.7604L4.71616 23.9746L4.92965 23.9983C6.35128 24.1563 7.33161 24.2208 9.2391 24.2449Z"
      fill="#FEC502"
    />
    <path
      d="M22.7411 14.9399C19.4495 14.8975 16.1613 14.4986 12.7649 13.7355C13.3344 11.7797 14.0632 9.94245 14.941 8.29549C15.0764 8.04134 15.215 7.79232 15.3569 7.54842C17.772 8.46932 20.251 8.9825 22.7411 9.09224V14.9399Z"
      fill="#FEC502"
    />
    <path
      d="M24.745 6.99166C26.8329 6.89413 28.9196 6.48617 30.9705 5.76974C29.0493 2.78661 26.8746 1.04357 24.745 0.739376V6.99166Z"
      fill="#FEC502"
    />
    <path
      d="M22.7411 0.976802V6.98983C20.651 6.88815 18.5709 6.4736 16.5355 5.74435C18.2587 3.40025 20.3472 1.73046 22.7411 0.976802Z"
      fill="#FEC502"
    />
    <path
      d="M44.6916 26.5705C44.5488 26.5436 44.3779 26.5115 44.0398 26.4489C44.1966 25.5118 44.2855 24.5866 44.3217 23.6876L47.4653 24.0362C47.4526 25.2105 47.3481 26.2418 47.1608 27.0219C45.2166 26.6691 45.0348 26.6349 44.6922 26.5706L44.6916 26.5705Z"
      fill="#FEC502"
    />
    <path
      d="M47.4459 22.7841L44.3392 22.4396C44.2859 17.8758 42.9782 14.217 42.587 13.522C43.2073 13.295 43.4607 13.194 43.65 13.1186C43.9192 13.0113 44.0591 12.9556 44.9416 12.662C46.5306 15.4706 47.3123 19.4897 47.4459 22.7841Z"
      fill="#FEC502"
    />
    <path
      d="M76.6613 19.5019C76.068 18.3548 75.1978 17.2473 73.8925 16.3771C72.5872 15.5464 70.8468 14.9927 68.5526 14.9927C66.2585 14.9927 64.5181 15.5464 63.2128 16.3771C61.235 17.6428 60.2462 19.5414 59.7715 21.1632C59.2969 22.7849 59.2969 24.0902 59.2969 24.2484C59.2969 24.4857 59.2969 26.7404 60.444 28.995C61.0373 30.142 61.9075 31.2891 63.2128 32.1198C64.5181 32.9504 66.2585 33.5042 68.5526 33.5042C70.8468 33.5042 72.5872 32.9504 73.8925 32.1198C75.8702 30.854 76.8591 28.9554 77.3337 27.3337C77.8084 25.7515 77.8084 24.4066 77.8084 24.2484C77.8084 24.0507 77.8084 21.7565 76.6613 19.5019ZM72.5872 26.7404C72.3103 27.2941 71.8752 27.8083 71.2423 28.2039C70.6094 28.5994 69.7393 28.8763 68.5526 28.8763C67.366 28.8763 66.4958 28.5994 65.8629 28.2039C64.9136 27.6106 64.3994 26.7008 64.1621 25.9097C63.9247 25.0791 63.9247 24.3671 63.9247 24.2484C63.9247 24.0902 63.9247 22.9036 64.5181 21.7565C64.7949 21.2027 65.23 20.6885 65.8629 20.293C66.4958 19.8974 67.366 19.6206 68.5526 19.6206C69.7393 19.6206 70.6094 19.8974 71.2423 20.293C72.1916 20.8863 72.7058 21.796 72.9432 22.6267C73.1805 23.4178 73.1805 24.1298 73.1805 24.2484C73.1805 24.4066 73.1805 25.6328 72.5872 26.7404Z"
      fill="white"
    />
    <path
      d="M93.48 15.3487L93.124 14.9531H89.2476L88.8521 15.3487V26.9381C88.8521 27.3337 88.8521 27.8083 88.6543 28.2039C88.5357 28.3621 88.3774 28.5203 88.1006 28.639C87.8632 28.7576 87.4677 28.8763 86.9535 28.8763C86.3997 28.8763 86.0437 28.7576 85.7668 28.639C85.5295 28.5203 85.3713 28.4016 85.2526 28.2039C85.2131 28.1643 85.1735 28.0852 85.1735 28.0061C85.134 27.9665 85.134 27.927 85.134 27.8874C85.0944 27.8083 85.0549 27.7292 85.0549 27.6501C85.0153 27.4128 85.0153 27.1359 85.0153 26.9381V15.3487L84.6198 14.9531H80.7434L80.3874 15.3487V26.9381C80.3874 27.4128 80.3874 28.995 81.1785 30.498C81.6136 31.2496 82.2465 32.0407 83.1562 32.5944C83.9869 33.0691 85.0153 33.3855 86.3206 33.4646C86.5184 33.5042 86.7161 33.5042 86.9535 33.5042C87.1512 33.5042 87.349 33.5042 87.5468 33.4646C88.8521 33.3855 89.8805 33.0691 90.7111 32.5944C92.0956 31.7242 92.8075 30.4585 93.1635 29.3509C93.4404 28.4016 93.48 27.5314 93.48 27.0963V15.3487Z"
      fill="white"
    />
    <path
      d="M105.985 25.8306C106.262 25.7515 106.539 25.6328 106.856 25.4746C107.449 25.1582 108.082 24.644 108.556 23.8529C109.031 23.0618 109.347 22.0729 109.347 20.7676C109.347 19.4228 109.031 18.3944 108.556 17.6033C107.884 16.3771 106.816 15.7442 105.946 15.3882C105.076 15.0322 104.403 14.9531 104.364 14.9531H97.0065L96.6109 15.3487V33.1086L97.0065 33.5042H100.843L101.239 33.1086V26.503L105.155 33.3064L105.511 33.5042H109.743L110.059 32.9108L105.985 25.8306ZM104.482 21.6378C104.285 21.9543 103.968 22.1125 103.691 22.1916C103.533 22.2311 103.414 22.2707 103.296 22.2707L103.217 22.3103H101.239V18.8295H103.177C103.177 18.8295 103.612 18.8295 103.968 19.0668C104.166 19.1855 104.324 19.3832 104.482 19.6206C104.64 19.8974 104.72 20.2534 104.72 20.7676C104.72 21.1632 104.64 21.4401 104.482 21.6378Z"
      fill="white"
    />
    <path
      d="M138.703 25.1582C137.556 23.8529 135.895 22.9827 134.55 22.1916C133.877 21.796 133.284 21.4401 132.889 21.0445C132.493 20.6885 132.295 20.3325 132.295 19.9765C132.295 19.937 132.335 19.6206 132.533 19.3437C132.691 19.1063 133.047 18.8295 133.838 18.8295C134.273 18.8295 134.55 18.9086 134.787 19.0272C135.104 19.1855 135.222 19.4228 135.301 19.6206C135.341 19.7392 135.38 19.8183 135.38 19.8974V19.9765L135.776 20.3721H139.613L140.008 19.9765C140.008 18.7504 139.613 17.7615 139.019 17.0495C138.11 15.9815 136.804 15.4673 135.776 15.23C134.708 14.9531 133.877 14.9531 133.838 14.9531C133.838 14.9531 132.335 14.9531 130.792 15.586C130.041 15.8629 129.25 16.3375 128.656 17.0495C128.063 17.7615 127.667 18.7504 127.667 19.9765C127.667 21.3214 128.182 22.4289 128.973 23.2991C130.12 24.6044 131.781 25.4746 133.126 26.2657C133.798 26.6612 134.392 27.0172 134.787 27.4128C135.183 27.7688 135.38 28.1248 135.38 28.4807C135.38 28.5203 135.341 28.8367 135.183 29.0741C134.985 29.3509 134.669 29.6278 133.838 29.6278C133.403 29.6278 133.126 29.5487 132.928 29.4301C132.612 29.2718 132.453 29.0345 132.374 28.8367C132.335 28.7181 132.295 28.639 132.295 28.5599V28.4807L131.9 28.0852H128.063L127.667 28.4807C127.667 29.7069 128.063 30.6562 128.656 31.4078C129.566 32.4757 130.871 32.99 131.939 33.2273C132.968 33.5042 133.838 33.5042 133.838 33.5042C133.877 33.5042 135.341 33.5042 136.884 32.8713C137.635 32.5944 138.426 32.1198 139.019 31.4078C139.613 30.6562 140.008 29.7069 140.008 28.4807C140.008 27.0963 139.494 26.0284 138.703 25.1582Z"
      fill="white"
    />
    <path
      d="M159.556 19.5019C158.962 18.3548 158.092 17.2473 156.787 16.3771C155.482 15.5464 153.741 14.9927 151.447 14.9927C149.153 14.9927 147.412 15.5464 146.107 16.3771C144.129 17.6428 143.141 19.5414 142.666 21.1632C142.191 22.7849 142.191 24.0902 142.191 24.2484C142.191 24.4857 142.191 26.7404 143.338 28.995C143.932 30.142 144.802 31.2891 146.107 32.1198C147.412 32.9504 149.153 33.5042 151.447 33.5042C153.741 33.5042 155.482 32.9504 156.787 32.1198C158.765 30.854 159.753 28.9554 160.228 27.3337C160.703 25.7515 160.703 24.4066 160.703 24.2484C160.703 24.0507 160.703 21.7565 159.556 19.5019ZM155.482 26.7404C155.205 27.2941 154.77 27.8083 154.137 28.2039C153.504 28.5994 152.634 28.8763 151.447 28.8763C150.26 28.8763 149.39 28.5994 148.757 28.2039C147.808 27.6106 147.294 26.7008 147.056 25.9097C146.819 25.0791 146.819 24.3671 146.819 24.2484C146.819 24.0902 146.819 22.9036 147.412 21.7565C147.689 21.2027 148.124 20.6885 148.757 20.293C149.39 19.8974 150.26 19.6206 151.447 19.6206C152.634 19.6206 153.504 19.8974 154.137 20.293C155.086 20.8863 155.6 21.796 155.838 22.6267C156.075 23.4178 156.075 24.1298 156.075 24.2484C156.075 24.4066 156.075 25.6328 155.482 26.7404Z"
      fill="white"
    />
    <path
      d="M176.374 15.3487L176.018 14.9531H172.142L171.746 15.3487V26.9381C171.746 27.3337 171.746 27.8083 171.549 28.2039C171.43 28.3621 171.272 28.5203 170.995 28.639C170.758 28.7576 170.362 28.8763 169.848 28.8763C169.294 28.8763 168.938 28.7576 168.661 28.639C168.424 28.5203 168.266 28.4016 168.147 28.2039C168.107 28.1643 168.068 28.0852 168.068 28.0061C168.028 27.9665 168.028 27.927 168.028 27.8874C167.989 27.8083 167.949 27.7292 167.949 27.6501C167.91 27.4128 167.91 27.1359 167.91 26.9381V15.3487L167.514 14.9531H163.638L163.282 15.3487V26.9381C163.282 27.4128 163.282 28.995 164.073 30.498C164.508 31.2496 165.141 32.0407 166.051 32.5944C166.881 33.0691 167.91 33.3855 169.215 33.4646C169.413 33.5042 169.611 33.5042 169.848 33.5042C170.046 33.5042 170.243 33.5042 170.441 33.4646C171.746 33.3855 172.775 33.0691 173.606 32.5944C174.99 31.7242 175.702 30.4585 176.058 29.3509C176.335 28.4016 176.374 27.5314 176.374 27.0963V15.3487Z"
      fill="white"
    />
    <path
      d="M191.095 29.2718L190.699 28.8763H184.133V15.3882L183.738 14.9927H179.901L179.505 15.3882V33.1086L179.901 33.5042H190.699L191.095 33.1086V29.2718Z"
      fill="white"
    />
    <path
      d="M218.676 15.2696L218.281 14.9927H214.444L214.048 15.2696L208.669 33.0295L209.025 33.5042H212.901L213.257 33.2273L213.89 31.21H218.835L219.467 33.2273L219.823 33.5042H223.7L224.056 33.0295L218.676 15.2696ZM215.037 27.3337L216.343 23.0618L217.648 27.3337H215.037Z"
      fill="white"
    />
    <path
      d="M243.365 24.6835V23.1013L243.009 22.7058H234.901L234.505 23.1013V26.1866L234.901 26.5821H238.263C238.026 27.0568 237.67 27.571 237.155 27.9665C236.522 28.4807 235.573 28.8763 234.11 28.8763C232.923 28.8763 232.053 28.5994 231.42 28.2039C230.471 27.6106 229.996 26.7008 229.719 25.9097C229.482 25.0791 229.482 24.3671 229.482 24.2484C229.482 24.0902 229.482 22.9036 230.075 21.796C230.352 21.2027 230.787 20.6885 231.42 20.293C232.053 19.8974 232.923 19.6206 234.11 19.6206C236.087 19.6206 237.155 20.3325 237.788 21.2027L238.342 21.2818L241.546 19.0272L241.625 18.4735C240.32 16.6144 237.986 14.9927 234.11 14.9927C231.855 14.9927 230.075 15.5464 228.77 16.3771C226.792 17.6428 225.803 19.581 225.329 21.1632C224.854 22.7849 224.854 24.0902 224.854 24.2484C224.854 24.4857 224.854 26.7404 226.001 29.0345C226.594 30.142 227.464 31.2891 228.77 32.1198C230.075 32.9504 231.855 33.5042 234.11 33.5042C236.166 33.5042 237.749 33.0691 239.014 32.3966C240.913 31.3287 241.981 29.7465 242.574 28.2434C243.168 26.7404 243.326 25.3559 243.365 24.6835Z"
      fill="white"
    />
    <path
      d="M250.572 19.6206H258.285L258.681 19.225V15.3882L258.285 14.9927H246.34L245.944 15.3882V33.1482L246.34 33.5042H258.285L258.681 33.1482V29.2718L258.285 28.8763H250.572V26.5821H255.991L256.387 26.1866V22.3103L255.991 21.9543H250.572V19.6206Z"
      fill="white"
    />
    <path
      d="M275.695 15.3487L275.299 14.9531H271.462L271.067 15.3487V22.3103L271.106 23.8133L267.586 15.1905L267.23 14.9531H262.563L262.207 15.3487V33.1086L262.563 33.5042H266.439L266.834 33.1086V25.7515L266.795 24.644L270.315 33.2273L270.671 33.5042H275.299L275.695 33.1086V15.3487Z"
      fill="white"
    />
    <path
      d="M293.292 18.9086C292.027 16.9308 290.088 15.942 288.506 15.4673C286.885 14.9927 285.579 14.9927 285.421 14.9927H279.251L278.855 15.3882V33.1482L279.251 33.5042H285.421C285.619 33.5042 287.913 33.5042 290.168 32.3571C291.315 31.8033 292.422 30.8936 293.292 29.5883C294.123 28.283 294.677 26.5426 294.677 24.2484C294.677 21.9938 294.123 20.2139 293.292 18.9086ZM289.376 26.9381C288.783 27.8874 287.873 28.4016 287.043 28.639C286.252 28.8763 285.54 28.8763 285.421 28.8763H283.483V19.6206H285.421C285.579 19.6206 286.766 19.6206 287.873 20.2139C288.427 20.4907 288.981 20.9258 289.376 21.5587C289.772 22.1916 290.049 23.0618 290.049 24.2484C290.049 25.4351 289.772 26.3053 289.376 26.9381Z"
      fill="white"
    />
    <path
      d="M306.322 15.2696L305.926 14.9927H302.09L301.694 15.2696L296.315 33.0295L296.671 33.5042H300.547L300.903 33.2273L301.536 31.21H306.48L307.113 33.2273L307.469 33.5042H311.345L311.701 33.0295L306.322 15.2696ZM302.683 27.3337L303.988 23.0618L305.293 27.3337H302.683Z"
      fill="white"
    />
  </svg>
)

const FeyLogo = () => (
  <svg
    width="69"
    height="26"
    viewBox="0 0 69 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Fey Logo</title>
    <path
      d="M59.8015 15.4941L54 6H58.1844L61.5 12.2293L64.8384 6H69L63.2017 15.4941V20.8128C63.2009 21.1274 63.0799 21.4289 62.8653 21.6513C62.6507 21.8737 62.3599 21.9991 62.0564 22H59.8015V15.4941Z"
      fill="white"
    />
    <path
      d="M41.161 6.00002H51V8.06922C51 8.38434 50.8784 8.68656 50.6619 8.90939C50.4454 9.13222 50.1517 9.2574 49.8456 9.2574H43.4338V12.2414H48.6157V14.3106C48.6148 14.6254 48.4929 14.9271 48.2766 15.1497C48.0603 15.3724 47.7672 15.4979 47.4612 15.4987H43.4338V18.746H50.9934V20.8118C50.9939 20.968 50.9643 21.1227 50.9064 21.267C50.8486 21.4114 50.7636 21.5426 50.6563 21.653C50.549 21.7634 50.4216 21.8509 50.2813 21.9105C50.141 21.97 49.9907 22.0004 49.839 22H40V7.1882C40 7.0316 40.0301 6.87654 40.0885 6.73194C40.1469 6.58734 40.2325 6.45606 40.3404 6.34563C40.4483 6.23521 40.5764 6.14783 40.7172 6.08852C40.858 6.02921 41.0088 5.99913 41.161 6.00002Z"
      fill="white"
    />
    <path
      d="M28.2742 22H26V7.18744C26 6.87251 26.1217 6.57048 26.3383 6.34779C26.555 6.1251 26.8488 6 27.1551 6H37V8.06789C36.9991 8.38254 36.8772 8.68406 36.6607 8.90655C36.4443 9.12904 36.151 9.25443 35.8449 9.25532H29.4195V12.2374H34.634V14.3053C34.634 14.6202 34.5122 14.9222 34.2956 15.1449C34.079 15.3676 33.7852 15.4927 33.4788 15.4927H29.4195V20.8159C29.4195 21.1288 29.299 21.429 29.0844 21.6508C28.8698 21.8727 28.5785 21.9982 28.2742 22Z"
      fill="white"
    />
    <path
      d="M12.3557 21.3519C12.5597 21.5565 12.7218 21.8006 12.8324 22.0701C12.943 22.3395 13 22.6289 13 22.9211C13 23.2134 12.943 23.5028 12.8324 23.7722C12.7218 24.0417 12.5597 24.2858 12.3557 24.4904L10.8777 26L9.37507 24.459C8.55033 23.6131 8.06222 22.4836 8.00555 21.29C7.94888 20.0964 8.3277 18.9238 9.06842 18L12.3557 21.3519Z"
      fill="white"
    />
    <path
      d="M12.3612 9.60037C12.7703 10.0148 13 10.5764 13 11.162C13 11.7476 12.7703 12.3093 12.3612 12.7237L8.53364 16.5955C7.98718 17.1448 7.55408 17.7985 7.25948 18.5186C6.96489 19.2386 6.81469 20.0108 6.8176 20.79C6.81853 21.1966 6.86021 21.602 6.942 22L5.43328 20.4319C4.51549 19.5021 4 18.2418 4 16.9279C4 15.6139 4.51549 14.3536 5.43328 13.4238L10.7983 8L12.3612 9.60037Z"
      fill="white"
    />
    <path
      d="M12.3504 1.6047C12.7663 2.02399 13 2.59237 13 3.18499C13 3.77761 12.7663 4.34599 12.3504 4.76528L4.63302 12.5447C3.93442 13.247 3.42076 14.1137 3.13851 15.0662C2.85626 16.0187 2.81432 17.0271 3.01649 18L1.45492 16.4246C0.993711 15.9611 0.627808 15.4106 0.378155 14.8046C0.128502 14.1986 0 13.549 0 12.8929C0 12.2369 0.128502 11.5873 0.378155 10.9813C0.627808 10.3753 0.993711 9.82477 1.45492 9.3613L10.7532 0L12.3504 1.6047Z"
      fill="white"
    />
  </svg>
)

const CommandlineLogo = () => (
  <svg
    width="267"
    height="19"
    viewBox="0 0 267 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.8163 8.85552C12.8163 10.2475 12.9603 11.8795 13.0323 12.4315H12.9123C12.6483 11.7355 12.0723 10.4875 11.3283 9.31152L6.24029 1.31952H0.696289V2.47152C1.94429 2.49552 2.32829 2.83152 2.32829 4.19952V15.1915C2.32829 16.5595 1.94429 16.8955 0.696289 16.8955V17.9995H6.04829V16.8955C4.77629 16.8955 4.39229 16.5595 4.39229 15.1915V8.97552C4.39229 7.43952 4.24829 5.85552 4.17629 5.30352H4.27229C4.51229 5.83152 5.13629 7.12752 6.26429 8.87952L12.1443 17.9995H14.8323V4.19952C14.8323 2.83152 15.1923 2.49552 16.4403 2.47152V1.31952H11.1603V2.47152C12.4323 2.49552 12.8163 2.83152 12.8163 4.19952V8.85552Z"
      fill="#FAFAFA"
    />
    <path
      d="M28.0347 14.3995C28.0347 12.2155 28.1307 10.2235 28.1307 9.50352C28.1307 6.69552 26.2107 5.47152 23.4507 5.47152C21.5067 5.47152 19.5387 6.07152 18.2667 6.81552V9.26353H20.9067C21.0747 7.99152 21.4587 7.07952 22.8267 7.07952C24.0987 7.07952 24.5547 7.87152 24.5547 9.71952V10.8235C24.2427 10.7995 23.6907 10.7755 23.4027 10.7755C19.6347 10.7755 17.4987 11.9515 17.4987 14.7835C17.4987 17.2555 19.1787 18.3355 21.3147 18.3355C23.2107 18.3355 24.2427 17.3275 24.6507 16.4635C24.8427 17.4715 25.6347 18.1435 27.1227 18.1435C28.1787 18.1435 29.0667 17.8795 29.5707 17.5675V16.5355C28.2987 16.4875 28.0347 16.1995 28.0347 14.3995ZM24.5067 12.1675L24.4347 15.2155C24.0027 15.7675 23.2347 16.1035 22.6107 16.1035C21.6987 16.1035 21.1707 15.6955 21.1707 14.3275C21.1707 12.8635 22.0347 12.1675 23.6667 12.1675H24.5067Z"
      fill="#FAFAFA"
    />
    <path
      d="M35.4757 8.54352C35.4277 6.95952 34.8997 5.78352 34.7317 5.47152H34.3717L30.5077 6.43152V7.48752C31.7077 7.53552 31.9477 7.77552 31.9477 9.52752V15.2395C31.9477 16.6075 31.6837 16.8955 30.4837 16.9195V17.9995H37.4197V16.9195C35.7877 16.8955 35.5237 16.6075 35.5237 15.2395V11.4955C35.5237 9.62352 36.0037 9.04752 37.8277 9.04752C38.4037 9.04752 38.7157 9.11952 39.1477 9.23952L39.8197 5.61552C39.6277 5.54352 39.2917 5.47152 38.9317 5.47152C37.6117 5.47152 36.0757 6.47952 35.4757 8.54352Z"
      fill="#FAFAFA"
    />
    <path
      d="M51.1207 14.3995C51.1207 12.2155 51.2167 10.2235 51.2167 9.50352C51.2167 6.69552 49.2967 5.47152 46.5367 5.47152C44.5927 5.47152 42.6247 6.07152 41.3527 6.81552V9.26353H43.9927C44.1607 7.99152 44.5447 7.07952 45.9127 7.07952C47.1847 7.07952 47.6407 7.87152 47.6407 9.71952V10.8235C47.3287 10.7995 46.7767 10.7755 46.4887 10.7755C42.7207 10.7755 40.5847 11.9515 40.5847 14.7835C40.5847 17.2555 42.2647 18.3355 44.4007 18.3355C46.2967 18.3355 47.3287 17.3275 47.7367 16.4635C47.9287 17.4715 48.7207 18.1435 50.2087 18.1435C51.2647 18.1435 52.1527 17.8795 52.6567 17.5675V16.5355C51.3847 16.4875 51.1207 16.1995 51.1207 14.3995ZM47.5927 12.1675L47.5207 15.2155C47.0887 15.7675 46.3207 16.1035 45.6967 16.1035C44.7847 16.1035 44.2567 15.6955 44.2567 14.3275C44.2567 12.8635 45.1207 12.1675 46.7527 12.1675H47.5927Z"
      fill="#FAFAFA"
    />
    <path
      d="M61.2016 5.78352H58.2976C58.2976 4.55953 58.3936 3.11952 58.5136 2.25552L56.0176 2.56752C55.4176 3.47952 55.0576 4.65552 54.9136 5.73552L53.3056 6.38352V7.60752H54.7456V14.8555C54.7456 17.4955 55.9696 18.3115 58.1536 18.3115C59.4736 18.3115 60.5056 18.0235 61.4176 17.4475L61.0576 16.1995C60.5056 16.4155 60.1216 16.4875 59.6896 16.4875C58.4896 16.4875 58.3216 15.8395 58.3216 14.0635V7.60752H60.8176L61.2016 5.78352Z"
      fill="#FAFAFA"
    />
    <path
      d="M68.6752 17.9995V16.9195C67.4272 16.8955 67.2112 16.6075 67.2112 15.2395V5.59152H66.6832L62.1952 6.43152V7.48752C63.3952 7.53552 63.6352 7.77552 63.6352 9.52752V15.2395C63.6352 16.6075 63.3712 16.8955 62.1712 16.9195V17.9995H68.6752ZM67.4032 2.39952C67.4032 1.24752 66.4912 0.311523 65.3152 0.311523C64.1152 0.311523 63.1552 1.24752 63.1552 2.39952C63.1552 3.57552 64.1152 4.51152 65.2672 4.51152C66.4672 4.51152 67.4032 3.57552 67.4032 2.39952Z"
      fill="#FAFAFA"
    />
    <path
      d="M76.4309 18.1195L79.9589 8.37552C80.3909 7.22352 80.6789 7.00752 81.6389 6.88752V5.78352H76.6229V6.88752C77.6069 6.91152 78.0389 7.15152 78.0389 7.72752C78.0389 7.87152 77.9909 8.06352 77.9189 8.30352L76.3829 13.0315C76.1429 13.8235 75.9269 14.6875 75.9029 14.8795H75.7589C75.7109 14.5195 75.5669 13.8235 75.3029 13.0315L73.6709 8.30352C73.5749 8.06352 73.5269 7.87152 73.5269 7.70352C73.5269 7.19952 73.8869 6.91152 74.8949 6.88752V5.78352H68.3909V6.88752C69.2309 7.00752 69.4709 7.22352 69.9269 8.37552L73.6709 18.1195H76.4309Z"
      fill="#FAFAFA"
    />
    <path
      d="M89.0157 16.2235C86.7117 16.2235 85.7997 15.1195 85.7037 12.4075H92.9997V11.3755C92.9997 7.70352 91.4637 5.47152 87.6957 5.47152C84.2157 5.47152 81.8637 7.79952 81.8637 11.8555C81.8637 15.9355 84.0477 18.2875 87.7677 18.2875C89.9037 18.2875 91.4877 17.6395 92.7837 16.3675L92.2077 15.3835C91.1757 15.9355 90.0237 16.2235 89.0157 16.2235ZM87.7197 6.95952C88.9677 6.95952 89.4477 7.87152 89.4477 10.7755H85.7277C85.8957 7.84752 86.4957 6.95952 87.7197 6.95952Z"
      fill="#FAFAFA"
    />
    <path
      d="M107.661 18.2875C110.061 18.2875 112.125 17.6875 113.109 16.9675V13.7995H110.637C110.325 15.7675 109.701 16.6555 107.805 16.6555C105.741 16.6555 104.301 15.5515 104.301 9.74352C104.301 4.27152 105.549 2.73552 107.805 2.73552C109.461 2.73552 110.013 3.67152 110.397 5.49552H112.989V2.23152C111.837 1.48752 110.205 1.03152 107.853 1.03152C103.245 1.03152 100.101 3.79152 100.101 9.88752C100.101 15.2875 102.765 18.2875 107.661 18.2875Z"
      fill="#FAFAFA"
    />
    <path
      d="M127.032 11.7115C127.032 7.51153 124.536 5.47152 121.056 5.47152C117.24 5.47152 114.84 8.03952 114.84 11.9275C114.84 15.9595 117.096 18.3115 120.864 18.3115C124.2 18.3115 127.032 16.2715 127.032 11.7115ZM123.12 11.6155C123.12 15.3115 122.4 16.8235 120.984 16.8235C119.256 16.8235 118.752 15.3355 118.752 11.9755C118.752 8.18353 119.424 7.00752 120.936 7.00752C122.376 7.00752 123.12 8.13552 123.12 11.6155Z"
      fill="#FAFAFA"
    />
    <path
      d="M140.475 7.60752C139.971 6.28752 138.771 5.49552 137.355 5.49552C135.627 5.49552 134.427 6.31152 133.395 7.55952C133.323 6.59952 132.891 5.75952 132.747 5.47152H132.387L128.523 6.43152V7.48752C129.723 7.53552 129.963 7.77552 129.963 9.52752V15.2395C129.963 16.6075 129.699 16.8955 128.499 16.9195V17.9995H134.883V16.9195C133.659 16.9195 133.539 16.6075 133.539 15.3115V8.87952C134.163 8.44752 134.811 8.01552 135.771 8.01552C136.683 8.01552 137.211 8.51952 137.211 9.95952V15.3115C137.211 16.6075 137.067 16.9195 135.867 16.9195V17.9995H142.083V16.9195C140.955 16.8955 140.787 16.6075 140.787 15.3115V8.80752C141.363 8.39952 142.011 8.01552 142.947 8.01552C143.859 8.01552 144.387 8.51952 144.387 9.95952V15.3115C144.387 16.6075 144.243 16.9195 143.043 16.9195V17.9995H149.379V16.9195C148.203 16.8955 147.939 16.6075 147.939 15.2395V9.11952C147.939 6.64752 146.451 5.49552 144.531 5.49552C142.827 5.49552 141.507 6.33552 140.475 7.60752Z"
      fill="#FAFAFA"
    />
    <path
      d="M162.342 7.60752C161.838 6.28752 160.638 5.49552 159.222 5.49552C157.494 5.49552 156.294 6.31152 155.262 7.55952C155.19 6.59952 154.758 5.75952 154.614 5.47152H154.254L150.39 6.43152V7.48752C151.59 7.53552 151.83 7.77552 151.83 9.52752V15.2395C151.83 16.6075 151.566 16.8955 150.366 16.9195V17.9995H156.75V16.9195C155.526 16.9195 155.406 16.6075 155.406 15.3115V8.87952C156.03 8.44752 156.678 8.01552 157.638 8.01552C158.55 8.01552 159.078 8.51952 159.078 9.95952V15.3115C159.078 16.6075 158.934 16.9195 157.734 16.9195V17.9995H163.95V16.9195C162.822 16.8955 162.654 16.6075 162.654 15.3115V8.80752C163.23 8.39952 163.878 8.01552 164.814 8.01552C165.726 8.01552 166.254 8.51952 166.254 9.95952V15.3115C166.254 16.6075 166.11 16.9195 164.91 16.9195V17.9995H171.246V16.9195C170.07 16.8955 169.806 16.6075 169.806 15.2395V9.11952C169.806 6.64752 168.318 5.49552 166.398 5.49552C164.694 5.49552 163.374 6.33552 162.342 7.60752Z"
      fill="#FAFAFA"
    />
    <path
      d="M182.746 14.3995C182.746 12.2155 182.842 10.2235 182.842 9.50352C182.842 6.69552 180.922 5.47152 178.162 5.47152C176.218 5.47152 174.25 6.07152 172.978 6.81552V9.26353H175.618C175.786 7.99152 176.17 7.07952 177.538 7.07952C178.81 7.07952 179.266 7.87152 179.266 9.71952V10.8235C178.954 10.7995 178.402 10.7755 178.114 10.7755C174.346 10.7755 172.21 11.9515 172.21 14.7835C172.21 17.2555 173.89 18.3355 176.026 18.3355C177.922 18.3355 178.954 17.3275 179.362 16.4635C179.554 17.4715 180.346 18.1435 181.834 18.1435C182.89 18.1435 183.778 17.8795 184.282 17.5675V16.5355C183.01 16.4875 182.746 16.1995 182.746 14.3995ZM179.218 12.1675L179.146 15.2155C178.714 15.7675 177.946 16.1035 177.322 16.1035C176.41 16.1035 175.882 15.6955 175.882 14.3275C175.882 12.8635 176.746 12.1675 178.378 12.1675H179.218Z"
      fill="#FAFAFA"
    />
    <path
      d="M197.795 9.11952C197.795 6.64752 196.283 5.49552 194.315 5.49552C192.443 5.49552 191.171 6.45552 190.139 7.63152C190.067 6.67152 189.611 5.73552 189.443 5.47152H189.083L185.219 6.43152V7.48752C186.419 7.53552 186.659 7.77552 186.659 9.52752V15.2395C186.659 16.6075 186.395 16.8955 185.195 16.9195V17.9995H191.699V16.9195C190.451 16.8955 190.235 16.5835 190.235 15.2875V8.92752C190.859 8.44752 191.579 8.01552 192.635 8.01552C193.643 8.01552 194.219 8.51952 194.219 9.95952V15.2875C194.219 16.5835 194.003 16.8955 192.779 16.9195V17.9995H199.211V16.9195C198.059 16.8955 197.795 16.6075 197.795 15.2395V9.11952Z"
      fill="#FAFAFA"
    />
    <path
      d="M208.955 16.3675C209.027 17.3755 209.435 18.1195 209.603 18.3115H209.963L213.851 17.4475V16.4635C212.579 16.3675 212.315 16.1755 212.315 14.4235V0.383524H211.691L207.227 1.03152V2.08752C208.403 2.13552 208.763 2.37552 208.763 4.12752V6.67152C208.163 5.92752 207.107 5.49552 205.907 5.49552C202.763 5.49552 200.411 7.46352 200.411 11.9755C200.411 16.3675 202.427 18.2875 205.235 18.2875C206.867 18.2875 208.283 17.4955 208.955 16.3675ZM204.299 11.7115C204.299 8.35153 205.259 7.51152 206.699 7.51152C207.467 7.51152 208.211 7.75152 208.763 8.39952V15.0715C208.091 15.7435 207.347 16.0795 206.555 16.0795C205.115 16.0795 204.299 15.0955 204.299 11.7115Z"
      fill="#FAFAFA"
    />
    <path
      d="M222.213 1H219V6.79266H222.213V5.81998H220.129V4.23938H222.126V3.26669H220.129V1.97268H222.213V1Z"
      fill="#E9DAAC"
    />
    <path
      d="M222.718 6.79266H224.073L225.41 4.67361L226.678 6.79266H228.033L226.053 3.73567L227.833 1H226.478L225.41 2.79772L224.394 1H223.039L224.767 3.73567L222.718 6.79266Z"
      fill="#E9DAAC"
    />
    <path
      d="M228.864 1V6.79266H229.993V4.64755H230.722C231.391 4.64755 231.868 4.45649 232.19 4.13516C232.633 3.69224 232.667 3.06695 232.667 2.84115C232.667 2.42428 232.546 1.85978 232.077 1.44292C231.651 1.06948 231.2 1 230.548 1H228.864ZM229.993 1.97268H230.383C230.653 1.97268 230.948 1.99005 231.182 2.15506C231.347 2.27664 231.504 2.49376 231.504 2.81509C231.504 3.06695 231.399 3.32749 231.191 3.4925C230.948 3.67487 230.67 3.67487 230.453 3.67487H229.993V1.97268Z"
      fill="#E9DAAC"
    />
    <path
      d="M236.716 1H233.503V6.79266H236.716V5.81998H234.632V4.23938H236.629V3.26669H234.632V1.97268H236.716V1Z"
      fill="#E9DAAC"
    />
    <path
      d="M237.811 1V6.79266H238.94V4.46518H239.079L240.625 6.79266H242.032L240.225 4.35228C240.503 4.30017 240.712 4.20464 240.859 4.10042C241.311 3.79646 241.537 3.30143 241.537 2.73693C241.537 2.3027 241.407 1.80767 240.964 1.43423C240.694 1.20843 240.286 1 239.487 1H237.811ZM238.94 1.92057H239.279C239.487 1.92057 240.373 1.92926 240.373 2.78904C240.373 3.64013 239.479 3.66619 239.261 3.66619H238.94V1.92057Z"
      fill="#E9DAAC"
    />
    <path d="M242.798 1V6.79266H243.927V1H242.798Z" fill="#E9DAAC" />
    <path
      d="M244.954 6.79266H246.1L246.691 3.22327L248.176 6.79266H248.558L250.112 3.22327L250.633 6.79266H251.78L250.807 1H249.991L248.384 4.68229L246.847 1H246.031L244.954 6.79266Z"
      fill="#E9DAAC"
    />
    <path
      d="M256.019 1H252.806V6.79266H256.019V5.81998H253.935V4.23938H255.932V3.26669H253.935V1.97268H256.019V1Z"
      fill="#E9DAAC"
    />
    <path
      d="M258.243 6.79266V2.91931L261.769 6.79266H262.551V1H261.422V4.86467L257.896 1H257.114V6.79266H258.243Z"
      fill="#E9DAAC"
    />
    <path
      d="M267 1.97268V1H263.266V1.97268H264.568V6.79266H265.697V1.97268H267Z"
      fill="#E9DAAC"
    />
  </svg>
)

const NovelaLogo = () => (
  <svg
    width="198"
    height="24"
    viewBox="0 0 198 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 12C0 5.372 5.372 0 12 0C18.628 0 24 5.372 24 12C24 18.628 18.628 24 12 24C5.372 24 0 18.628 0 12ZM2.592 12.12C2.62 14.492 3.522 16.856 5.332 18.666C7.144 20.478 9.508 21.38 11.88 21.408L2.592 12.12ZM2.812 9.914L14.086 21.188C18.288 20.238 21.428 16.49 21.428 12H15.428V13.716H19.518C18.926 16.304 17.034 18.394 14.566 19.268L4.734 9.436C5.794 6.44 8.646 4.286 12 4.286C14.61 4.286 16.916 5.59 18.312 7.58L19.624 6.47C17.91 4.112 15.138 2.572 12 2.572C7.512 2.572 3.762 5.712 2.812 9.914ZM100.986 3.38477C101.106 3.62477 101.418 4.32076 101.418 5.76076V18.2168C101.418 19.5848 101.658 19.8968 102.906 19.9208V21.0008H96.3783V19.9208C97.6023 19.8968 97.8663 19.6088 97.8663 18.2408V7.12877C97.8663 5.37677 97.5063 5.13677 96.2823 5.08877V4.03277L100.626 3.38477H100.986ZM52.8153 11.8568C52.8153 13.2488 52.9593 14.8808 53.0313 15.4328H52.9113C52.6473 14.7368 52.0713 13.4888 51.3273 12.3128L46.2393 4.32077H40.6953V5.47277C41.9433 5.49677 42.3273 5.83277 42.3273 7.20077V18.1928C42.3273 19.5608 41.9433 19.8968 40.6953 19.8968V21.0008H46.0473V19.8968C44.7753 19.8968 44.3913 19.5608 44.3913 18.1928V11.9768C44.3913 10.4408 44.2473 8.85677 44.1753 8.30477H44.2713C44.5113 8.83277 45.1353 10.1288 46.2633 11.8808L52.1433 21.0008H54.8313V7.20077C54.8313 5.83277 55.1913 5.49677 56.4393 5.47277V4.32077H51.1593V5.47277C52.4313 5.49677 52.8153 5.83277 52.8153 7.20077V11.8568ZM69.8126 14.7128C69.8126 10.5128 67.3166 8.47277 63.8366 8.47277C60.0206 8.47277 57.6206 11.0408 57.6206 14.9288C57.6206 18.9608 59.8766 21.3128 63.6446 21.3128C66.9806 21.3128 69.8126 19.2728 69.8126 14.7128ZM65.9006 14.6168C65.9006 18.3128 65.1806 19.8248 63.7646 19.8248C62.0366 19.8248 61.5326 18.3368 61.5326 14.9768C61.5326 11.1848 62.2046 10.0088 63.7166 10.0088C65.1566 10.0088 65.9006 11.1368 65.9006 14.6168ZM82.1064 11.3768L78.5784 21.1208H75.8184L72.0744 11.3768C71.6184 10.2248 71.3784 10.0088 70.5384 9.88877V8.78477H77.0424V9.88877C76.0344 9.91277 75.6744 10.2008 75.6744 10.7048C75.6744 10.8728 75.7224 11.0648 75.8184 11.3048L77.4504 16.0328C77.7144 16.8248 77.8584 17.5208 77.9064 17.8808H78.0504C78.0744 17.6888 78.2904 16.8248 78.5304 16.0328L80.0664 11.3048C80.1384 11.0648 80.1864 10.8728 80.1864 10.7288C80.1864 10.1528 79.7544 9.91277 78.7704 9.88877V8.78477H83.7864V9.88877C82.8264 10.0088 82.5384 10.2248 82.1064 11.3768ZM91.1632 19.2248C88.8592 19.2248 87.9472 18.1208 87.8512 15.4088H95.1472V14.3768C95.1472 10.7048 93.6112 8.47277 89.8432 8.47277C86.3632 8.47277 84.0112 10.8008 84.0112 14.8568C84.0112 18.9368 86.1952 21.2888 89.9152 21.2888C92.0512 21.2888 93.6352 20.6408 94.9312 19.3688L94.3552 18.3848C93.3232 18.9368 92.1712 19.2248 91.1632 19.2248ZM89.8672 9.96077C91.1152 9.96077 91.5952 10.8728 91.5952 13.7768H87.8752C88.0432 10.8488 88.6432 9.96077 89.8672 9.96077ZM114.554 13.7481V13.7479C114.57 13.1992 114.583 12.7674 114.583 12.5048C114.583 9.69677 112.663 8.47277 109.903 8.47277C107.959 8.47277 105.991 9.07277 104.719 9.81677V12.2648H107.359C107.527 10.9928 107.911 10.0808 109.279 10.0808C110.551 10.0808 111.007 10.8728 111.007 12.7208V13.8248C110.695 13.8008 110.143 13.7768 109.855 13.7768C106.087 13.7768 103.951 14.9528 103.951 17.7848C103.951 20.2568 105.631 21.3368 107.767 21.3368C109.663 21.3368 110.695 20.3288 111.103 19.4648C111.295 20.4728 112.087 21.1448 113.575 21.1448C114.631 21.1448 115.519 20.8808 116.023 20.5688V19.5368C114.751 19.4888 114.487 19.2008 114.487 17.4008C114.487 16.0138 114.526 14.7044 114.554 13.7489V13.7485L114.554 13.7481ZM110.959 15.1688L110.887 18.2168C110.455 18.7688 109.687 19.1048 109.063 19.1048C108.151 19.1048 107.623 18.6968 107.623 17.3288C107.623 15.8648 108.487 15.1688 110.119 15.1688H110.959ZM122.086 8.78477L122.35 4.32077H135.646L135.91 8.78477H134.11C133.63 6.72077 133.462 6.02477 131.926 6.02477H130.894V18.1928C130.894 19.5848 131.35 19.8968 132.79 19.8968V21.0008H125.23V19.8968C126.67 19.8968 127.126 19.5848 127.126 18.1928V6.02477H126.094C124.552 6.02477 124.394 6.70515 123.927 8.71545L123.91 8.78477H122.086ZM141.965 5.76076C141.965 4.51276 141.749 3.74477 141.533 3.38477H141.173L136.853 4.03277V5.08877C138.053 5.13677 138.389 5.37677 138.389 7.12877V18.2408C138.389 19.6088 138.149 19.8968 136.949 19.9208V21.0008H143.429V19.9208C142.181 19.8968 141.965 19.5848 141.965 18.2888V11.9288C142.589 11.4488 143.309 11.0168 144.389 11.0168C145.373 11.0168 145.973 11.5208 145.973 12.9608V18.2888C145.973 19.5848 145.757 19.8968 144.509 19.9208V21.0008H150.965V19.9208C149.789 19.8968 149.525 19.6088 149.525 18.2408V12.1208C149.525 9.64877 148.037 8.49677 146.069 8.49677C144.197 8.49677 143.021 9.33677 141.965 10.5128V5.76076ZM156.007 15.4088C156.103 18.1208 157.015 19.2248 159.319 19.2248C160.327 19.2248 161.479 18.9368 162.511 18.3848L163.087 19.3688C161.791 20.6408 160.207 21.2888 158.071 21.2888C154.351 21.2888 152.167 18.9368 152.167 14.8568C152.167 10.8008 154.519 8.47277 157.999 8.47277C161.767 8.47277 163.303 10.7048 163.303 14.3768V15.4088H156.007ZM159.751 13.7768C159.751 10.8728 159.271 9.96077 158.023 9.96077C156.799 9.96077 156.199 10.8488 156.031 13.7768H159.751ZM176.631 10.6088C176.127 9.28877 174.927 8.49677 173.511 8.49677C171.783 8.49677 170.583 9.31277 169.551 10.5608C169.48 9.6262 169.069 8.80535 168.915 8.49681L168.903 8.47277H168.543L164.679 9.43277V10.4888C165.879 10.5368 166.119 10.7768 166.119 12.5288V18.2408C166.119 19.6088 165.855 19.8968 164.655 19.9208V21.0008H171.039V19.9208C169.815 19.9208 169.695 19.6088 169.695 18.3128V11.8808C170.319 11.4488 170.967 11.0168 171.927 11.0168C172.839 11.0168 173.367 11.5208 173.367 12.9608V18.3128C173.367 19.6088 173.223 19.9208 172.023 19.9208V21.0008H178.239V19.9208C177.111 19.8968 176.943 19.6088 176.943 18.3128V11.8088C177.519 11.4008 178.167 11.0168 179.103 11.0168C180.015 11.0168 180.543 11.5208 180.543 12.9608V18.3128C180.543 19.6088 180.399 19.9208 179.199 19.9208V21.0008H185.535V19.9208C184.359 19.8968 184.095 19.6088 184.095 18.2408V12.1208C184.095 9.64877 182.607 8.49677 180.687 8.49677C178.983 8.49677 177.663 9.33677 176.631 10.6088ZM190.578 15.4088C190.674 18.1208 191.586 19.2248 193.89 19.2248C194.898 19.2248 196.05 18.9368 197.082 18.3848L197.658 19.3688C196.362 20.6408 194.778 21.2888 192.642 21.2888C188.922 21.2888 186.738 18.9368 186.738 14.8568C186.738 10.8008 189.09 8.47277 192.57 8.47277C196.338 8.47277 197.874 10.7048 197.874 14.3768V15.4088H190.578ZM194.322 13.7768C194.322 10.8728 193.842 9.96077 192.594 9.96077C191.37 9.96077 190.77 10.8488 190.602 13.7768H194.322Z"
      fill="#08080B"
    />
  </svg>
)

const MemoirLogo = () => (
  <svg
    width="208"
    height="24"
    viewBox="0 0 208 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 12C0 5.372 5.372 0 12 0C18.628 0 24 5.372 24 12C24 18.628 18.628 24 12 24C5.372 24 0 18.628 0 12ZM2.592 12.12C2.62 14.492 3.522 16.856 5.332 18.666C7.144 20.478 9.508 21.38 11.88 21.408L2.592 12.12ZM2.812 9.914L14.086 21.188C18.288 20.238 21.428 16.49 21.428 12H15.428V13.716H19.518C18.926 16.304 17.034 18.394 14.566 19.268L4.734 9.436C5.794 6.44 8.646 4.286 12 4.286C14.61 4.286 16.916 5.59 18.312 7.58L19.624 6.47C17.91 4.112 15.138 2.572 12 2.572C7.512 2.572 3.762 5.712 2.812 9.914ZM115.432 19.9205V21.0005H108.928V19.9205C110.128 19.8965 110.392 19.6085 110.392 18.2405V12.5285C110.392 10.7765 110.152 10.5365 108.952 10.4885V9.4325L113.44 8.5925H113.968V18.2405C113.968 19.6085 114.184 19.8965 115.432 19.9205ZM112.072 3.3125C113.248 3.3125 114.16 4.2485 114.16 5.4005C114.16 6.5765 113.224 7.5125 112.024 7.5125C110.872 7.5125 109.912 6.5765 109.912 5.4005C109.912 4.2485 110.872 3.3125 112.072 3.3125ZM58.7756 4.3205H52.5836L50.3036 12.6965C50.0337 13.6797 49.8413 14.8333 49.7262 15.5227L49.7261 15.5234L49.7257 15.5256C49.6978 15.6932 49.6744 15.8332 49.6556 15.9365H49.5596C49.4876 15.3605 49.2716 13.8245 48.9116 12.6965L46.3436 4.3205H40.1276V5.4485C41.8796 5.5205 41.9276 6.0965 41.8556 7.2725L41.1116 18.0245C41.0156 19.4645 40.7756 19.8725 39.4316 19.9205V21.0005H44.6156V19.9205C43.1516 19.9205 43.0076 19.4885 43.0796 18.1685L43.5116 10.7525C43.5701 9.81667 43.6128 8.62743 43.6396 7.87955L43.6396 7.87826V7.87815C43.6458 7.70599 43.6511 7.55728 43.6556 7.4405H43.7756C43.8716 8.0165 44.1596 9.6965 44.5196 10.8485L47.6636 21.0005H49.8956L52.8716 10.2245C53.1356 9.3125 53.3756 7.9205 53.4476 7.4645H53.5676V7.9925C53.5676 8.6165 53.5916 9.7925 53.6396 10.4405L54.2876 18.1925C54.4076 19.4885 54.2396 19.8725 52.6796 19.9205V21.0005H59.6636V19.9205C58.3196 19.8725 58.1276 19.4165 58.0076 18.0725L57.0476 7.2725C56.9276 6.0245 57.0956 5.5445 58.7756 5.4485V4.3205ZM67.851 19.2245C65.547 19.2245 64.635 18.1205 64.539 15.4085H71.835V14.3765C71.835 10.7045 70.299 8.4725 66.531 8.4725C63.051 8.4725 60.699 10.8005 60.699 14.8565C60.699 18.9365 62.883 21.2885 66.603 21.2885C68.739 21.2885 70.323 20.6405 71.619 19.3685L71.043 18.3845C70.011 18.9365 68.859 19.2245 67.851 19.2245ZM66.555 9.9605C67.803 9.9605 68.283 10.8725 68.283 13.7765H64.563C64.731 10.8485 65.331 9.9605 66.555 9.9605ZM82.0421 8.4965C83.4581 8.4965 84.6581 9.2885 85.1621 10.6085C86.1941 9.3365 87.5141 8.4965 89.2181 8.4965C91.1381 8.4965 92.6261 9.6485 92.6261 12.1205V18.2405C92.6261 19.6085 92.8901 19.8965 94.0661 19.9205V21.0005H87.7301V19.9205C88.9301 19.9205 89.0741 19.6085 89.0741 18.3125V12.9605C89.0741 11.5205 88.5461 11.0165 87.6341 11.0165C86.6981 11.0165 86.0501 11.4005 85.4741 11.8085V18.3125C85.4741 19.6085 85.6421 19.8965 86.7701 19.9205V21.0005H80.5541V19.9205C81.7541 19.9205 81.8981 19.6085 81.8981 18.3125V12.9605C81.8981 11.5205 81.3701 11.0165 80.4581 11.0165C79.4981 11.0165 78.8501 11.4485 78.2261 11.8805V18.3125C78.2261 19.6085 78.3461 19.9205 79.5701 19.9205V21.0005H73.1861V19.9205C74.3861 19.8965 74.6501 19.6085 74.6501 18.2405V12.5285C74.6501 10.7765 74.4101 10.5365 73.2101 10.4885V9.4325L77.0741 8.4725H77.4341L77.4462 8.49653C77.6008 8.80506 78.012 9.62592 78.0821 10.5605C79.1141 9.3125 80.3141 8.4965 82.0421 8.4965ZM107.461 14.7125C107.461 10.5125 104.965 8.4725 101.485 8.4725C97.6693 8.4725 95.2693 11.0405 95.2693 14.9285C95.2693 18.9605 97.5253 21.3125 101.293 21.3125C104.629 21.3125 107.461 19.2725 107.461 14.7125ZM103.549 14.6165C103.549 18.3125 102.829 19.8245 101.413 19.8245C99.6853 19.8245 99.1813 18.3365 99.1813 14.9765C99.1813 11.1845 99.8533 10.0085 101.365 10.0085C102.805 10.0085 103.549 11.1365 103.549 14.6165ZM121.491 11.5445C121.443 9.9605 120.915 8.7845 120.747 8.4725H120.387L116.523 9.4325V10.4885C117.723 10.5365 117.963 10.7765 117.963 12.5285V18.2405C117.963 19.6085 117.699 19.8965 116.499 19.9205V21.0005H123.435V19.9205C121.803 19.8965 121.539 19.6085 121.539 18.2405V14.4965C121.539 12.6245 122.019 12.0485 123.843 12.0485C124.419 12.0485 124.731 12.1205 125.163 12.2405L125.835 8.6165C125.643 8.5445 125.307 8.4725 124.947 8.4725C123.627 8.4725 122.091 9.4805 121.491 11.5445ZM131.54 8.7845L131.804 4.3205H145.1L145.364 8.7845H143.564C143.084 6.7205 142.916 6.0245 141.38 6.0245H140.348V18.1925C140.348 19.5845 140.804 19.8965 142.244 19.8965V21.0005H134.684V19.8965C136.124 19.8965 136.58 19.5845 136.58 18.1925V6.0245H135.548C134.005 6.0245 133.847 6.70489 133.38 8.71519L133.364 8.7845H131.54ZM151.418 5.7605C151.418 4.5125 151.202 3.7445 150.986 3.3845H150.626L146.306 4.0325V5.0885C147.506 5.1365 147.842 5.3765 147.842 7.1285V18.2405C147.842 19.6085 147.602 19.8965 146.402 19.9205V21.0005H152.882V19.9205C151.634 19.8965 151.418 19.5845 151.418 18.2885V11.9285C152.042 11.4485 152.762 11.0165 153.842 11.0165C154.826 11.0165 155.426 11.5205 155.426 12.9605V18.2885C155.426 19.5845 155.21 19.8965 153.962 19.9205V21.0005H160.418V19.9205C159.242 19.8965 158.978 19.6085 158.978 18.2405V12.1205C158.978 9.6485 157.49 8.4965 155.522 8.4965C153.65 8.4965 152.474 9.3365 151.418 10.5125V5.7605ZM165.461 15.4085C165.557 18.1205 166.469 19.2245 168.773 19.2245C169.781 19.2245 170.933 18.9365 171.965 18.3845L172.541 19.3685C171.245 20.6405 169.661 21.2885 167.525 21.2885C163.805 21.2885 161.621 18.9365 161.621 14.8565C161.621 10.8005 163.973 8.4725 167.453 8.4725C171.221 8.4725 172.757 10.7045 172.757 14.3765V15.4085H165.461ZM169.205 13.7765C169.205 10.8725 168.725 9.9605 167.477 9.9605C166.253 9.9605 165.653 10.8485 165.485 13.7765H169.205ZM186.084 10.6085C185.58 9.2885 184.38 8.4965 182.964 8.4965C181.236 8.4965 180.036 9.3125 179.004 10.5605C178.934 9.62593 178.523 8.80509 178.368 8.49654L178.356 8.4725H177.996L174.132 9.4325V10.4885C175.332 10.5365 175.572 10.7765 175.572 12.5285V18.2405C175.572 19.6085 175.308 19.8965 174.108 19.9205V21.0005H180.492V19.9205C179.268 19.9205 179.148 19.6085 179.148 18.3125V11.8805C179.772 11.4485 180.42 11.0165 181.38 11.0165C182.292 11.0165 182.82 11.5205 182.82 12.9605V18.3125C182.82 19.6085 182.676 19.9205 181.476 19.9205V21.0005H187.692V19.9205C186.564 19.8965 186.396 19.6085 186.396 18.3125V11.8085C186.972 11.4005 187.62 11.0165 188.556 11.0165C189.468 11.0165 189.996 11.5205 189.996 12.9605V18.3125C189.996 19.6085 189.852 19.9205 188.652 19.9205V21.0005H194.988V19.9205C193.812 19.8965 193.548 19.6085 193.548 18.2405V12.1205C193.548 9.6485 192.06 8.4965 190.14 8.4965C188.436 8.4965 187.116 9.3365 186.084 10.6085ZM200.031 15.4085C200.127 18.1205 201.039 19.2245 203.343 19.2245C204.351 19.2245 205.503 18.9365 206.535 18.3845L207.111 19.3685C205.815 20.6405 204.231 21.2885 202.095 21.2885C198.375 21.2885 196.191 18.9365 196.191 14.8565C196.191 10.8005 198.543 8.4725 202.023 8.4725C205.791 8.4725 207.327 10.7045 207.327 14.3765V15.4085H200.031ZM203.775 13.7765C203.775 10.8725 203.295 9.9605 202.047 9.9605C200.823 9.9605 200.223 10.8485 200.055 13.7765H203.775Z"
      fill="#08080B"
    />
  </svg>
)

const GlobeIcon = ({ fill = 'white' }) => (
  <svg
    width="19"
    height="14"
    viewBox="0 0 19 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.20896 13.9999C7.34271 14.0075 5.54559 13.2942 4.19251 12.0089C3.99106 11.8171 3.90719 11.5325 3.97251 11.2622C4.03782 10.9919 4.24239 10.7769 4.50915 10.6983C4.77591 10.6197 5.06434 10.6894 5.26579 10.8811C6.33096 11.8879 7.74335 12.445 9.20896 12.4366C9.75609 12.4375 10.3006 12.3616 10.8267 12.2111C11.2297 12.1183 11.6349 12.3572 11.7488 12.7548C11.8627 13.1524 11.6455 13.5697 11.2544 13.7043C10.5898 13.898 9.90125 13.9975 9.20896 13.9999ZM16.3176 8.00353C16.3654 7.67126 16.3888 7.33593 16.3876 7.00024C16.3321 3.08455 13.117 -0.0470396 9.20122 0.000534954C6.45785 -0.00568609 3.94655 1.53903 2.71483 3.99037C2.52583 4.37695 2.68601 4.84355 3.07259 5.03254C3.45918 5.22154 3.92578 5.06136 4.11477 4.67478C5.08411 2.75804 7.05334 1.55361 9.20122 1.5638C12.258 1.51614 14.7767 3.95138 14.8321 7.00802C14.8331 7.26825 14.8149 7.5282 14.7777 7.78576C14.7464 7.99001 14.7978 8.19829 14.9203 8.36463C15.0429 8.53097 15.2266 8.6417 15.431 8.67239H15.5632C15.9535 8.67623 16.2863 8.39008 16.3409 8.00353H16.3176ZM18.5887 9.07689C18.6387 8.88411 18.6545 8.68405 18.6354 8.48581C18.5826 8.06792 18.2068 7.76795 17.7876 7.80917C17.3762 7.86566 17.0817 8.23547 17.1188 8.64913C16.9632 9.23244 13.9456 9.92464 8.81246 8.64913C4.92374 7.66918 2.26385 6.11369 1.65721 5.07929C1.5883 4.98755 1.55264 4.8751 1.5561 4.76041C1.65121 4.35218 1.4057 3.94202 1.00097 3.83297C0.596247 3.72393 0.177909 3.95523 0.0550537 4.35598C-0.0711348 4.8728 0.021739 5.41878 0.311709 5.86481C1.25278 7.45919 4.43376 9.14689 8.42359 10.1502C10.2864 10.6343 12.2001 10.8954 14.1245 10.9279C16.4266 10.9824 18.2387 10.4224 18.5965 9.07689H18.5887Z"
      fill={fill}
    />
  </svg>
)

const EyeIcon = ({ fill = 'white' }) => (
  <svg
    width="20"
    height="12"
    viewBox="0 0 20 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.80781 11.7636C5.89042 11.6782 2.27087 9.65402 0.147117 6.36116C0.0517275 6.2245 0.000394569 6.06195 0 5.89529C0 5.72095 0.0511518 5.55044 0.147117 5.4049C2.209 2.04657 5.86703 0 9.80781 0C13.7486 0 17.4066 2.04657 19.4685 5.4049C19.6536 5.64369 19.6919 5.96513 19.568 6.24072C19.4442 6.5163 19.1784 6.70107 18.8769 6.72115C18.5754 6.74123 18.2874 6.59336 18.1281 6.33664C16.3064 3.48646 13.1893 1.7258 9.80781 1.63706C6.62406 1.71245 3.66329 3.28829 1.82262 5.88711C3.66329 8.48594 6.62406 10.0618 9.80781 10.1372C12.0105 10.1205 14.1393 9.3406 15.8314 7.93041C16.1827 7.6728 16.6743 7.73593 16.949 8.07393C17.2238 8.41193 17.1852 8.90602 16.8613 9.19725C14.8778 10.8429 12.385 11.7498 9.80781 11.7636ZM12.2596 5.7236C12.2596 4.36942 11.1618 3.27165 9.80766 3.27165C9.35627 3.27165 8.99035 3.63757 8.99035 4.08896C8.99035 4.54036 9.35627 4.90628 9.80766 4.90628C10.2591 4.90628 10.625 5.27221 10.625 5.7236C10.625 6.17499 10.2591 6.54092 9.80766 6.54092C9.35627 6.54092 8.99035 6.17499 8.99035 5.7236C8.99035 5.27221 8.62442 4.90628 8.17303 4.90628C7.72164 4.90628 7.35571 5.27221 7.35571 5.7236C7.35571 7.07778 8.45349 8.17555 9.80766 8.17555C11.1618 8.17555 12.2596 7.07778 12.2596 5.7236Z"
      fill={fill}
    />
  </svg>
)

const FigmaIcon = ({ fill = 'white' }) => (
  <svg
    width="12"
    height="16"
    viewBox="0 0 12 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.5172 3.07248C1.5172 2.04865 2.34845 1.2174 3.37228 1.2174H5.22737V4.92756H3.37228C2.34845 4.92756 1.5172 4.09631 1.5172 3.07248ZM3.37228 0C1.6761 0 0.299805 1.3763 0.299805 3.07248C0.299805 4.08075 0.78612 4.97598 1.53686 5.53629C0.78612 6.0966 0.299805 6.99184 0.299805 8.00011C0.299805 9.00831 0.78606 9.9035 1.53672 10.4638C0.78606 11.0241 0.299805 11.9193 0.299805 12.9275C0.299805 14.6237 1.6761 16 3.37228 16C5.06846 16 6.44476 14.6237 6.44476 12.9275V11.0726V10.4639V10.4637V10.4489C6.96038 10.8403 7.60325 11.0726 8.30012 11.0726C9.99631 11.0726 11.3726 9.69629 11.3726 8.00011C11.3726 6.99184 10.8863 6.09661 10.1355 5.5363C10.8863 4.97598 11.3726 4.08075 11.3726 3.07248C11.3726 1.3763 9.99631 0 8.30012 0H6.44476H5.83634H5.83606H5.22764H3.37228ZM3.37228 6.14502C2.34845 6.14502 1.5172 6.97627 1.5172 8.00011C1.5172 9.0177 2.33834 9.84504 3.35357 9.8551L3.37228 9.85504H5.22736V6.14502H3.37228ZM1.5172 12.9275C1.5172 11.9099 2.33834 11.0826 3.35357 11.0725L3.37228 11.0726H5.22736V12.9275C5.22736 13.9514 4.39611 14.7826 3.37228 14.7826C2.34845 14.7826 1.5172 13.9514 1.5172 12.9275ZM6.44504 4.92756H8.30012C9.32396 4.92756 10.1552 4.09631 10.1552 3.07248C10.1552 2.04865 9.32396 1.2174 8.30012 1.2174H6.44504V4.92756ZM6.44504 8.00011C6.44504 6.97627 7.27629 6.14502 8.30012 6.14502C9.32396 6.14502 10.1552 6.97627 10.1552 8.00011C10.1552 9.02394 9.32396 9.85519 8.30012 9.85519C7.27629 9.85519 6.44504 9.02394 6.44504 8.00011Z"
      fill={fill}
    />
  </svg>
)

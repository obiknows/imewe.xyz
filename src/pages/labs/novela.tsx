import React, { useState, useEffect, useRef } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { graphql } from 'gatsby'

import Layout from '@components/Layout'
import LayoutHeroMobile from '@components/Layout/Layout.Hero.Mobile'
import Section from '@components/Section'
import SEO from '@components/SEO'
import Image from '@components/Image'

import media from '@styles/media'

/**
 * The home page of Narative.co!
 */
function NovealPage({ data, location }) {
  const contentful = data.allContentfulPage.edges[0].node

  const [theme, setTheme] = useState('light')
  const [dimension, setDimension] = useState(1140)
  const [hasLoaded, setHasLoaded] = useState(false)
  const iframeRef = useRef(null)

  const navConfig = {
    offset: true,
    fixed: true,
    theme: theme === 'light' ? 'dark' : 'light',
  }

  const footerConfig = {
    visible: true,
    theme: theme,
  }

  const background =
    theme === 'dark'
      ? 'linear-gradient(180deg, #111216 0%, #191D23 25%)'
      : 'linear-gradient(180deg, #fff 55%, #D9DBE0 100%)'

  useEffect(() => {
    function handleIframe() {
      const style = document.createElement('style')
      style.type = 'text/css'
      style.textContent = `
              body {
                zoom: 82%;
                position: relative;
              }
              
              #gatsby-focus-wrapper > div {
                padding-top: 50px
              }
  
              @media screen and (max-width: 1000px) {
                #gatsby-focus-wrapper > div {
                  padding-top: 25px
                }
              }
  
              @media screen and (max-width: 500px) {
                #gatsby-focus-wrapper > div {
                  padding-top: 0px
                }
              }
            `
      iframeRef.current.contentWindow.document.head.appendChild(style)
      setHasLoaded(true)
    }
    iframeRef.current.addEventListener('load', handleIframe)

    return () => iframeRef.current.removeEventListener('load', handleIframe)
  }, [])

  useEffect(() => {
    const handleMessage = event => {
      if (event.data.theme) {
        setTheme(event.data.theme)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [theme])

  const styledTheme =
    theme === 'dark'
      ? {
          links: '#E9DAAC',
          active: '#FAFAFA',
          background: '#111216',
          external: '#28292D',
        }
      : {
          links: '#6166DC',
          active: '#000',
          background: '#FAFAFA',
          external: '#E6E6E7',
        }

  return (
    <ThemeProvider theme={styledTheme}>
      <Layout
        background={background}
        location={location}
        nav={navConfig}
        footer={footerConfig}
      >
        <SEO
          title={contentful.seo.title}
          description={contentful.seo.description}
          image={contentful.seo.image.file.url}
          pathname={location.pathname}
        />
        <LayoutHeroMobile background="transparent">
          <Section style={{ position: 'relative' }} narrow>
            <Controls isMobile={dimension === 361}>
              <div>
                <ControlButton
                  onClick={() => setDimension(1140)}
                  style={{ opacity: dimension === 1140 ? 1 : 0.3 }}
                >
                  <DesktopIcon fill={styledTheme.active} />
                </ControlButton>
                <ControlButton
                  onClick={() => setDimension(946)}
                  style={{ opacity: dimension === 946 ? 1 : 0.3 }}
                >
                  <TabletIcon fill={styledTheme.active} />
                </ControlButton>
                <ControlButton
                  onClick={() => setDimension(361)}
                  style={{ opacity: dimension === 361 ? 1 : 0.3 }}
                >
                  <MobileIcon fill={styledTheme.active} />
                </ControlButton>
              </div>
              <Divider style={{ background: styledTheme.active }} />
              <Anchor
                href="https://github.com/narative/gatsby-theme-novela/"
                target="_blank"
                rel="noopener"
              >
                Get this theme <ExternalLinkIcon />
              </Anchor>
            </Controls>
            <PreviewContainer
              style={{
                maxWidth: `${dimension}px`,
                opacity: hasLoaded ? 1 : 0,
              }}
              isMobile={dimension === 361}
            >
              <Preview
                id="Iframe__Novela"
                src="https://novela.narative.co"
                ref={iframeRef}
                isMobile={dimension === 361}
              />
              <PreviewLink
                href="https://novela.narative.co"
                target="_blank"
                rel="noopener"
              >
                <PreviewIcon fill={styledTheme.active} />
              </PreviewLink>
            </PreviewContainer>
          </Section>
          <Mobile>
            <Section narrow>
              <MediaContainer>
                <Image src={data.novelaDesktop.childImageSharp.fluid} />
              </MediaContainer>
            </Section>
            <Section>
              <MobileAnchor
                href="https://github.com/narative/gatsby-theme-novela/"
                target="_blank"
                rel="noopener"
              >
                Get this theme
              </MobileAnchor>
            </Section>
          </Mobile>
        </LayoutHeroMobile>
      </Layout>
    </ThemeProvider>
  )
}

export default NovealPage

export const pageQuery = graphql`
  query NovealPageQuery {
    allContentfulPage(filter: { pageName: { eq: "Novela" } }) {
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
    novelaDesktop: file(name: { regex: "/labs-theme-novela-desktop/" }) {
      childImageSharp {
        fluid(maxWidth: 1060, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

const PreviewContainer = styled.div<{ isMobile: boolean }>`
  position: relative;
  width: 100%;
  transition: opacity 0.5s;
  margin: ${p => (p.isMobile ? '35px auto -65px' : '65px auto -65px')};
  padding: 0;

  ${media.desktop_large`
    margin: ${p => (p.isMobile ? '35px auto -65px' : '65px auto -65px')};
  `}

  ${media.desktop_medium`
    margin: ${p => (p.isMobile ? '35px auto -65px' : '15px auto -65px')};
  `}

  ${media.tablet`
    height: 0px;
    visibility: hidden;
    opacity: 0;
  `}

@media screen and (max-height: 800px) {
  margin: ${p => (p.isMobile ? '35px auto -65px' : '25px auto -65px')};
    }

  &::before {
    content: '';
    position: absolute;
    width: 90%;
    height: 94%;
    left: 5%;
    top: 5%;
    background: rgba(0, 0, 0, 0.24);
    filter: blur(120px);

    ${media.tablet`
      background: rgba(0, 0, 0, 0.1);
      filter: blur(100px);
    `}
  }
`

const Preview = styled.iframe<{ isMobile: boolean }>`
  position: relative;
  width: 100%;
  border: none;
  height: ${p => (p.isMobile ? '700px' : '600px')};
`

const PreviewLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 33px;
  height: 28px;
  right: 0;
  top: 0;
  background: ${p => p.theme.external};
`

const PreviewIcon = ({ fill }: { fill: string }) => (
  <svg
    width="13"
    height="12"
    viewBox="0 0 13 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.75473 1.33325H2.34703L4.58175 3.5104C4.85241 3.77409 4.85807 4.20727 4.59438 4.47794C4.33068 4.7486 3.8975 4.75426 3.62684 4.49056L1.3686 2.29051V2.64891C1.3686 3.02679 1.06223 3.33312 0.684348 3.33312C0.306469 3.33312 9.52478e-05 3.02679 9.52478e-05 2.64891V0.68421C9.52478e-05 0.306331 0.306426 0 0.684305 0H2.75473C3.1229 0 3.42136 0.298458 3.42136 0.666625C3.42136 1.03479 3.1229 1.33325 2.75473 1.33325ZM4.78916 0.66337C4.78916 0.296856 5.09386 0 5.47007 0H11.6317C12.3844 0 13.0002 0.600223 13.0002 1.33325V6.64862C13.0002 7.02652 12.6938 7.33287 12.3159 7.33287C11.938 7.33287 11.6317 7.02652 11.6317 6.64862V1.32674H5.47007C5.09386 1.32674 4.78916 1.02988 4.78916 0.66337ZM7.53012 12C7.90633 12 8.21103 11.7031 8.21103 11.3366C8.21103 10.9701 7.90633 10.6733 7.53012 10.6733L1.36851 10.6733L1.36851 5.35138C1.36851 4.97348 1.06216 4.66713 0.684253 4.66713C0.306351 4.66713 5.10883e-07 4.97348 4.76972e-07 5.35138L0 10.6667C-6.57783e-08 11.3998 0.615761 12 1.36851 12L7.53012 12ZM12.9995 9.33264C12.9995 8.96417 12.6931 8.66602 12.3152 8.66602C11.9374 8.66602 11.631 8.96417 11.631 9.33264V9.71062L9.37208 7.50992C9.10142 7.24623 8.66824 7.25188 8.40454 7.52254C8.14085 7.79321 8.14651 8.22639 8.41717 8.49008L10.6505 10.6659H10.2625C9.8846 10.6659 9.57822 10.964 9.57822 11.3325C9.57822 11.701 9.8846 11.9991 10.2625 11.9991H12.3152C12.6931 11.9991 12.9995 11.701 12.9995 11.3325V9.33264Z"
      fill={fill}
    />
  </svg>
)

const Controls = styled.div<{ isMobile: boolean }>`
  position: absolute;
  right: 40px;
  top: ${p => (p.isMobile ? '-70px' : '-100px')};
  display: flex;
  align-items: center;
  z-index: 10;

  ${media.tablet`
    display: none;
  `}
`

const ControlButton = styled.button`
  &:not(:last-child) {
    margin-right: 20px;
  }
`

const Divider = styled.div`
  height: 20px;
  width: 1px;
  background: red;
  margin: 0 35px;
  opacity: 0.2;
`

const Anchor = styled.a`
  color: ${p => p.theme.links};
  font-weight: 600;

  svg {
    margin-left: 11px;
    background: ${p => p.theme.background};
    width: 21px;
    height: 17px;
    right: -1px;
    position: relative;

    * {
      fill: ${p => p.theme.links};
    }
  }
`

const Mobile = styled.div`
  ${media.desktop_up`
    display: none;
  `}
`

const MediaContainer = styled.div`
  position: relative;
  margin-top: 85px;

  &::before {
    content: '';
    position: absolute;
    width: 90%;
    height: 94%;
    left: 5%;
    top: 5%;
    background: rgba(0, 0, 0, 0.1);
    filter: blur(100px);
  }
`

const MobileAnchor = styled.a`
  color: ${p => p.theme.links};
  height: 45px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${p => p.theme.links};
  border-radius: 5px;
  margin-top: 45px;
  font-weight: 600;
`

const DesktopIcon = ({ fill }) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.4149 23.0006H5.41182C4.87707 23.0006 4.38821 22.6985 4.14906 22.2202C3.90991 21.7419 3.96152 21.1695 4.28237 20.7417L6.16479 18.2286C6.28698 18.0657 6.35304 17.8676 6.35304 17.6639V9.82363C6.35304 8.26418 7.61722 7 9.17667 7H20.4712C22.0307 7 23.2948 8.26418 23.2948 9.82363V16.4121C23.2948 17.9716 22.0307 19.2357 20.4712 19.2357H11.0591C10.5393 19.2357 10.1179 18.8143 10.1179 18.2945C10.1179 17.7747 10.5393 17.3533 11.0591 17.3533H20.4712C20.991 17.3533 21.4124 16.9319 21.4124 16.4121V9.82363C21.4124 9.30382 20.991 8.88242 20.4712 8.88242H9.17667C8.65685 8.88242 8.23546 9.30382 8.23546 9.82363V17.6639C8.23546 18.2749 8.0373 18.8693 7.67073 19.3581L6.35304 21.1182H23.6525L23.389 20.6005C23.1767 20.1384 23.3699 19.5913 23.8252 19.3649C24.2806 19.1385 24.8334 19.3147 25.0737 19.7628L25.6761 20.9676C25.8944 21.4049 25.871 21.9241 25.6142 22.34C25.3574 22.7559 24.9037 23.0093 24.4149 23.01V23.0006Z"
      fill={fill}
    />
  </svg>
)

const TabletIcon = ({ fill }) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 25H17.5C17.0398 25 16.6667 24.6269 16.6667 24.1666C16.6667 23.7064 17.0398 23.3333 17.5 23.3333H20C20.4602 23.3333 20.8333 22.9602 20.8333 22.5V7.5C20.8333 7.03976 20.4602 6.66666 20 6.66666H10C9.53976 6.66666 9.16666 7.03976 9.16666 7.5V22.5C9.16666 22.9602 9.53976 23.3333 10 23.3333H12.5C12.9602 23.3333 13.3333 23.7064 13.3333 24.1666C13.3333 24.6269 12.9602 25 12.5 25H10C8.61929 25 7.5 23.8807 7.5 22.5V7.5C7.5 6.11929 8.61929 5 10 5H20C21.3807 5 22.5 6.11929 22.5 7.5V22.5C22.5 23.8807 21.3807 25 20 25ZM15 21.6666C14.5398 21.6666 14.1667 22.0397 14.1667 22.5C14.1667 22.9602 14.5398 23.3333 15 23.3333C15.4602 23.3333 15.8333 22.9602 15.8333 22.5C15.8333 22.0397 15.4602 21.6666 15 21.6666Z"
      fill={fill}
    />
  </svg>
)

const MobileIcon = ({ fill }) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.4851 25H17.6517C17.1915 25 16.8184 24.6269 16.8184 24.1667C16.8184 23.7064 17.1915 23.3333 17.6517 23.3333H18.4851C18.9453 23.3333 19.3184 22.9602 19.3184 22.5V7.50003C19.3184 7.03979 18.9453 6.66669 18.4851 6.66669H11.8184C11.3582 6.66669 10.9851 7.03979 10.9851 7.50003V22.5C10.9851 22.9602 11.3582 23.3333 11.8184 23.3333H12.6517C13.112 23.3333 13.4851 23.7064 13.4851 24.1667C13.4851 24.6269 13.112 25 12.6517 25H11.8184C10.4377 25 9.31842 23.8807 9.31842 22.5V7.50003C9.31842 6.11932 10.4377 5.00003 11.8184 5.00003H18.4851C19.8658 5.00003 20.9851 6.11932 20.9851 7.50003V22.5C20.9851 23.8807 19.8658 25 18.4851 25ZM15.1517 21.6667C14.6915 21.6667 14.3184 22.0398 14.3184 22.5C14.3184 22.9602 14.6915 23.3333 15.1517 23.3333C15.612 23.3333 15.9851 22.9602 15.9851 22.5C15.9851 22.0398 15.612 21.6667 15.1517 21.6667Z"
      fill={fill}
    />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M8.00001 4.99999L5.33334 7.66666L7.33334 7.66666L7.33334 13.6667L8.66668 13.6667L8.66668 7.66666L10.6667 7.66666L8.00001 4.99999ZM2.00001 13.6667L6.00001 13.6667L6.00001 12.34L2.00001 12.34L2.00001 2.98666L14 2.98666L14 12.34L10 12.34L10 13.6667L14 13.6667C14.7333 13.6667 15.3333 13.0667 15.3333 12.3333L15.3333 2.99999C15.3333 2.26666 14.7333 1.66666 14 1.66666L2.00001 1.66666C1.26668 1.66666 0.666678 2.26665 0.666677 2.99999L0.666677 12.3333C0.666677 13.0667 1.26668 13.6667 2.00001 13.6667Z"
        fill="#6166DC"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="translate(16 16) rotate(-180)"
        />
      </clipPath>
    </defs>
  </svg>
)

import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { useInView } from 'react-intersection-observer'

import Divider from '@components/Divider'
import Layout from '@components/Layout'
import SEO from '@components/SEO'

import AboutHero from '../sections/about/About.Hero'
import AboutTeam from '../sections/about/About.Team'
import AboutChoose from '../sections/about/About.Choose'
import AboutPhotographs from '../sections/about/About.Photographs'
import AboutIndependent from '../sections/about/About.Independent'
import AboutStudioLabs from '../sections/about/About.StudioLabs'
import AboutContact from '../sections/about/About.Contact'

function AboutPage({ data, location }) {
  const [ref, inView] = useInView({ threshold: 0.8 })

  const contentful = data.allContentfulPage.edges[0].node
  const pageBackground =
    'linear-gradient(#08080B,rgb(17, 18, 22) 60%,#1a1e24 100%)'

  const navConfig = {
    offset: true,
    fixed: true,
    theme: 'light',
  }

  const footerConfig = {
    visible: true,
    theme: 'light',
  }

  return (
    <Layout background={pageBackground} nav={navConfig} footer={footerConfig}>
      <SEO
        title={contentful.seo.title}
        description={contentful.seo.description}
        image={contentful.seo.image.file.url}
        pathname={location.pathname}
      />

      <TopGradient>
        <AboutHero />
        <AboutTeam />
        <Divider />
      </TopGradient>
      <TransitionLayer style={{ opacity: inView ? 1 : 0 }} />
      <MiddleGradient>
        <AboutChoose />
      </MiddleGradient>
      <Divider />
      <BottomGradient>
        <AboutPhotographs />
        <AboutIndependent />
        <AboutStudioLabs inView={inView} />
        <div ref={ref} style={{ position: 'relative', zIndex: inView ? 2 : 1 }}>
          <AboutContact inView={inView} />
        </div>
      </BottomGradient>
    </Layout>
  )
}

export default AboutPage

const TopGradient = styled.div`
  background: linear-gradient(#08080b, #191d23);
`

const MiddleGradient = styled.div`
  position: relative;
  background: #111216;
`

const BottomGradient = styled.div`
  position: relative;
  background: linear-gradient(#111216, #08080b);

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    bottom: -310px;
    height: 310px;
    left: 0;
    background: #08080b;
  }
`

const TransitionLayer = styled.div`
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #d8d7d8;
  z-index: 1;
  transition: opacity 1s;
  will-change: opacity;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    bottom: -310px;
    height: 310px;
    left: 0;
    background: #d8d7d8;
  }
`

export const pageQuery = graphql`
  query AboutPageQuery {
    allContentfulPage(filter: { pageName: { eq: "About" } }) {
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
  }
`
import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'

import Divider from '@components/Divider'
import Layout from '@components/Layout'
import SEO from '@components/SEO'

import media from '@styles/media'

import AboutHero from '../sections/about/About.Hero'
import AboutTeam from '../sections/about/About.Team'
import AboutValues from '../sections/about/About.Values'
import AboutPhotographs from '../sections/about/About.Photographs'
import AboutTestimonial from '../sections/about/About.Testimonials'
import AboutStudioLabs from '../sections/about/About.StudioLabs'
import AboutContact from '../sections/about/About.Contact'

const pageQuery = graphql`
  {
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

function AboutPage({ location }) {
  const { allContentfulPage } = useStaticQuery(pageQuery)

  const contentful = allContentfulPage.edges[0].node
  const pageBackground = '#08070B'

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

      <AboutHero />
      <TeamGradient>
        <AboutTeam />
        <Divider />
      </TeamGradient>
      <MiddleGradient>
        {/* <AboutValues /> */}
        <AboutPhotographs />
      </MiddleGradient>
      <BottomGradient>
        {/* <AboutTestimonial /> */}
        {/* <AboutStudioLabs /> */}
        <AboutContact />
      </BottomGradient>
    </Layout>
  )
}

export default AboutPage

const TeamGradient = styled.div`
  background: linear-gradient(
    ${p => p.theme.colors.hero},
    #101217 85%,
    #191d23
  );

  ${media.phablet`
    background: linear-gradient(
      ${p => p.theme.colors.hero},
      #191d23 75%,
    );
  `}
`

const MiddleGradient = styled.div`
  background: #111216;
`

const BottomGradient = styled.div`
  background: linear-gradient(#111216, #08080b);
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

  ${media.tablet`
    &::before {
      content: '';
      position: absolute;
      height: 549px;
      bottom: -549px;
      background: #d8d7d8;
      z-index: 1;
    }
  `}
`

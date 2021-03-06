import React from 'react'
import { graphql } from 'gatsby'

import Layout from '@components/Layout'
import SEO from '@components/SEO'

import HomeHero from '../sections/home/Home.Hero'
import HomeAbout from '../sections/home/Home.About'
import HomeContact from '../sections/home/Home.Contact'
import HomeTestimonial from '../sections/home/Home.Testimonial'
import HomeServices from '../sections/home/Home.Services'

/**
 * The home page of Narative.co!
 */
function IndexPage({ data, location }) {
  const contentful = data.allContentfulPage.edges[0].node
  const navConfig = {
    offset: true,
    fixed: true,
    theme: 'light',
  }

  return (
    <Layout
      nav={navConfig}
      location={location}
      background="#08070B"
      withFooter={false}
    >
      <>
        <SEO
          title={contentful.seo.title}
          description={contentful.seo.description}
          image={contentful.seo.image.file.url}
          pathname={location.pathname}
        />
        <HomeHero />
        <HomeAbout />
        <HomeServices />
        {/* <HomeTestimonial /> */}
        <HomeContact />
      </>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query HomePageQuery {
    allContentfulPage(filter: { pageName: { eq: "Home" } }) {
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

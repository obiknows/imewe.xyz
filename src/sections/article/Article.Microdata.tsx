import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

import SEO from '@components/SEO'

import { IArticleNode } from '@typings'

const PublicLogoQuery = graphql`
  query ArticlePublicationQuery {
    url: allContentfulHomePage {
      edges {
        node {
          seo {
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

// An SEO bomb we want to keep. This is another standard that’s worth setting up.
export default ({ article, location }: { article: IArticleNode }) => (
  <StaticQuery
    query={PublicLogoQuery}
    render={({ url: { edges } }) => (
      <Microdata
        article={article}
        publicationLogo={edges[0].node.seo.image.file.url}
        location={location}
        sectionName={article.title}
        sectionUrl={location.href}
      />
    )}
  />
)

const Microdata = ({
  article: {
    canonical,
    title,
    excerpt,
    author,
    hero,
    publicationDate,
    updatedAt,
    backgroundImage,
    readingTime,
    path,
  },
  location,
  publicationLogo,
}: {
  article: IArticleNode
  location: Location
  publicationLogo: string
  sectionName: string
  sectionUrl: string
}) => {
  let isoDateStrPublished
  let isoDateStrUpdated

  try {
    isoDateStrPublished = new Date(publicationDate!).toISOString()
    isoDateStrUpdated = new Date(updatedAt!).toISOString()
  } catch (error) {
    // Now all browsers can parse our date string. that’s fine. The crawler can
    console.warn(error)
  }

  return (
    <SEO
      title={title}
      description={excerpt}
      image={backgroundImage.seo.src}
      canonical={canonical}
      pathname={path}
      readingTime={readingTime.text}
      published={isoDateStrPublished}
    >
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "${location.href}"
            },
            "headline": "${title}",
            "image": "${hero.Article__Hero.src}",
            "datePublished": "${isoDateStrPublished}",
            "dateModified": "${isoDateStrUpdated}",
            "author": {
              "@type": "Person",
              "name": "Narative Editors"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Narative",
              "logo": {
                "@type": "ImageObject",
                "url": "${publicationLogo}"
              }
            },
            "description": "${excerpt.replace(/"/g, '\\"')}"
          }
        `}
      </script>
    </SEO>
  )
}

import React, { useEffect, useContext } from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import ReactHtmlParser from 'react-html-parser'
import styled, { css } from 'styled-components'
import { ContactContext } from '@components/Contact/Contact.Context'
import Code from '@components/Code/Code'

import media from '@styles/media'

import { IRichText } from '@typings'

// Specifically handling Twitter embeds that get passed from our htmls htmlRenderer
function transform(node) {
  if (node.name === 'twitter' && node.attribs.twitterid) {
    return (
      <TwitterTweetEmbed
        key={node.attribs.twitterid}
        tweetId={node.attribs.twitterid}
      />
    )
  }
}

/**
 * we’re able to create a Call To Action embedded entry within Contentful, which allows
 * the author to embed links to our contact page. Since we have a Contact slidein modal
 * it's better to override the default functionality with a dynamic togglecontact
 */
function handleContactUs() {
  const { toggleContact } = useContext(ContactContext)

  useEffect(() => {
    const ctas = Array.from(document.getElementsByClassName('CallToAction'))
    const links = Array.from(document.querySelectorAll('article a'))

    ctas.forEach(cta => {
      const left = document.createElement('div')
      left.setAttribute('class', 'CallToAction__left')
      left.innerHTML = CallToActionLeftCorner
      cta.appendChild(left)

      const right = document.createElement('div')
      right.setAttribute('class', 'CallToAction__right')
      right.innerHTML = CallToActionRightCorner
      cta.appendChild(right)
    })

    links.forEach(link => {
      if (link.pathname === '/contact') {
        link.addEventListener('click', toggleContact, false)
      }
    })
  }, [])
}

function RichText({
  content,
  contentRef,
  children,
  ...props
}: React.SFC<IRichText>) {
  handleContactUs()

  return (
    <Content ref={contentRef} {...props}>
      <ReactMarkdown
        source={content}
        escapeHtml={false}
        renderers={{
          code: Code,
        }}
      />
      {children}
    </Content>
  )
}

export default RichText

const imageWidths = {
  regular: '680px',
  large: '1004px',
  full: '100vw',
}

const articleWidth = css`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;

  ${media.tablet`
    padding: 0 20px;
  `};
`
const selectionColor = css`
  &::selection {
    background: #c9e1f4; /* WebKit/Blink Browsers */
  }

  &::-moz-selection {
    background: #c9e1f4; /* Gecko Browsers */
  }
`

const transitionColor = css`
  transition: color 0.25s ease;
`

const callToAction = css`
  .CallToAction {
    position: relative;
    width: 100%;
    max-width: 1140px;
    margin: 30px auto 65px;
    padding: 65px;
    background: ${p => p.theme.mode.cta.background};
    transition: background 0.25s;

    p {
      position: relative;
      padding-bottom: 35px;
      color: ${p => p.theme.colors.moon};

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 125px;
        height: 1px;
        background: ${p => p.theme.mode.cta.border};
      }
    }

    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;

      &:first-child {
        margin-right: 55px;
      }

      svg {
        margin-right: 13px;

        path {
          fill: ${p => p.theme.mode.links};
        }
      }
    }

    &__content {
      width: 100%;
      max-width: 680px;
      margin: 0 auto;
    }

    stop {
      stop-color: ${p => p.theme.mode.cta.corner};
    }

    &__left {
      position: absolute;
      top: -7px;
      left: -1px;
    }

    &__right {
      position: absolute;
      bottom: -1px;
      right: -1px;
    }

    ${media.tablet`
      background: ${p => p.theme.mode.preview.bg}
      box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      margin: 20px 20px 55px;
      padding: 0;
      width: auto;

      &__left,
      &__right {
        display: none;
      }

      h3 {
        padding: 50px 24px 0;
        margin-bottom: 15px;
        text-align: center;
      }

      p {
        margin-bottom: 50px;
        padding: 0 24px;
        text-align: center;
        font-size: 18px;

        &::after {
          content: none;
        }
      }

      &__links {
        display: flex;
        flex-direction: row-reverse;
        border-top: 1px solid  ${p => p.theme.mode.cta.border};
      }

      a {
        display: flex;
        flex: 1;
        height: 58px;
        font-size: 18px;
        text-decoration: none;

        svg {
          display: none;
        }

        &:first-child {
          margin-right: 0;
        }

        &:nth-child(2) {
          font-weight: 400;
          color: ${p => p.theme.colors.moon};
          border-right: 1px solid  ${p => p.theme.mode.cta.border};
        }
      }
    `}
  }
`

const highlight = css`
  highlight {
    display: inline;
    cursor: pointer;
    text-decoration: none;
    background: rgba(233, 218, 172, 0.3);
    transition: background 0.25s;

    &:hover {
      background: rgba(233, 218, 172, 0.4);
    }

    & > p {
      display: inline-block;
      margin-bottom: 0;
    }
  }
`

const prismStyles = {
  token: `#fff`,
  languageJavascript: `#e8696b`,
  javascript: `#e8696b`,
  background: `#292c34`,
  comment: `#5e6a76`,
  string: `#a8e2a8`,
  var: `#b3bac5`,
  number: `#e4854d`,
  constant: `#b3bac5`,
  plain: `#fff`,
  doctype: `#e8696b`,
  tag: `#e8696b`,
  keyword: `#d49fd4`,
  boolean: `#ff5874`,
  function: `#5F8DC3`,
  parameter: `#F9965D`,
  className: `#ffcf74`,
  attrName: `#bf87ba`,
  attrValue: `#a8e2a8`,
  interpolation: `#fff`,
  punctuation: `#5FA8AA`,
  ['maybe-class-name']: `#fff`,
  property: `#80cbc4`,
  propertyAccess: `#fff`,
  namespace: `#b2ccd6`,
  highlight: `rgba(255,255,255,0.07)`,
  highlightBorder: `#e1bde2`,
  dom: `#5F8DC3`,
  operator: `#5FA8AA`,
}

function toKebabCase(str: string): string {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-')
}

const PrismCSS = css`
  .language-shell {
    .token-line {
      line-height: 2;
    }
  }

  .prism-code {
    overflow: auto;
    width: 100%;
    max-width: 744px;
    margin: 0 auto;
    padding: 32px;
    font-size: 13px;
    margin: 15px auto 50px;
    border-radius: 5px;
    font-family: 'Operator Mono', Consolas, Menlo, Monaco, source-code-pro,
      'Courier New', monospace;

    background: ${prismStyles.background};

    .token-line {
      border-left: 3px solid transparent;

      ${Object.keys(prismStyles)
        .map(key => {
          return `.${toKebabCase(key)}{color:${prismStyles[key]};}`
        })
        .reduce((curr, next) => curr + next, ``)};

      & > span {
      }
    }

    .number-line {
      display: inline-block;
      width: 32px;
      user-select: none;
      opacity: 0.3;
      color: #dcd9e6;

      ${media.tablet`
        opacity: 0;
        width: 0;
      `};
    }

    .token-line.highlight-line {
      margin: 0 -32px;
      padding: 0 32px;
      background: ${p => prismStyles.highlight};
      border-left: 3px solid ${p => prismStyles.highlightBorder};

      ${media.tablet`
        margin: 0 -20px;
        padding: 0 20px;
      `};
    }

    .operator + .maybe-class-name {
      color: #ffcf74 !important;
    }

    .plain ~ .operator {
      color: #5fa8aa !important;
    }

    ${media.desktop`
      left: -26px;
    `};

    ${media.tablet`
      max-width: 526px;
      padding: 20px 20px;
      left: 0;
    `};

    ${media.phablet`
      text-size-adjust: none;
      border-radius: 0;
      margin: 0 auto 25px;
      padding: 25px 20px;
      overflow: initial;
      width: unset;
      max-width: unset;
      float: left;
      min-width: 100%;
      overflow: initial;
      position: relative;
    `};
  }
`

const Content = styled.article`
  position: relative;
  ${selectionColor}

  p:empty {
    display: none;
  }

  /* Custom Components form Contentful */
  ${callToAction}
  ${highlight}
  ${PrismCSS}

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${articleWidth};
    font-family: ${p => p.theme.fontfamily.serif};
    * {
      font-family: ${p => p.theme.fontfamily.serif};
    }
    color: ${p => p.theme.mode.text};
  }

  h1,
  h1 * {
    font-weight: 700;
    font-size: 2.8rem;
    line-height: 1.1;

    ${media.desktop_up`
      font-size: 4.2rem;
      margin-bottom: 2.5rem;
    `};
  }

  h2,
  h2 * {
    font-size: 2.2rem;
    line-height: 1.45;
    margin-bottom: 2rem;
    padding-top: 40px;

    ${media.desktop_up`
      font-size: 3.2rem;
      paddng-top: 65px;
      margin-bottom: 2.5rem;
    `};
  }

  h3,
  h3 * {
    font-size: 2.2rem;
    line-height: 1.45;
    margin-bottom: 1rem;

    ${media.desktop`
      margin-top: 0;
      margin-bottom: 0.75rem;
    `};
  }

  a,
  a * {
    color: ${p => p.theme.mode.links};
    ${transitionColor};

    &:visited {
      color: ${p => p.theme.mode.links};
      opacity: 0.85;
    }

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  figure {
    margin-bottom: 0;

    img {
      margin-bottom: 15px;
    }

    figcaption {
      ${articleWidth};
      font-family: ${p => p.theme.fontfamily.sansSerif};
      color: ${p => p.theme.mode.text};
      opacity: 0.5;
      font-size: 16px;
      display: block;
      margin-bottom: 75px;

      ${media.tablet`
        margin-bottom: 30px;
        font-size: 18px;
      `}
    }
  }

  blockquote {
    position: relative;
    ${articleWidth};
    font-style: italic;
    ${transitionColor};

    p {
      position: relative;
      padding-left: 30px;
      margin: 30px auto 65px;

      &::before {
        content: '';
        position: absolute;
        width: 2px;
        left: 0;
        top: 8px;
        bottom: 8px;
        background: ${p => p.theme.mode.text};
      }

      ${media.tablet`
        margin: 15px auto 45px;
      `}
    }
  }

  blockquote.pull__quote {
    margin: 30px auto 65px;
    line-height: 1.25;
    max-width: 780px;
    color: ${p => p.theme.mode.text};
    font-family: ${p => p.theme.fontfamily.serif};
    font-size: 36px;
    font-style: italic;
    ${transitionColor};

    ${media.tablet`
      margin: 0 auto 30px;
      padding: 20px;
    `}
  }

  ul,
  ol {
    ${articleWidth} list-style: none;
    counter-reset: list;
    color: ${p => p.theme.mode.text};
    ${transitionColor};
    position: relative;
    padding-left: 30px;
    margin-bottom: 30px;

    li {
      position: relative;
      margin-bottom: 15px;

      ${media.tablet`
          padding-left: 20px;
        `}

      p {
        ${media.tablet`
          padding: 0;
        `}
      }
    }

    li > * {
      display: inline;
    }

    li::before {
      width: 3rem;
      display: inline-block;
      position: absolute;
      color: ${p => p.theme.colors.grey.mid};
    }
  }

  ul li::before {
    content: '';
    position: absolute;
    left: -3rem;
    top: 1.5rem;
    height: 8px;
    width: 8px;
    background: ${p => p.theme.mode.text};

    ${media.tablet`
      left: 0;
    `}
  }

  ol li::before {
    counter-increment: list;
    content: counter(list) '.';
    font-weight: 600;
    position: absolute;
    left: -3rem;
    top: 0.3rem;
    font-size: 2rem;

    ${media.tablet`
      left: 0;
    `}
  }

  p {
    ${articleWidth};
    margin-bottom: 35px;
    line-height: 1.55;
    font-size: 22px;
    color: ${p => p.theme.mode.text};


    b {
      font-weight: 800;
    }
  }

  img {
    display: inline-block;
    position: relative;
    max-width: 100%;
    height: auto;
    z-index: 0;
    margin: 45px auto 85px;
    border-radius: 5px;

    ${media.tablet`
      margin: 10px auto 45px;
    `}
  }

  .image__container {
    text-align: center;
  }

  img.image__with_shadow {
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.15);
  }

  img.image__regular {
    width: 100%;
    max-width: ${imageWidths.regular};

    ${media.tablet`
      width: calc(100vw - 40px);
    `}
  }

  img.image__large {
    width: 100%;
    max-width: ${imageWidths.large};

    ${media.tablet`
      border-radius: 0;
    `}
  }

  img.image__full {
    width: 100%;
    max-width: ${imageWidths.full};
    border-radius: 0;
  }

  table {
    ${articleWidth};
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid #dfe3e8;
  }

  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
    color: ${p => p.theme.mode.text};
  }

  th {
    text-transform: uppercase;
    font-weight: 600;
  }

  tr {
    &:hover {
      background-color: #f4f6f8;
    }
  }

  td {
    padding: 10px 8px;
    border-bottom: 1px solid #dfe3e8;
    vertical-align: top;
    white-space: nowrap;
  }

  hr {
    width: 250px;
    height: 1px;
    margin: 30px auto;
    opacity: 0.33;
  }

  .twitter-tweet {
    text-align: center;
    margin: 0 auto;
    padding: 20px 0 55px 0;
    width: 540px !important;
  }

  hr {
    ${articleWidth};
    position: relative;
    width: 100%;
    margin: 25px auto 60px;
    border: 0;
    height: 14.36px;
    background-image: url("${p => p.theme.mode.hr}");
    background-repeat: repeat-x;
    box-sizing: border-box;

    ${media.tablet`
      width: calc(100vw - 40px);
      margin: 0px auto 50px;
    `};
  }
`

const CallToActionLeftCorner = `
  <svg
    width="136"
    height="14"
    viewBox="0 0 136 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 13.5C0.723862 13.5 0.5 13.2761 0.5 13L0.500001 0.500001L135 0.500011C135.276 0.500011 135.5 0.723869 135.5 1.00001C135.5 1.27615 135.276 1.50001 135 1.50001L1.5 1.5L1.5 13C1.5 13.2761 1.27614 13.5 1 13.5Z"
      fill="url(#paint0_linear)"
      fill-opacity="0.8"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="1.00003"
        y1="2.04348"
        x2="133.282"
        y2="2.04346"
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset="1" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
`

const CallToActionRightCorner = `
  <svg
    width="121"
    height="14"
    viewBox="0 0 121 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M120 0C120.276 0 120.5 0.223858 120.5 0.5V13.5H1C0.723858 13.5 0.5 13.2761 0.5 13C0.5 12.7239 0.723858 12.5 1 12.5H119.5V0.5C119.5 0.223858 119.724 0 120 0Z"
      fill="url(#paint1_linear)"
      fill-opacity="0.8"
    />
    <defs>
      <linearGradient
        id="paint1_linear"
        x1="120"
        y1="13"
        x2="53.4407"
        y2="13"
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset="1" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
`

import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

interface MenuFloatState {
  y: number
  show: boolean
}

interface MenuFloatProps {
  author: number
  mode?: string
}

/**
 * Values we get to be able to ensure the positionting context are correct!
 * Padding is derviced from the CSS value in Editor
 */
const MENU_WIDTH: number = 225
const MENU_HEIGHT: number = 46

function ArticleHighlight({ article, mode }: MenuFloatProps) {
  const { author, shortUrl } = article

  const menuRef = useRef<HTMLDivElement>(null)
  const [text, setText] = useState<string>('')
  const [canTweet, setCanTweet] = useState<boolean>(true)
  const [copied, setCopied] = useState<boolean>(false)
  const [{ y, show }, setPosition] = useState<MenuFloatState>({
    y: 0,
    show: false,
  })

  const share = generateShare(text, 'IMEWE Authors', shortUrl)

  useEffect(() => {
    const highlights: Element[] = Array.from(
      document.getElementsByTagName('highlight')
    )

    highlights.forEach(highlight => {
      let timeout

      function handleMouseOver() {
        clearTimeout(timeout)
        const y: number = highlight.offsetTop - MENU_HEIGHT - 5
        setPosition({ y, show: true })

        const tweetLimit = 280
        const otherCharactersInTweet = ' —  ' // 3 spaces, 1 emdash
        const url = `ntve.co/${shortUrl}`
        const tweet =
          highlight.innerText + 'Imewe Authors' + url + otherCharactersInTweet

        setText(highlight.innerText)
        setCanTweet(tweet.length <= tweetLimit)
      }

      function handleMouseOut(event) {
        const { relatedTarget } = event
        const isStillHoveringMenu: boolean =
          relatedTarget === menuRef.current ||
          menuRef.current.contains(relatedTarget)

        // If it's a child or the current menufloat, don't close
        if (isStillHoveringMenu) return

        timeout = setTimeout(() => {
          setPosition({ y: 0, show: false })
          setText('')
          setCopied(false)
        }, 100)
      }

      highlight.addEventListener('mouseover', handleMouseOver)
      highlight.addEventListener('mouseout', handleMouseOut)
      menuRef.current.addEventListener('mouseout', handleMouseOut)

      return () => {
        highlight.removeEventListener('mouseover', handleMouseOver)
        highlight.removeEventListener('mouseout', handleMouseOut)
        menuRef.current.removeEventListener('mouseout', handleMouseOut)
      }
    })
  }, [])

  function handleCopyClick() {
    const tempInput = document.createElement('input')
    document.body.appendChild(tempInput)
    tempInput.setAttribute('value', text)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
    setCopied(true)
  }

  /**
   * Setting the ability to tweet. If the user highlights more than the allowed
   * characters we need to give them feedback that it's too long to tweet.
   */
  useEffect(() => {}, [text])

  return (
    <MenuFloat
      style={{
        top: `${y}px`,
        display: show ? 'flex' : 'none',
        pointerEvents: show ? 'initial' : 'none',
      }}
      mode={mode}
      ref={menuRef}
    >
      <MenuText>Share: </MenuText>
      <ReferralLink disabled={!canTweet} share={share.twitter}>
        <TwitterIcon />
      </ReferralLink>
      <ReferralLink disabled={false} share={share.linkedin}>
        <LinkedInIcon />
      </ReferralLink>
      <MenuDivider />
      <MenuButton onClick={handleCopyClick}>
        {copied ? <CopiedIcon /> : <CopyIcon />}
      </MenuButton>
    </MenuFloat>
  )
}

export default ArticleHighlight

function ReferralLink({ disabled, share, children }) {
  function handleClick(event) {
    event.preventDefault()
    if (disabled) return

    window.open(
      share,
      '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'
    )
  }

  return (
    <MenuShare
      href={disabled ? '' : share}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </MenuShare>
  )
}

function generateShare(shareText: string, author: string, shortUrl: string) {
  if (!shareText) return {}

  const url = `ntve.co/${shortUrl}`

  return {
    twitter: `https://twitter.com/intent/tweet?text="${shareText}" — ${author} ${url}`,
    linkedin: `http://www.linkedin.com/shareArticle?mini=true&url=${url}&summary=${shareText}&title=${shareText}&source=Narative`,
  }
}

const popUpwards = keyframes`
  0% {
    transform:matrix(.97,0,0,1,0,12);
    opacity:0
  }
  20% {
    transform:matrix(.99,0,0,1,0,2);
    opacity:.7
  }
  40% {
    transform:matrix(1,0,0,1,0,-1);
    opacity:1
  }
  70% {
    transform:matrix(1,0,0,1,0,0);
    opacity:1
  }
  100% {
    transform:matrix(1,0,0,1,0,0);
    opacity:1
  }
`

const MenuFloat = styled.div<{ mode?: string }>`
  position: absolute;
  align-items: center;
  z-index: 9999;
  width: ${MENU_WIDTH}px;
  height: ${MENU_HEIGHT}px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 7px 11px 7px 19px;
  color: #73737d;
  background: ${p => (p.mode === 'dark' ? '#fafafa' : p.theme.colors.bg)};
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  transition: left 75ms ease-out, right 75ms ease-out, background 200ms;
  animation: ${popUpwards} 200ms forwards;

  &::before {
    content: '';
    position: absolute;
    height: 150%;
    width: 120%;
    top: -25%;
    left: -10%;
    border-radius: 5px;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: -8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid
      ${p => (p.mode === 'dark' ? '#fafafa' : p.theme.colors.bg)};
    transition: border-color 200ms;
  }

  svg {
    path {
      fill: ${p => (p.mode === 'light' ? '#fff' : '#000')};
    }
  }
`

const MenuText = styled.span`
  margin-right: 11px;
`

const MenuShare = styled.a`
  display: flex;
  align-items: center;
  padding: 16px 11px;
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};

  svg {
    path {
      fill: ${p => (p.disabled ? '#F89797' : '')};
    }
  }
`

const MenuButton = styled.button`
  display: inline-block;
  padding: 16px 11px;
`

const MenuDivider = styled.div`
  display: inline-block;
  height: 17px;
  width: 1px;
  position: relative;
  margin: 0 8px;
  background: rgba(115, 115, 125, 0.3);
`

const TwitterIcon = () => (
  <svg
    width="18"
    height="15"
    viewBox="0 0 18 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.1631 2.40712C15.8912 1.97066 16.4504 1.27958 16.7137 0.456143C16.0323 0.86022 15.2776 1.15371 14.4744 1.31189C13.8311 0.626525 12.9146 0.198242 11.9003 0.198242C9.95274 0.198242 8.37378 1.77714 8.37378 3.7246C8.37378 4.00098 8.40502 4.27014 8.46513 4.52823C5.53429 4.38117 2.93586 2.97724 1.19658 0.843747C0.893032 1.36458 0.719128 1.97035 0.719128 2.61661C0.719128 3.84003 1.34175 4.91941 2.28797 5.55178C1.70986 5.53348 1.16615 5.37486 0.690647 5.11073C0.690396 5.12545 0.690396 5.14022 0.690396 5.15506C0.690396 6.86366 1.90596 8.28897 3.51919 8.61289C3.22325 8.69349 2.91172 8.73655 2.59007 8.73655C2.36285 8.73655 2.14192 8.71449 1.92665 8.6733C2.37536 10.0743 3.67769 11.0939 5.22082 11.1224C4.01393 12.0681 2.49337 12.6319 0.841225 12.6319C0.556604 12.6319 0.275882 12.6152 0 12.5827C1.56061 13.5832 3.41426 14.167 5.40572 14.167C11.8921 14.167 15.4391 8.79352 15.4391 4.13352C15.4391 3.98061 15.4357 3.82853 15.4289 3.67732C16.1178 3.18013 16.7157 2.55902 17.1885 1.85183C16.5561 2.13231 15.8765 2.32186 15.1631 2.40712Z"
      fill="black"
    />
  </svg>
)

const LinkedInIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.17191 15.9467H1.04978V5.90884H4.17191V15.9467ZM2.6273 4.53195C2.13492 4.53195 1.70969 4.3529 1.35159 3.99481C0.9935 3.63671 0.814453 3.21148 0.814453 2.7191C0.814453 2.22672 0.9935 1.80148 1.35159 1.44339C1.70969 1.0853 2.13492 0.90625 2.6273 0.90625C3.11968 0.90625 3.54492 1.0853 3.90301 1.44339C4.26111 1.80148 4.44015 2.22672 4.44015 2.7191C4.44015 3.21148 4.26111 3.63671 3.90301 3.99481C3.54492 4.3529 3.11968 4.53195 2.6273 4.53195ZM15.8547 15.9467H12.7326V11.0452C12.7326 10.2395 12.6655 9.65763 12.5312 9.29954C12.285 8.69526 11.8038 8.39311 11.0876 8.39311C10.3714 8.39311 9.86785 8.66169 9.5769 9.19883C9.35309 9.60168 9.24118 10.1948 9.24118 10.9781V15.9467H6.15263V5.90884H9.14047V7.28526H9.17404C9.39785 6.83765 9.75594 6.46836 10.2483 6.17741C10.7855 5.81932 11.4121 5.64027 12.1283 5.64027C13.5831 5.64027 14.6014 6.09908 15.1833 7.01669C15.6309 7.75526 15.8547 8.89668 15.8547 10.441V15.9467Z"
      fill="black"
    />
  </svg>
)

const CopyIcon = () => (
  <svg
    width="15"
    height="19"
    viewBox="0 0 15 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginBottom: '1px' }}
  >
    <path
      d="M11.0475 0.905273H1.67197C0.812542 0.905273 0.109375 1.60844 0.109375 2.46787V13.406H1.67197V2.46787H11.0475V0.905273ZM13.3914 4.03046H4.79716C3.93773 4.03046 3.23456 4.73363 3.23456 5.59306V16.5312C3.23456 17.3906 3.93773 18.0938 4.79716 18.0938H13.3914C14.2509 18.0938 14.954 17.3906 14.954 16.5312V5.59306C14.954 4.73363 14.2509 4.03046 13.3914 4.03046ZM13.3914 16.5312H4.79716V5.59306H13.3914V16.5312Z"
      fill="#08080B"
    />
  </svg>
)

const CopiedIcon = () => (
  <svg
    width="15"
    height="19"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginBottom: '2px' }}
  >
    <path
      d="M5 3.33333H3.33333V5H5V3.33333ZM5 6.66667H3.33333V8.33333H5V6.66667ZM5 0C4.075 0 3.33333 0.75 3.33333 1.66667H5V0ZM8.33333 10H6.66667V11.6667H8.33333V10ZM13.3333 0V1.66667H15C15 0.75 14.25 0 13.3333 0ZM8.33333 0H6.66667V1.66667H8.33333V0ZM5 11.6667V10H3.33333C3.33333 10.9167 4.075 11.6667 5 11.6667ZM13.3333 8.33333H15V6.66667H13.3333V8.33333ZM13.3333 5H15V3.33333H13.3333V5ZM13.3333 11.6667C14.25 11.6667 15 10.9167 15 10H13.3333V11.6667ZM1.66667 3.33333H0V13.3333C0 14.25 0.741667 15 1.66667 15H11.6667V13.3333H1.66667V3.33333ZM10 1.66667H11.6667V0H10V1.66667ZM10 11.6667H11.6667V10H10V11.6667Z"
      fill="08080B"
    />
  </svg>
)

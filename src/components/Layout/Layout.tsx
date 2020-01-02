import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { StoreContext } from 'redux-react-hook'
import { ContactProvider } from '@components/Contact/Contact.Context'

import ContactSlideIn from '@components/Contact/Contact.SlideIn'
import Container from '@components/Layout/Layout.Container'
import CommandLine from '@components/CommandLine'
import Breakpoints from '@components/Breakpoints'

import { GlobalStyles, theme } from '@styles'
import store from '@store'
import shortcuts from '@shortcuts'

interface LayoutProps {
  nav: {
    fixed?: boolean
    offset?: boolean
    theme?: string
  }
  footer: {
    visible?: boolean
    theme?: string
  }
}

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
const Layout = ({ children, ...rest }: LayoutProps) => {
  useEffect(() => {
    document.addEventListener('keydown', shortcuts.handleKeydownEvent)

    return () =>
      document.removeEventListener('keydown', shortcuts.handleKeydownEvent)
  }, [])

  return (
    <StoreContext.Provider value={store}>
      <ThemeProvider theme={theme}>
        <ContactProvider>
          <>
            <GlobalStyles />
            <Container {...rest}>{children}</Container>
            <ContactSlideIn />
            <CommandLine />
            <Breakpoints />
          </>
        </ContactProvider>
      </ThemeProvider>
    </StoreContext.Provider>
  )
}

export default Layout

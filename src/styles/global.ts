import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
  }

  a, button {
    font-family: 'Roboto', sans-serif;
    color: ${props => props.theme.colors.text};
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  textarea {
    font-family: 'Roboto', sans-serif;
    line-height: 24px;
  }
`

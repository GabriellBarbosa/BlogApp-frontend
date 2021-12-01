import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
`

export const Content = styled.div`
  margin-left: 10px;
  background-color: ${({ theme }) => theme.colors.contentBg};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 8px;
  padding: 5px 10px;
`

export const Author = styled.span`
  font-weight: 700;
  margin-bottom: 5px;
  font-size: 16px;
`
export const Text = styled.p`
  font-size: 16px;
  line-height: 24px;
`

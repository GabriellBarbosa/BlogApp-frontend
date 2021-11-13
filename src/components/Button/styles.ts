import styled, { keyframes } from 'styled-components'

export const Container = styled.button`
  position: relative;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    opacity: 0.8;
  }
  &.loading,
  &:disabled {
    pointer-events: none;
    opacity: 0.6;
  }
`

const Spin = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`

export const Loading = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.colors.text};
  border-top-color: transparent;
  animation: ${Spin} 1s linear infinite;
`


import React, {ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import UserContextProvider from '../context/UserContext/UserContextProvider'


const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <UserContextProvider>
        {children}
    </UserContextProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}
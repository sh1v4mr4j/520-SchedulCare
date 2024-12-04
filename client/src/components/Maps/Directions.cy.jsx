import React from 'react'
import Directions from './Directions'

describe('<Directions />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Directions />)
  })
})
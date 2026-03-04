import React from 'react'
import Statistics from './Statistics'

describe('<Statistics />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Statistics />)
  })
})
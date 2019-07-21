import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import App from '../src/App'


describe('<App />', () => {
  it('should render App', () => {
    const wrapper = shallow(<App />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
import React from 'react';
import NavigationItem from './NavigationItem';
import { NavLink } from 'react-router-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() })

describe('<NavigationItems />', () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallow(<NavigationItem link={'/label'} type={'Success'}>Label</NavigationItem>);
  })

  it('<NavigationItem /> should contain <NavLink /> with label', () => {
    expect(wrapper.containsAllMatchingElements([
      <NavLink to={'/label'}>Label</NavLink>
    ])).toEqual(true);
  })
})

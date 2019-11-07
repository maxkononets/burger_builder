import React from 'react';
import { navigationItems as NavigationItems} from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter()})

describe('<NavigationItems />', () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  })

  it('should be three <NavigationItem /> if not auth', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  })

  it('should be three <NavigationItem /> if authenticated', () => {
    wrapper.setProps({ isAuth: true });

    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  })

  it('should have a <NavigationItem> Sign Out </NavigationItem> if authenticated', () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.containsAllMatchingElements([
      <NavigationItem>Sign Out</NavigationItem>,
      <NavigationItem>Burger builder</NavigationItem>
    ])).toEqual(true);
  })
})

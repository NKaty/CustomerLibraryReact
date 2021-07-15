import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('App', () => {
  it('should render app', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('BrowserRouter').length).toBe(1);
    expect(wrapper.find('Header').length).toBe(1);
    expect(wrapper.find('ContentLayout').length).toBe(1);
    expect(wrapper.find('Route').at(0).props().path).toBe('/customers');
    expect(wrapper.find('Route').at(0).props().component.name).toBe(
      'CustomerRouter'
    );
    expect(wrapper.find('Redirect').at(0).props().from).toBe('*');
    expect(wrapper.find('Redirect').at(0).props().to).toBe('/customers');
  });
});

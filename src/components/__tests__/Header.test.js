import React from 'react';
import { mount } from 'enzyme';
import Header from '../Header';
import { BrowserRouter, NavLink } from 'react-router-dom';

describe('Header', () => {
  it('should render a navbar with links', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(wrapper.find('.navbar').length).toBe(1);
    expect(wrapper.find(NavLink).prop('to')).toBe('/customers');
    expect(wrapper.find('a.navbar-brand').prop('href')).toBe('/customers');
  });

  it('should open the menu', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    wrapper.find('button').simulate('click');
    expect(wrapper.find('.collapse').length).toBe(0);
  });

  it('should close the menu', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    wrapper.find('button').simulate('click');
    expect(wrapper.find('.collapse').length).toBe(0);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('.collapse').length).toBe(1);
  });
});

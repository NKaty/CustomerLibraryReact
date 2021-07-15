import React from 'react';
import { mount, shallow } from 'enzyme';
import Pagination from '../Pagination';
import { BrowserRouter } from 'react-router-dom';

describe('Pagination', () => {
  it('should render a pagination', () => {
    const props = {
      totalCount: 10,
      currentPage: 1,
      perPage: 5,
      pageNeighbours: 2,
    };
    const wrapper = shallow(<Pagination {...props} />);
    expect(wrapper.find('.pagination').length).toBe(1);
  });

  it('should not render a pagination for one page', () => {
    const props = {
      totalCount: 10,
      currentPage: 1,
      perPage: 10,
      pageNeighbours: 2,
    };
    const wrapper = shallow(<Pagination {...props} />);
    expect(wrapper.find('.pagination').length).toBe(0);
  });

  it('should not render a pagination if number of records is null', () => {
    const props = {
      totalCount: null,
      currentPage: 1,
      perPage: 10,
      pageNeighbours: 2,
    };
    const wrapper = shallow(<Pagination {...props} />);
    expect(wrapper.find('.pagination').length).toBe(0);
  });

  it('should render a pagination of type 1 2 3', () => {
    const props = {
      totalCount: 30,
      currentPage: 2,
      perPage: 10,
      pageNeighbours: 2,
    };
    const wrapper = mount(
      <BrowserRouter>
        <Pagination {...props} />
      </BrowserRouter>
    );
    expect(wrapper.find('Link').length).toBe(2);
    expect(wrapper.find('.active > span').length).toBe(1);
    expect(wrapper.find('Link').first().prop('to')).toBe('?page=1');
    expect(wrapper.find('Link').last().prop('to')).toBe('?page=3');
  });

  it('should render a pagination of type 1 << 5 6 7 >> 15', () => {
    const props = {
      totalCount: 150,
      currentPage: 6,
      perPage: 10,
      pageNeighbours: 1,
    };
    const wrapper = mount(
      <BrowserRouter>
        <Pagination {...props} />
      </BrowserRouter>
    );
    expect(wrapper.find('Link').length).toBe(6);
    expect(wrapper.find('.active > span').length).toBe(1);
    expect(wrapper.find('Link').last().prop('to')).toBe('?page=15');
  });

  it('should render a pagination of type 1 << 5 6 7 8 9 >> 15', () => {
    const props = {
      totalCount: 150,
      currentPage: 7,
      perPage: 10,
      pageNeighbours: 2,
    };
    const wrapper = mount(
      <BrowserRouter>
        <Pagination {...props} />
      </BrowserRouter>
    );
    expect(wrapper.find('Link').length).toBe(8);
    expect(wrapper.find('.active > span').length).toBe(1);
    expect(wrapper.find('Link').get(0).props.to).toBe('?page=1');
    expect(wrapper.find('Link').get(1).props.to).toBe('?page=2');
    expect(wrapper.find('Link').get(2).props.to).toBe('?page=5');
    expect(wrapper.find('Link').get(3).props.to).toBe('?page=6');
    expect(wrapper.find('Link').get(4).props.to).toBe('?page=8');
    expect(wrapper.find('Link').get(5).props.to).toBe('?page=9');
    expect(wrapper.find('Link').get(6).props.to).toBe('?page=12');
    expect(wrapper.find('Link').last().prop('to')).toBe('?page=15');
    expect(wrapper.find('.active > span').text()).toBe('7');
  });

  it('should render a pagination of type 1 2 3 4 5 >> 15', () => {
    const props = {
      totalCount: 150,
      currentPage: 2,
      perPage: 10,
      pageNeighbours: 1,
    };
    const wrapper = mount(
      <BrowserRouter>
        <Pagination {...props} />
      </BrowserRouter>
    );
    expect(wrapper.find('Link').length).toBe(6);
    expect(wrapper.find('.active > span').length).toBe(1);
    expect(wrapper.find('Link').last().prop('to')).toBe('?page=15');
  });

  it('should render a pagination of type 1 << 11 12 13 14 15', () => {
    const props = {
      totalCount: 150,
      currentPage: 15,
      perPage: 10,
      pageNeighbours: 1,
    };
    const wrapper = mount(
      <BrowserRouter>
        <Pagination {...props} />
      </BrowserRouter>
    );
    expect(wrapper.find('Link').length).toBe(6);
    expect(wrapper.find('.active > span').length).toBe(1);
    expect(wrapper.find('Link').last().prop('to')).toBe('?page=14');
  });
});

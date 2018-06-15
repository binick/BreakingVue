import { expect, assert } from 'chai';
import sinon from 'sinon';

import { shallowMount, Wrapper } from '@vue/test-utils';

import AppHeader from '../../../src/components/app-header/app-header.vue';

describe('#AppHeader', () => {
    let wrapper: Wrapper<AppHeader>;

    beforeEach(() => {
        wrapper = shallowMount(AppHeader);
    })

    it('when load then "searchText" is empty', () => {
        expect(wrapper.vm.$data.searchText).to.be.empty;
    })

    it('when "searchText" change then invoke search', () => {
        let headerSearchHandler = sinon.stub();
        let wrapper = shallowMount(AppHeader, {
            methods: {
                search: headerSearchHandler
            }
        });
        wrapper.find('#search-query-nav').trigger('change', { value: 'foo' });
        assert(headerSearchHandler.calledOnce);
    })

    it('given "searchText" not empty when change event then "searchText" is empty', () => {
        wrapper.setData({ searchText: 'foo' });
        wrapper.find('#search-query-nav').trigger('change', { value: 'foo' });
        expect(wrapper.vm.$data.searchText).is.empty;
    })
})
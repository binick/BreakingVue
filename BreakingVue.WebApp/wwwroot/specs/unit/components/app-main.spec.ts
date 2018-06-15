import { assert } from 'chai';

import { mount } from '@vue/test-utils';

import AppMain from '../../../src/components/app-main/app-main.vue';
import AppNews from '../../../src/components/app-news/app-news.vue';

describe('#AppMain', () => {
    it('given a user enabled when him browse the site then the component is loaded correctly', () => {
        let wrapper = mount(AppMain);
        assert(wrapper.contains(AppNews));
    })
})
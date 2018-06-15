import { assert } from 'chai';

import { mount } from '@vue/test-utils';

import AppFrame from '../../../src/components/app-frame/app-frame.vue';
import AppHeader from '../../../src/components/app-header/app-header.vue';
import AppMain from '../../../src/components/app-main/app-main.vue';

describe('#AppFrame', () => {
    it('given a user enabled when him browse the site then the component is loaded correctly', () => {
        let wrapper = mount(AppFrame);
        assert(wrapper.contains(AppHeader));
        assert(wrapper.contains(AppMain));
    })
})
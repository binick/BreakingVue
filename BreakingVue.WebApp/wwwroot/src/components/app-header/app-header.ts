import Vue from 'vue';
import Component from 'vue-class-component';

import { EventHub } from '../../services/event-hub-service';

@Component({
    name: 'app-header'
})
export default class AppHeader extends Vue {
    searchText: string = '';

    search() {
        console.log('AppHeader.search:' + this.searchText);
        EventHub.$emit('header-search', this.searchText);
        this.searchText = '';
    }
}
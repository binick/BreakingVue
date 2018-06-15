import { Vue, Component } from 'vue-property-decorator';

import { EventHub } from '../../services/event-hub-service';

@Component({
    name: 'app-header'
})
export default class AppHeader extends Vue {
    searchText: string = '';

    search() {
        this.$emit('header-search', this.searchText);
        EventHub.$emit('header-search', this.searchText);
        this.searchText = '';
    }
}
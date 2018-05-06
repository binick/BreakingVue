import Vue from 'vue';
import Component from 'vue-class-component';

import AppNews from '../app-news/app-news.vue';

@Component({
    name: 'app-main',
    components: {
        AppNews
    }
})
export default class AppMain extends Vue {
    created() {
    }
    mounted() {
    }
}
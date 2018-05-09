import { Vue, Component } from 'vue-property-decorator';

import AppNews from '../app-news/app-news.vue';

@Component({
    name: 'app-main',
    components: {
        AppNews
    }
})
export default class AppMain extends Vue {
}
import Vue from 'vue';
import Component from 'vue-class-component';
import Axios from 'axios';

import { EventHub } from '../../services/event-hub-service';
import { Article } from '../../entities/article';

@Component({
    name: 'app-news'
})
export default class AppNews extends Vue {
    news: Article[] = [];

    created() {
        EventHub.$on('header-search', this.onHeaderSearch);
    }

    beforeDestroy() {
        EventHub.$off('header-search', this.onHeaderSearch);
    }

    mounted() {
        Axios.get('/v1/getNews').then((response) => {
            console.log(response);
            this.news = response.data.articles;
        }, (response) => {
            console.log(response);
        });
    }

    onHeaderSearch(value: string) {
        Axios.get('/v1/search/' + value).then((response) => {
            console.log(response);
            this.news = response.data.articles;
        }, (response) => {
            console.log(response);
        });
    }
}
import { Vue, Component } from 'vue-property-decorator';

import Axios, { AxiosResponse } from 'axios';

import AppArticle from '../app-article/app-article.vue';

import { EventHub } from '../../services/event-hub-service';
import { Article } from '../../entities/article';

@Component({
    name: 'app-news',
    components: {
        AppArticle
    }
})
export default class AppNews extends Vue {
    news: Article[] = [];

    created() {
        EventHub.$on('header-search', this.onHeaderSearch);
    }

    beforeDestroy() {
        EventHub.$off('header-search', this.onHeaderSearch);
    }

    async mounted() {
        this.news = await this.getNews();
    }

    async onHeaderSearch(value: string) {
        this.news = await this.searchNews(value);
    }

    async getNews(): Promise<Article[]> {
        return await Axios.get('/v1/getNews').then((response: AxiosResponse<any>) => {
            return this.onNewsRequestFullFilled(response);
        }, (response: any) => {
            throw this.onNewsRequestRejected(response);
        });
    }

    async searchNews(value: string): Promise<Article[]> {
        return await Axios.get('/v1/search/' + value).then((response: AxiosResponse<any>) => {
            return this.onNewsRequestFullFilled(response);
        }, (response: any) => {
            throw this.onNewsRequestRejected(response);
        });
    }

    onNewsRequestFullFilled(response: AxiosResponse<any>): Article[] {
        console.log(response);
        return (response.data.articles as Article[]);
    }

    onNewsRequestRejected(response: any): Error {
        console.log(response);
        return new Error(JSON.stringify(response));
    }
}
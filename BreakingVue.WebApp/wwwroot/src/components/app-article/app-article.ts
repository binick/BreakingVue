import Vue from 'vue';
import Component from 'vue-class-component';

import { Article } from '../../entities/article';

@Component({
    name: 'app-article',
    props: {
        article: {}
    }
})
export default class AppArticle extends Vue {
    //_article: Article = this.$props.article;

    get publishedAt() {
        let publishedAtDate = new Date(this.$props.article.publishedAt);
        return publishedAtDate.toLocaleDateString() + ' ' + publishedAtDate.toLocaleTimeString();
    }

    get isTrump() {
        return (this.$props.article.title.toLowerCase().indexOf('trump') || this.$props.article.description.toLowerCase().indexOf('trump')) !== -1;
    }
}
import { Vue, Component, Prop } from 'vue-property-decorator';

import { Article } from '../../entities/article';

@Component({
    name: 'app-article'
})
export default class AppArticle extends Vue {
    @Prop(Object) article!: Article;

    get publishedAt(): string {
        let publishedAtDate = new Date(this.article.publishedAt);
        return publishedAtDate.toLocaleDateString() + ' ' + publishedAtDate.toLocaleTimeString();
    }

    get isTrump(): boolean {
        if (this.article.title != null)
            return this.article.title.toLowerCase().indexOf('trump') !== -1;
        if (this.article.description != null)
            return this.article.description.toLowerCase().indexOf('trump') !== -1;
        return false;
    }
}
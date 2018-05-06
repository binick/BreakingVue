import { Source } from "./source";

export class Article {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: URL;
    urlToImage: URL;
    publishedAt: Date;

    constructor(source: Source, author: string, title: string, description: string, url: string, urlToImage: string, publishedAt: string) {
        this.source = source;
        this.author = author;
        this.title = title;
        this.description = description;
        this.url  = new URL(url);
        this.urlToImage = new URL(urlToImage);
        this.publishedAt = new Date(publishedAt);
    }
}
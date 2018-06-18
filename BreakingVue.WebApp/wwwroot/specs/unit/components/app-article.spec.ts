import { expect, assert } from 'chai';

import { shallowMount, Wrapper } from '@vue/test-utils';

import AppArticle from '../../../src/components/app-article/app-article.vue';
import { Article } from '../../../src/entities/article';
import { Source } from '../../../src/entities/source';

describe('#AppArticle', () => {
    let article: Article = new Article(
        new Source('12345678', 'Lorem ipsum dolor.')
        , 'Sed quis eros sed.'
        , 'Nulla lobortis ante id leo euismod, nec vehicula dolor accumsan.'
        , 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eleifend tempor justo, ac euismod lorem ultricies quis.'
        , 'http://loremipsum.dolor'
        , 'http://loremipsum.dolor'
        , '2018-06-10T17:01:06.911Z')

    let dangerArticle: Article = new Article(
        new Source('12345678', 'Lorem ipsum dolor.')
        , 'Sed quis eros sed.'
        , 'Nulla Trump lobortis ante id leo euismod, nec vehicula dolor accumsan.'
        , 'Lorem ipsum Trump dolor sit amet, consectetur adipiscing elit. In eleifend tempor justo, ac euismod lorem ultricies quis.'
        , 'http://loremipsum.dolor'
        , 'http://loremipsum.dolor'
        , '2018-06-10T17:01:06.911Z')

    let noImageArticle: Article = new Article(
        new Source('12345678', 'Lorem ipsum dolor.')
        , 'Sed quis eros sed.'
        , 'Nulla lobortis ante id leo euismod, nec vehicula dolor accumsan.'
        , 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eleifend tempor justo, ac euismod lorem ultricies quis.'
        , 'http://loremipsum.dolor'
        , ''
        , '2018-06-10T17:01:06.911Z')

    let wrapper: Wrapper<AppArticle>;
    
    before(() => {
        wrapper = shallowMount(AppArticle, {
            propsData: {
                article: article
            }
        });
    })

    it('given an news when it concerns Trump then the component is "danger"', () => {
        let wrapper = shallowMount(AppArticle, {
            propsData: {
                article: dangerArticle
            }
        });
        expect(wrapper.classes()).to.contain('danger');
    })

    it('given an news when it not concerns Trump then the component is not "danger"', () => {
        expect(wrapper.classes()).to.not.contain('danger');
    })

    it('given an news when it concerns Trump then the computed property "isTrump" equal true', () => {
        let wrapper = shallowMount(AppArticle, {
            propsData: {
                article: dangerArticle
            }
        });
        assert(wrapper.vm.isTrump);
    })

    it('given an news when it not concerns Trump then the computed property "isTrump" equal false', () => {
        assert(!wrapper.vm.isTrump);
    })

    it('given an news when it no image then the component not render img', () => {
        let wrapper = shallowMount(AppArticle, {
            propsData: {
                article: noImageArticle
            }
        });
        assert(!wrapper.contains('.uk-card-header .uk-width-auto img'));
    })

    it('given an news when it no image then the component render img', () => {
        assert(wrapper.contains('div.uk-card-header div.uk-width-auto img'));
    })

    it('given an news when "publishedAt" is not null then "publishedAt" is formatted correctly', () => {
        let date = new Date('2018-06-10T17:01:06.911Z');
        let dateFormat = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        var component = new AppArticle();
        component.article = article;
        expect(component.publishedAt).to.deep.equal(dateFormat);
    })
})

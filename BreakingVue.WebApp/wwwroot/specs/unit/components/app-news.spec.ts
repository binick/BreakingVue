import { expect, assert } from 'chai';
import axios from 'axios';
import moxios from 'moxios';
import sinon from 'sinon';

import { shallowMount, Wrapper } from '@vue/test-utils';

import AppNews from '../../../src/components/app-news/app-news.vue';

describe('#AppNews', () => {
    let wrapper: Wrapper<AppNews>;

    const sampleResponse = {
        status: 200,
        response: {
            "status": "ok",
            "totalResults": 2,
            "articles": [
                {
                    "source": {
                        "id": null,
                        "name": "Espn.com"
                    },
                    "author": null,
                    "title": "Five crucial Game 1 insights for NBA Finals going forward",
                    "description": "How will the Cavs and Warriors respond after an unforgettable Game 1? Here's what worked and what failed.",
                    "url": "http://www.espn.com/nba/story/_/id/23671025/zach-lowe-warriors-vs-cavaliers-game-1-2018-nba-finals",
                    "urlToImage": "http://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2018%2F0601%2Fr378436_2_1296x729_16%2D9.jpg",
                    "publishedAt": "2018-06-01T21:43:03Z"
                },
                {
                    "source": {
                        "id": "nbc-news",
                        "name": "NBC News"
                    },
                    "author": "Jon Schuppe",
                    "title": "'My heart just dropped.' $4 verdict shocks family of man killed by police",
                    "description": "A jury awarded $4 to the family of Gregory Vaughn Hill Jr., shot to death by a Ft. Pierce County, Florida sheriff's deputy behind his closing garage door.",
                    "url": "https://www.nbcnews.com/news/all/my-heart-just-dropped-4-verdict-shocks-family-man-killed-n879026",
                    "urlToImage": "https://media4.s-nbcnews.com/j/newscms/2018_22/2450301/180531-gregory-hill-jr-family-st-lucie-county-se-208p__39998032e61c45877a4e1e667d9cf110.1200;630;7;70;5.jpg",
                    "publishedAt": "2018-06-01T06:53:13Z"
                }
            ]
        }
    };

    let onFulfilled = sinon.spy();

    beforeEach(() => {
        moxios.install();

        moxios.stubRequest('/v1/getNews', sampleResponse);
        moxios.stubRequest('/v1/search', sampleResponse);

        wrapper = shallowMount(AppNews);
    })

    afterEach(() => {
        moxios.uninstall();
    })

    it('when load then "news" is empty array', () => {
        expect(wrapper.vm.$data.news).to.be.a('array').and.deep.equal([]);
    })

    it('when "getNews" invoke then return an list of articles', function () {
        wrapper.vm.getNews().then((data: any) => {
            expect(data).to.be.deep.equal(sampleResponse);
        });
    })

    it('given "getNews" invoke when response is full filled then return an list of articles', function () {
        let response = {
            status: sampleResponse.status,
            data: sampleResponse.response
        };
        expect(wrapper.vm.onNewsRequestFullFilled(response)).to.be.deep.equal(response.data.articles);
    })

    it('given "getNews" invoke when response is rejected then return an list of articles', function () {
        let response = {
            status: sampleResponse.status,
            data: sampleResponse.response
        };
        expect(function() { wrapper.vm.onNewsRequestRejected(response); }).to.throw(JSON.stringify(response));
    })

    it('when "search" invoke then return an list of articles', function () {
        wrapper.vm.searchNews().then((data: any) => {
            expect(data).to.be.deep.equal(sampleResponse);
        });
    })

    it('given "searchNews" invoke when response is full filled then return an list of articles', function () {
        let response = {
            status: sampleResponse.status,
            data: sampleResponse.response
        };
        expect(wrapper.vm.onNewsRequestFullFilled(response)).to.be.deep.equal(response.data.articles);
    })

    it('given "searchNews" invoke when response is rejected then return an list of articles', function () {
        let response = {
            status: sampleResponse.status,
            data: sampleResponse.response
        };
        expect(function() { wrapper.vm.onNewsRequestRejected(response); }).to.throw(JSON.stringify(response));
    })

    it('when load then retrieves news from /v1/getNews', (done) => {
        axios.get('/v1/getNews').then(onFulfilled);
        moxios.wait(() => {
            let response = onFulfilled.getCall(0).args[0].data;
            expect(response.status).to.be.eq('ok');
            expect(response.articles.lenght > 0);
            done();
        })
    })

    it('when load then retrieves news from /v1/search', (done) => {
        axios.get('/v1/search').then(onFulfilled);
        moxios.wait(() => {
            let response = onFulfilled.getCall(0).args[0].data;
            expect(response.status).to.be.eq('ok');
            expect(response.articles.lenght > 0);
            done();
        })
    })
})

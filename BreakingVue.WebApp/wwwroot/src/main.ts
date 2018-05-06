import Vue from 'vue';
import AppFrame from './components/app-frame/app-frame.vue';

let app = new Vue({
    el: '#main',
    template: '<app-frame></app-frame>',
    components: {
        AppFrame
    }
})
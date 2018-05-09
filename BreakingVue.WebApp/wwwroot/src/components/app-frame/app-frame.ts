import { Vue, Component } from 'vue-property-decorator';

import AppHeader from '../app-header/app-header.vue';
import AppMain from '../app-main/app-main.vue';

@Component({
  name: 'app-frame',
  components: {
    AppHeader,
    AppMain
  }
})
export default class AppFrame extends Vue {
}
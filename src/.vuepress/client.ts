import { defineClientConfig } from '@vuepress/client';
import RightAbort from './components/RightAbort.vue';
import RightAbortMe from './components/RightAbortMe.vue';
import RightLinks from './components/RightLinks.vue';
import PageFooter from './components/PageFooter.vue';
import LinksComponent from './components/LinksComponent.vue';

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component('RightAbort', RightAbort);
    app.component('RightAbortMe', RightAbortMe);
    app.component('RightLinks', RightLinks);
    app.component('PageFooter', PageFooter);
    app.component('LinksComponent', LinksComponent);
  },
  layouts: {},
  rootComponents: [],
});

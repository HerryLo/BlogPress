import { defineClientConfig } from '@vuepress/client';
import CursorParticle from './components/CursorParticle.vue';
import LinksComponent from './components/LinksComponent.vue';
import PageFooter from './components/PageFooter.vue';
import IframeBox from './components/IframeBox.vue';

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component('CursorParticle', CursorParticle);
    app.component('LinksComponent', LinksComponent);
    app.component('PageFooter', PageFooter);
    app.component('IframeBox', IframeBox);
  },
  layouts: {},
  rootComponents: [CursorParticle],
});

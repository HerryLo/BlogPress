import { defineClientConfig } from '@vuepress/client';
import PageFooter from './components/PageFooter.vue';
import CursorParticle from './components/CursorParticle.vue';
import LinksComponent from './components/LinksComponent.vue';

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component('PageFooter', PageFooter);
    app.component('CursorParticle', CursorParticle);
    app.component('LinksComponent', LinksComponent);
  },
  layouts: {},
  rootComponents: [CursorParticle],
});

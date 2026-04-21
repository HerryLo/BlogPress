import { defineClientConfig } from '@vuepress/client';
import CursorParticle from './components/CursorParticle.vue';
import LinksComponent from './components/LinksComponent.vue';
import PageFooter from './components/PageFooter.vue';
import SunsetScene from './components/SunsetScene.vue';

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component('CursorParticle', CursorParticle);
    app.component('LinksComponent', LinksComponent);
    app.component('PageFooter', PageFooter);
  },
  layouts: {},
  rootComponents: [CursorParticle, SunsetScene],
});

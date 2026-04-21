import { defineClientConfig } from '@vuepress/client';
import BlogMaskAnimator from './components/BlogMaskAnimator.vue';
import CursorParticle from './components/CursorParticle.vue';
import LinksComponent from './components/LinksComponent.vue';
import PageFooter from './components/PageFooter.vue';
import VanGoghOverlay from './components/VanGoghOverlay.vue';

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component('BlogMaskAnimator', BlogMaskAnimator);
    app.component('CursorParticle', CursorParticle);
    app.component('LinksComponent', LinksComponent);
    app.component('PageFooter', PageFooter);
  },
  layouts: {},
  rootComponents: [VanGoghOverlay, CursorParticle],
});

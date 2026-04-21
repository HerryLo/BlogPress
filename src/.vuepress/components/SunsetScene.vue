<template>
  <div ref="container" class="sunset-scene"></div>
</template>

<script>
import * as THREE from "three";

export default {
  name: "SunsetScene",
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
      animationId: null,
      isDestroyed: false,
      sheep: [],
      people: [],
      meshes: {},
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initThree();
    });
  },
  beforeDestroy() {
    this.isDestroyed = true;
    cancelAnimationFrame(this.animationId);
    if (this.renderer) {
      this.renderer.dispose();
    }
  },
  methods: {
    initThree() {
      const container = this.$refs.container;
      if (!container) return;

      const w = container.clientWidth || 400;
      const h = container.clientHeight || 300;

      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setSize(w, h);
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.2;
      container.appendChild(this.renderer.domElement);

      this.scene = new THREE.Scene();

      const aspect = w / h;
      this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
      this.camera.position.set(0, 2.5, 12);
      this.camera.lookAt(0, 1, 0);

      this.buildScene();
      this.animate();
    },
    buildScene() {
      const scene = this.scene;

      // ---- SUNSET SKY GRADIENT ----
      const skyGeo = new THREE.SphereGeometry(200, 32, 16);
      const skyMat = new THREE.ShaderMaterial({
        side: THREE.BackSide,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          varying vec3 vWorldPos;
          void main() {
            vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vWorldPos;
          uniform float uTime;
          void main() {
            float y = normalize(vWorldPos).y;
            vec3 top = vec3(0.05, 0.02, 0.15);
            vec3 mid = vec3(0.6, 0.15, 0.1);
            vec3 low = vec3(0.95, 0.4, 0.1);
            vec3 horizon = vec3(1.0, 0.6, 0.15);
            vec3 color;
            if (y > 0.3) color = mix(mid, top, (y - 0.3) / 0.7);
            else if (y > 0.0) color = mix(horizon, mid, y / 0.3);
            else color = horizon;
            gl_FragColor = vec4(color, 1.0);
          }
        `,
      });
      const sky = new THREE.Mesh(skyGeo, skyMat);
      scene.add(sky);
      this.meshes.sky = sky;

      // ---- SUN ----
      const sunGeo = new THREE.CircleGeometry(5, 32);
      const sunMat = new THREE.MeshBasicMaterial({ color: 0xffaa33, transparent: true, opacity: 0.9 });
      const sun = new THREE.Mesh(sunGeo, sunMat);
      sun.position.set(6, 3, -80);
      scene.add(sun);
      this.meshes.sun = sun;

      // Sun glow halo
      const haloGeo = new THREE.CircleGeometry(8, 32);
      const haloMat = new THREE.MeshBasicMaterial({ color: 0xff8833, transparent: true, opacity: 0.2 });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.set(6, 3, -81);
      scene.add(halo);
      this.meshes.halo = halo;

      // ---- GROUND / PRAIRIE ----
      const groundGeo = new THREE.PlaneGeometry(200, 200, 60, 60);
      const groundMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float uTime;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float wave = sin(pos.x * 0.3 + uTime * 0.5) * 0.08
                      + sin(pos.x * 0.7 + uTime * 0.8) * 0.04;
            pos.y += wave;
            vElevation = wave;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          varying float vElevation;
          void main() {
            vec3 dark = vec3(0.12, 0.08, 0.04);
            vec3 light = vec3(0.22, 0.16, 0.08);
            float t = vElevation * 5.0 + 0.5;
            vec3 color = mix(dark, light, t);
            // horizon fade
            float horizonFade = smoothstep(0.0, 0.5, vUv.y);
            color = mix(vec3(0.6, 0.25, 0.1), color, horizonFade);
            gl_FragColor = vec4(color, 1.0);
          }
        `,
      });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.5;
      scene.add(ground);
      this.meshes.ground = ground;

      // ---- DISTANT MOUNTAINS ----
      const mtGeo = new THREE.PlaneGeometry(300, 30, 80, 1);
      const positions = mtGeo.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const noise = Math.sin(x * 0.1) * 2 + Math.sin(x * 0.3) * 1 + Math.random() * 0.5;
        positions.setY(i, noise);
      }
      positions.needsUpdate = true;
      mtGeo.computeVertexNormals();
      const mtMat = new THREE.MeshBasicMaterial({ color: 0x1a0a2e, transparent: true, opacity: 0.7, side: THREE.DoubleSide });
      const mt = new THREE.Mesh(mtGeo, mtMat);
      mt.position.set(0, 2, -60);
      scene.add(mt);

      // ---- TREES ON THE RIGHT ----
      this.buildTrees();

      // ---- SHEEP FLOCK ----
      this.sheep = [];
      for (let i = 0; i < 12; i++) {
        const s = this.createSheep();
        s.group.position.set(
          2 + Math.random() * 10,
          -0.5,
          -3 + Math.random() * 6 - 10
        );
        s.phase = Math.random() * Math.PI * 2;
        s.speed = 0.3 + Math.random() * 0.4;
        s.baseX = s.group.position.x;
        s.baseZ = s.group.position.z;
        scene.add(s.group);
        this.sheep.push(s);
      }

      // ---- PEOPLE SILHOUETTES ----
      this.people = [];
      const peopleData = [
        { x: 9, z: -12, scale: 1.0 },
        { x: 11.5, z: -11, scale: 0.85 },
        { x: 10.5, z: -13.5, scale: 0.9 },
      ];
      peopleData.forEach((pd) => {
        const p = this.createPerson();
        p.group.position.set(pd.x, -0.5, pd.z);
        p.group.scale.setScalar(pd.scale);
        scene.add(p.group);
        this.people.push(p);
      });

      // ---- GRASS BLADES ----
      this.buildGrass();
    },

    buildTrees() {
      const treeData = [
        { x: 14, z: -15, h: 4.5, r: 0.6 },
        { x: 16, z: -14, h: 5.5, r: 0.7 },
        { x: 18, z: -16, h: 4, r: 0.55 },
        { x: 15.5, z: -18, h: 3.5, r: 0.5 },
      ];
      treeData.forEach((td) => {
        const tree = this.createTree(td.h, td.r);
        tree.position.set(td.x, -0.5, td.z);
        this.scene.add(tree);
      });
    },

    createTree(height, radius) {
      const group = new THREE.Group();
      // Trunk
      const trunkGeo = new THREE.CylinderGeometry(0.08 * radius, 0.12 * radius, height * 0.35, 6);
      const trunkMat = new THREE.MeshBasicMaterial({ color: 0x2a1a0a });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = height * 0.175;
      group.add(trunk);
      // Foliage (layered cones, Van Gogh style)
      const leafMat = new THREE.MeshBasicMaterial({ color: 0x1a0a2e });
      const layers = 6;
      for (let i = 0; i < layers; i++) {
        const lh = height * 0.65 / layers;
        const lr = radius * (1 - i * 0.12);
        const ly = height * 0.3 + i * lh * 0.85;
        const coneGeo = new THREE.ConeGeometry(lr, lh, 7);
        const cone = new THREE.Mesh(coneGeo, leafMat);
        cone.position.y = ly;
        group.add(cone);
      }
      return group;
    },

    createSheep() {
      const group = new THREE.Group();
      const bodyMat = new THREE.MeshBasicMaterial({ color: 0xe8d8a0 });
      const headMat = new THREE.MeshBasicMaterial({ color: 0x3a2a1a });
      const legMat = new THREE.MeshBasicMaterial({ color: 0x3a2a1a });

      // Body (ellipsoid)
      const bodyGeo = new THREE.SphereGeometry(0.25, 8, 6);
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.scale.set(1.4, 0.9, 1.0);
      body.position.y = 0.2;
      group.add(body);

      // Head
      const headGeo = new THREE.SphereGeometry(0.1, 6, 5);
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.set(0.3, 0.28, 0);
      group.add(head);

      // Legs
      const legGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.22, 4);
      [[-0.12, 0.1], [0.12, 0.1], [-0.12, -0.1], [0.12, -0.1]].forEach(([lx, lz]) => {
        const leg = new THREE.Mesh(legGeo, legMat);
        leg.position.set(lx, 0.02, lz);
        group.add(leg);
      });

      // Tail
      const tailGeo = new THREE.SphereGeometry(0.06, 4, 4);
      const tail = new THREE.Mesh(tailGeo, bodyMat);
      tail.position.set(-0.3, 0.25, 0);
      group.add(tail);

      return { group };
    },

    createPerson() {
      const group = new THREE.Group();
      const mat = new THREE.MeshBasicMaterial({ color: 0x1a0a2e });

      // Body
      const bodyGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.7, 6);
      const body = new THREE.Mesh(bodyGeo, mat);
      body.position.y = 0.35;
      group.add(body);

      // Head
      const headGeo = new THREE.SphereGeometry(0.12, 8, 8);
      const head = new THREE.Mesh(headGeo, mat);
      head.position.y = 0.82;
      group.add(head);

      // Hat
      const hatGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.05, 8);
      const hat = new THREE.Mesh(hatGeo, mat);
      hat.position.y = 0.92;
      group.add(hat);

      const hatTopGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 8);
      const hatTop = new THREE.Mesh(hatTopGeo, mat);
      hatTop.position.y = 0.98;
      group.add(hatTop);

      return { group };
    },

    buildGrass() {
      const bladeCount = 300;
      const bladeGeo = new THREE.PlaneGeometry(0.05, 0.35);
      const bladeMat = new THREE.MeshBasicMaterial({
        color: 0x2a1a0e,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
      });
      const instancedGeo = new THREE.InstancedMesh(bladeGeo, bladeMat, bladeCount);
      const dummy = new THREE.Object3D();
      for (let i = 0; i < bladeCount; i++) {
        const x = (Math.random() - 0.5) * 30 + 5;
        const z = -Math.random() * 20 - 2;
        dummy.position.set(x, 0.175, z);
        dummy.rotation.y = Math.random() * Math.PI;
        dummy.updateMatrix();
        instancedGeo.setMatrixAt(i, dummy.matrix);
      }
      instancedGeo.instanceMatrix.needsUpdate = true;
      this.scene.add(instancedGeo);
    },

    animate() {
      if (this.isDestroyed) return;
      requestAnimationFrame(() => this.animate());

      const t = performance.now() * 0.001;

      // Sky shader time
      if (this.meshes.sky?.material?.uniforms) {
        this.meshes.sky.material.uniforms.uTime.value = t;
      }

      // Sun pulse
      if (this.meshes.sun) {
        const pulse = 1 + Math.sin(t * 0.5) * 0.03;
        this.meshes.sun.scale.set(pulse, pulse, 1);
      }
      if (this.meshes.halo) {
        this.meshes.halo.scale.set(1 + Math.sin(t * 0.3) * 0.05, 1 + Math.sin(t * 0.3) * 0.05, 1);
      }

      // Ground wave
      if (this.meshes.ground?.material?.uniforms) {
        this.meshes.ground.material.uniforms.uTime.value = t;
      }

      // Sheep movement
      this.sheep.forEach((s) => {
        s.group.position.x += Math.sin(t * s.speed + s.phase) * 0.005;
        s.group.position.z += Math.cos(t * s.speed * 0.5 + s.phase) * 0.002;
        // Keep sheep in bounds
        if (s.group.position.x > 14) s.group.position.x = 2;
        if (s.group.position.x < 2) s.group.position.x = 14;
      });

      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style scoped>
.sunset-scene {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 480px;
  height: 300px;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
  border-radius: 12px 0 0 0;
}
</style>

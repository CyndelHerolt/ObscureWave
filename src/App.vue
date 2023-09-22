<script setup>
import {RouterLink, RouterView} from 'vue-router'
import HomeView from "@/views/HomeView.vue";

import {ref} from 'vue'

const info = ref(true);


</script>

<template>
  <header>
    <div class="wrapper">
      <h1>CYNDEL HEROLT</h1>
      <em>Un lieu de découvertes musicales aux sonorités obscures et froides. <br> Du plus paumé des indépendants aux
        groupes fares d'une époque intemporelle.
        <font-awesome-icon :icon="['fal', 'question-square']" @click="info = !info"/>
      </em> <br>
      <small v-if="!info">bon en vérité tout vient de l'API Spotify donc désolé José qui joue du synthé dans son garage
        tu ne seras pas répertorié.</small>
    </div>
  </header>

  <aside class="side_menu">
    <nav>
      <ul>
        <li>
          <RouterLink to="/">
            <font-awesome-icon :icon="['fal', 'house-heart']"/>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/albums">
            <font-awesome-icon :icon="['fal', 'compact-disc']"/>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/concerts">
            <font-awesome-icon :icon="['fal', 'balloons']"/>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/favoris">
            <font-awesome-icon :icon="['fal', 'star']"/>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/compte">
            <font-awesome-icon :icon="['fal', 'user']"/>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>

  <HomeView/>

  <RouterView/>
  <div class="grain-wrapper">
    <div class="grain"></div>
  </div>
</template>

<style scoped>
.grain-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: -9999;
}

.grain {
  position: absolute;
  top: -50%;
  left: -50%;
  height: 200vh;
  width: 200vw;
  overflow: hidden;
  background-image: url("data:image/png;base64,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");
  pointer-events: none;
  background-size: 100px 100px;
  animation: grain 4s steps(10) infinite;
}

@keyframes grain {
  0%, 100% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-5%, -10%);
  }
  20% {
    transform: translate(-15%, 5%);
  }
  30% {
    transform: translate(7%, -5%);
  }
  40% {
    transform: translate(-5%, 5%);
  }
  50% {
    transform: translate(-15%, 10%);
  }
  60% {
    transform: translate(15%, 0%);
  }
  70% {
    transform: translate(0%, 15%);
  }
  80% {
    transform: translate(3%, 9%);
  }
  90% {
    transform: translate(-10%, 10%);
  }
}
</style>

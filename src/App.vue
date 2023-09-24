<script setup>
import {RouterLink, RouterView} from 'vue-router'
import HomeView from "@/views/HomeView.vue";

import {ref, onMounted} from 'vue'
import {useStore} from 'vuex'

const info = ref(true);
let isLightTheme = ref(false);
const store = useStore()

const toggleTheme = () => {
  isLightTheme.value = !isLightTheme.value;

  if (isLightTheme.value) {
    document.documentElement.classList.add('light');
  } else {
    document.documentElement.classList.remove('light');
  }
};

// ----------------------------------------------
// ---------------------------------------------- SPOTIFY
// ----------------------------------------------

import axios from 'axios';

const artists = ['4OAmUQMp9sTuvo55MxGUq4', '6f0a9iVPQDoUEOYPSg55Mk', '1n65zfwYIj5kKEtNgxUlWb', '5UqTO8smerMvxHYA5xsXb6', '7bu3H8JO7d0UbMoVzbo70s', '4a118edzJsiImCyPCZk6mY', '17fRvSxcNP5EIMeMKQiH7Q', '6w8h2uD28BEdg7bX4k3Lh7', '54EC6gwS2xOT550t8Tqthd', '4T01AXq67OdpoYhTZY3FbR', '1nVq0hKIVReeaiB3xJgKf0', '5BC3lvcEEOqVrqMaPjYrgu', '751d4soU7iC3TfGl8y1EyU', '2oNZUW4sR0AGXRyPExtFnW', '0BzJFLqchxKNQyEwswwQ40', '6Nii4K84ZzBZS8X2MP8c9t', "7eQZTqEMozBcuSubfu52i4", "0HVcyKnveIOLkJdAGsE1pk", "5hE6NCoobhyEu6TRSbjOJY", "3WPQHDN5VniDY6JBGUV7UQ", "5N5tQ9Dx1h8Od7aRmGj7Fi", "3j0kMFxXTTYsuw1twLClw3", "762310PdDnwsDxAQxzQkfX", "7wJ9NwdRWtN92NunmXuwBk", "4uAJ9vbmemltkuu0D3gBHQ", "7a0G4CC3dZdKAAzVRnaRGu", "3A6FvoCrZq0imwy7CwSTUA", "0yNLKJebCb8Aueb54LYya3", "3V4FPipSnuYjtHnnAw9cZd", "3No127Hkg9LRf1Q63Uyq35", "7hpTA4ta9iSezFWhwfEbWK", "4ReoJ2faKfdjI0plizlL56", "3AwNBhYb8tZmJ5m0VIKHp2", "4hzCcF4Leos2sKnz79nwhz", "6bxYUbMVzrPTOmzwey8Hgh", "4UETUdF77BfyJ7fEFVztr3", "7K3zpFXBvPcvzhj7zlGJdO"];

const allRelatedArtists = ref(new Map());

onMounted(async () => {
  const { data } = await axios.get('http://localhost:3000/spotify-token');
  const token = data.access_token;

  for (let i = 0; i < artists.length; i++) {
    // Utiliser l'ID de l'artiste pour obtenir les informations de l'artiste
    const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${artists[i]}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const artistData = artistResponse.data;
    allRelatedArtists.value.set(artistData.id, artistData);

    // Utiliser l'ID de l'artiste pour obtenir les artistes liés
    const relatedResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistData.id}/related-artists`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Ajouter seulement les artistes liés avec les genres 'post-punk' et 'coldwave' à la carte
    relatedResponse.data.artists.filter(artist => artist.genres.includes('post-punk') || artist.genres.includes('coldwave') || artist.genres.includes('punk') || artist.genres.includes('rock')).forEach(artist => allRelatedArtists.value.set(artist.id, artist));
  }

  store.dispatch('updateArtists', allRelatedArtists.value);
});
</script>

<template>
  <header>
    <div class="wrapper">
      <div>
        <h1>OBSCURE WAVE</h1>
        <em>Un lieu de découvertes musicales aux sonorités obscures et froides. <br> Des plus paumés aux
          groupes fares d'une époque intemporelle.
          <font-awesome-icon :icon="['fal', 'question-square']" @click="info = !info"/>
        </em> <br>
        <small v-if="!info">bon en vérité tout vient de l'API Spotify et les requêtes sont limitées donc désolé José qui joue du synthé dans son
          garage
          tu ne seras pas répertorié.</small>
      </div>
    </div>
  </header>

  <aside class="side_menu">
    <nav>
      <ul>
        <li>
          <RouterLink to="/">
            <font-awesome-icon :icon="['fal', 'house-heart']" size="lg"/>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/albums">
            <font-awesome-icon :icon="['fal', 'compact-disc']" size="lg"/>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/concerts">
            <font-awesome-icon :icon="['fal', 'balloons']" size="lg"/>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/favoris">
            <font-awesome-icon :icon="['fal', 'star']" size="lg"/>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/compte">
            <font-awesome-icon :icon="['fal', 'user']" size="lg"/>
          </RouterLink>
        </li>
      </ul>
      <div @click="toggleTheme" class="themes">
        <font-awesome-icon v-if="isLightTheme" :icon="['fal', 'moon']" size="lg"/>
        <font-awesome-icon v-else :icon="['fal', 'sun-bright']" size="lg"/>
      </div>
    </nav>
  </aside>

  <RouterView/>
  <div class="grain-wrapper">
    <div v-if="isLightTheme" class="grain-light grain"></div>
    <div v-else class="grain-dark grain"></div>
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

.grain-dark {
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

.grain-light {
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
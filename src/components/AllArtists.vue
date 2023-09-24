<script setup>
import {useStore} from 'vuex'
import {computed, ref, watch} from 'vue'

const store = useStore();
const itemsPerPage = 8;
const currentPage = ref(1);

// Regardez le changement dans le tableau allRelatedArtists
// et mélangez-le une fois, stockez le résultat dans le state
watch(() => store.state.allRelatedArtists.values(), newArtists => {
  store.state.allRelatedArtistsShuffled = Array.from(newArtists);
  store.state.allRelatedArtistsShuffled.sort(() => Math.random() - 0.5);
}, {immediate: true});

const allRelatedArtists = computed(() => store.state.allRelatedArtistsShuffled || []);

const maxPage = computed(() => Math.ceil(allRelatedArtists.value.length / itemsPerPage));
const paginatedArtists = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return allRelatedArtists.value.slice(start, end);
});

function goNextPage() {
  if (currentPage.value < maxPage.value) {
    currentPage.value++;
  }
}

function goPreviousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
</script>

<template>
  <section>
    <h2>Artistes</h2>
    <ul class="galerie">
      <!-- récupérer les artistes -->
      <li v-for="artist in paginatedArtists" :key="artist.id">
        <router-link :to="'/artiste/' + artist.id">
          <img :src="artist.images[0]?.url" :alt="artist.name">
          <div class="card_txt">
            <h3>{{ artist.name }}</h3>
            <small>{{ artist.genres[0] }}</small>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="controls">
      <button @click="goPreviousPage" :disabled="currentPage === 1">
        <font-awesome-icon :icon="['fal', 'arrow-left-from-line']" size="2xl"/>
      </button>
    <p>{{ currentPage }} / {{ maxPage }}</p>
      <button @click="goNextPage" :disabled="currentPage === maxPage">
        <font-awesome-icon :icon="['fal', 'arrow-right-from-line']" size="2xl"/>
      </button>
    </div>
  </section>
</template>
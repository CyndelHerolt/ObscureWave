<script setup>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'

const store = useStore();
const itemsPerPage = 8;
const currentPage = ref(1);
const allRelatedArtists = computed(() => Array.from(store.state.allRelatedArtists.values()));
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
    <h2>Galerie d'artistes</h2>
    <ul class="galerie">
      <!-- récupérer les artistes -->
      <li v-for="artist in paginatedArtists" :key="artist.id">
        <router-link :to="'/artiste/' + artist.id">
          <img :src="artist.images[1]?.url" :alt="artist.name" style="width: 100px">
          <p>{{ artist.name }}</p>
        </router-link>
      </li>
    </ul>
    <p>Page {{ currentPage }} of {{ maxPage }}</p>
    <button @click="goPreviousPage" :disabled="currentPage === 1">Previous</button>
    <button @click="goNextPage" :disabled="currentPage === maxPage">Next</button>
  </section>
</template>
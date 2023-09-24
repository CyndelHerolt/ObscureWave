<script setup>
import {useRoute} from "vue-router"
import {onMounted, ref} from "vue";
import axios from "axios";

const route = useRoute()
const id = route.params.id
const artist = ref('')
let token = '' // Declare a variable for the token

onMounted(async () => {
  // Firstly get the token
  const tokenResponse = await axios.get('http://localhost:3000/spotify-token');
  token = tokenResponse.data.access_token;

  // Include the token in the headers of your axios request
  const response = await axios.get('https://api.spotify.com/v1/artists/' + id, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  artist.value = response.data
})
</script>
<template>

  <img :src="artist.images?.[0]?.url" :alt="artist.name">
  <h2>{{ artist.name }}</h2>
  <ul>
    <li v-for="genre in artist.genres">{{ genre }}</li>
  </ul>
  <hr>
  <pre>{{ artist }}</pre>
</template>
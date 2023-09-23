<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const songData = ref(null);

onMounted(async () => {
  // Obtenir le token d'accès à partir du serveur Node.js
  const { data } = await axios.get('http://localhost:3000/spotify-token');
  const token = data.access_token;

  // Utiliser le token pour interroger l'API de Spotify pour une chanson en particulier.
  const songId = '3n3Ppam7vgaVa1iaRUc9Lp'; // Remplacer par l'ID de la chanson que vous voulez.
  const response = await axios.get(`https://api.spotify.com/v1/tracks/${songId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  songData.value = response.data;
});
</script>

<template>
  <!-- Afficher les informations sur le titre ici -->
  <div v-if="songData">
    <h2>{{ songData.name }}</h2>
    <p>{{ songData.artists.map(artist => artist.name).join(', ') }}</p>
  </div>
</template>
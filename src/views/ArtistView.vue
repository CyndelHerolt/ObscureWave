<script setup>
import {useRoute} from "vue-router"
import {onMounted, ref} from "vue";
import axios from "axios";

const route = useRoute()
const id = route.params.id
const artist = ref('')
const album = ref('')
const topTrack = ref('')
let token = '' // Declare a variable for the token

onMounted(async () => {
  // Firstly get the token
  const tokenResponse = await axios.get('http://localhost:3000/spotify-token');
  token = tokenResponse.data.access_token;

  // Include the token in the headers of your axios request
  const artists = await axios.get('https://api.spotify.com/v1/artists/' + id, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  artist.value = artists.data

  const albums = await axios.get('https://api.spotify.com/v1/artists/' + id + '/albums', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  album.value = albums.data

  const topTracks = await axios.get('https://api.spotify.com/v1/artists/' + id + '/top-tracks?market=FR', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  topTrack.value = topTracks.data
})
</script>
<template>
  <section>
    <div class="artist-header">
      <img :src="artist.images?.[0]?.url" :alt="artist.name">
      <h2>{{ artist.name }}</h2>
      <ul>
        <li v-for="genre in artist.genres">{{ genre }}</li>
      </ul>
    </div>
    <hr>
    <h2>Top Tracks</h2>
    <!--  <pre>-->
    <!--    {{ topTrack }}-->
    <!--  </pre>-->
    <ul>
      <li v-for="track in topTrack.tracks">
        <img :src="track.album.images?.[1]?.url" :alt="track.name">
        <h4>{{ track.name }}</h4>
        <p>{{ track.album.name }}</p>
        <p>Nombre de pistes : {{ track.album.total_tracks }}</p>
        <p>Popularité : {{ track.popularity }}</p>
        <ul>
          artistes
          <li v-for="artist in track.artists">{{ artist.name }}</li>
        </ul>
      </li>
    </ul>
    <hr>
    <h2>Albums</h2>
    <ul>
      <li v-for="album in album.items">
        <img :src="album.images?.[1]?.url" :alt="album.name">
        <h4>{{ album.name }}</h4>
        <p>{{ album.album_type }}</p>
        <p>Date de sortie : {{ album.release_date }}</p>
        <p>Nombre de titres : {{ album.total_tracks }}</p>
        <ul>
          artistes
          <li v-for="artist in album.artists">{{ artist.name }}</li>
        </ul>
      </li>
    </ul>

  </section>
  <!--  <pre>{{ album }}</pre>-->
</template>
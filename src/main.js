import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faQuestionSquare } from '@fortawesome/pro-light-svg-icons'
import { faHouseHeart } from '@fortawesome/pro-light-svg-icons'
import { faCompactDisc } from '@fortawesome/pro-light-svg-icons'
import { faStar } from '@fortawesome/pro-light-svg-icons'
import { faBalloons } from '@fortawesome/pro-light-svg-icons'
import { faUser } from '@fortawesome/pro-light-svg-icons'
import { faSunBright } from '@fortawesome/pro-light-svg-icons'
import { faMoon } from '@fortawesome/pro-light-svg-icons'
import { faArrowRightFromLine } from '@fortawesome/pro-light-svg-icons'
import { faArrowLeftFromLine } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const store = createStore({
    state () {
        return {
            allRelatedArtists: new Map()
        }
    },
    mutations: {
        setArtists (state, artists) {
            state.allRelatedArtists = artists
        }
    },
    actions: {
        updateArtists ({ commit }, artists) {
            commit('setArtists', artists)
        }
    }
})

const app = createApp(App)

app.use(store)
app.use(router)

library.add(faQuestionSquare)
library.add(faHouseHeart)
library.add(faCompactDisc)
library.add(faStar)
library.add(faBalloons)
library.add(faUser)
library.add(faSunBright)
library.add(faMoon)
library.add(faArrowRightFromLine)
library.add(faArrowLeftFromLine)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')


<template>
  <div id="container">
    <header>
      <h1> 
        Pokemon List (<b-button pill variant="success" to="/my-pokemon">{{ totalOwned }} owned</b-button>)
        <b-button pill variant="primary" @click="limit=12;getPokemonList();">Refresh</b-button>
      </h1>
    </header>
    <div class="list">
      <b-container class="bv-example-row">
        <b-row>
          <b-col sm="6" md="3" v-for="(pokemon, i) in pokemons" :key="pokemon.url" style="margin-bottom: 10px;">
            <router-link :to="{ name: 'Pokemon', params: { name: pokemon.name } }">            
              <b-card-group deck>
                <b-card>
                  <b-card-text class="poke-name">
                    {{ pokemon.name }}
                  </b-card-text>
                </b-card>
              </b-card-group>
            </router-link>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            &nbsp;
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-button block variant="primary" @click="getPokemonList(12)">Load More ...</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      pokemons: [],
      limit: 12,
      totalOwned: 0,
      arrPokemon: JSON.parse(localStorage.getItem("pokemonName"))
    }
  },
  mounted() {
    this.getPokemonList()
    this.owned()
  },
  methods: {
    getPokemonList(limit) {
      let pageLimit = typeof limit != 'undefined' ? this.limit + limit : this.limit
      this.limit = pageLimit

      axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${this.limit}`)
      .then((response) => {
        this.pokemons = response.data.results
      })
      .catch((err) => {
        console.log(err)
      })
    },
    owned() {
      if(this.arrPokemon != null) {
        this.totalOwned = this.arrPokemon.length
      }
    }
  }
}
</script>

<style scoped>
.list {
    margin-left: -50px;
}
</style>
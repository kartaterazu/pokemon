<template>
  <div class="container">
    <b-breadcrumb :items="items"></b-breadcrumb>
    <header>
      <h1> 
        My Pokemon List ({{ totalOwned }} owned)
        <b-button pill variant="primary" @click="getPokemonList();">Refresh</b-button>
      </h1>
    </header>
    <div class="list">
      <b-container class="bv-example-row">
        <b-row>
          <b-col md="2" v-for="pokemon in pokemons" :key="pokemon" style="margin-bottom: 10px;">
            <router-link :to="{ name: 'Pokemon', params: { name: pokemon } }">            
              <b-card-group deck>
                <b-card>
                  <b-card-text class="poke-name">
                    {{ pokemon }}
                  </b-card-text>
                </b-card>
              </b-card-group>
            </router-link>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokemons: [],
      totalOwned: 0,
      arrPokemon: JSON.parse(localStorage.getItem("pokemonName")) || [],
      items: [
        {
          text: 'Home',
          to: '/'
        },
        {
          html: `My Pokemon List`,
          href: '#'
        }
      ]
    }
  },
  mounted() {
    this.getPokemonList()
    this.owned()
  },
  methods: {
    getPokemonList(limit) {
      this.pokemons = this.arrPokemon
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
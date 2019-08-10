<template>
  <div class="container">
    <b-breadcrumb :items="items"></b-breadcrumb>
    <header>
      <h1> 
        My Pokemon List ({{ totalOwned }} owned)
        <b-button pill variant="primary" @click="getPokemonList()">Refresh</b-button>
      </h1>
    </header>
    <div class="list">
      <b-container class="bv-example-row">
        <b-row v-if="totalOwned > 0">
          <b-col sm="6" md="2" v-for="pokemon in pokemons" :key="pokemon.name" style="margin-bottom: 10px;">
            <b-card-group deck>
              <b-card :img-src="pokemon.images" :img-alt="pokemon.name" img-top class="mb-2">
                <router-link :to="{ name: 'Pokemon', params: { name: pokemon.name } }">            
                  <b-card-text class="poke-name">
                    {{ pokemon.name }} ({{ pokemon.nickname }})
                  </b-card-text>
                </router-link>
                <b-button pill variant="danger" @click="removePokemon(pokemon.name)">Remove</b-button>
              </b-card>
            </b-card-group>
          </b-col>
        </b-row>
        <b-row v-else style="text-align: center;">
          <b-col md="12">
            <b-alert show variant="info">
              You don't have any pokemon, catch your favourite pokemon on&nbsp;<router-link to="/">Pokemon List</router-link>
            </b-alert>
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
    },
    removePokemon(pokemon) {
      this.$bvModal.msgBoxConfirm(`Please confirm that you want to delete ${pokemon}.`, {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          headerBgVariant: 'danger',
          headerTextVariant: 'light',
          centered: true
      })
      .then(value => {
        if(value) {
          var filtered = this.pokemons.filter(function(value, index, arr){

              return value.name != pokemon;

          })

          localStorage.setItem("pokemonName", JSON.stringify(filtered))
          this.totalOwned = filtered.length
          this.arrPokemon = JSON.parse(localStorage.getItem("pokemonName")) || []
          this.pokemons   = this.arrPokemon

          this.makeToast('success', 'Congratulations', `${pokemon} has been remove from your pokemon list`)
        }
      })
      .catch(err => {
        this.makeToast('danger', 'Ooops..!!', `Failed to remove ${pokemon} from your pokemon list`)
        console.log(err)
        return false
      })
    },
    makeToast(variant, title, msg) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      })
    }
  }
}
</script>

<style scoped>
.list {
    margin-left: -50px;
}
</style>
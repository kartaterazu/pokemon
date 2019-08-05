<template>
  <div class="container">
    <div class="pokemon-detail">
      <b-breadcrumb :items="items"></b-breadcrumb>
      <b-container class="bv-example-row">
        <div class="mt-4">
          <h4 class="poke-name">{{ pokemon.name }}</h4>
          <b-card 
            :img-src="img"
            :img-alt="pokemon.name" 
            img-left 
            class="mb-3">
            <b-card-text>
              {{ pokemonDesc }}
              <br>
              <small class="text-muted">
                <b-button pill variant="primary" @click="catchPokemon(pokemon.name)" v-if="catched == false">
                  Catch Me !!
                </b-button>
                <b-alert show variant="success" v-if="catched == true">
                  <h4 class="alert-heading">Well done!</h4>
                  <p>
                    <span class="poke-name">{{ pokemon.name }}</span> is your owned pokemon's
                    <br>
                    Go to <b-button pill variant="info" to="/my-pokemon">My Pokemon</b-button> page to see your cathed pokemons
                  </p>
                </b-alert>
              </small>
            </b-card-text>
          </b-card>
        </div>
      </b-container>
      <b-container class="bv-example-row">
        <b-row>
          <h4 class="poke-name">Moves</h4>
        </b-row>
        <b-row>
          <b-col md="2" v-for="(moveData, i) in moves" :key="moveData.move.name" style="margin-bottom: 10px;">
            <b-card-group deck>
              <b-card>
                <b-card-text class="poke-name">
                  {{ moveData.move.name }}
                </b-card-text>
              </b-card>
            </b-card-group>
          </b-col>
        </b-row>
      </b-container>
      <b-container class="bv-example-row">
        <b-row>
          <h4 class="poke-name">Types</h4>
        </b-row>
        <b-row>
          <b-col md="2" v-for="(typeData, i) in types" :key="typeData.type.name" style="margin-bottom: 10px;">
            <b-card-group deck>
              <b-card>
                <b-card-text class="poke-name">
                  {{ typeData.type.name }}
                </b-card-text>
              </b-card>
            </b-card-group>
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
          pokemon: {},
          pokemonDesc: '',
          img: '',
          items: [
            {
              text: 'Home',
              to: '/'
            },
            {
              html: `<span class="poke-name">${this.$route.params.name}</span>`,
              href: '#'
            }
          ],
          moves: [],
          types: [],
          arrPokemon: JSON.parse(localStorage.getItem("pokemonName")),
          catched: false
      }
  },
  mounted() {
      this.getPokemonDetail()
      this.isCatched()
  },
  methods: {
      getPokemonDetail() {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.name}`)
        .then((response) => {
          this.pokemon  = response.data
          this.img      = this.pokemon.sprites.front_shiny
          this.moves    = response.data.moves
          this.types    = response.data.types

          this.getPokemonDesc(this.pokemon.abilities[0].ability.url)
        })
        .catch((err) => {
          console.log(err)     
        })
      },
      getPokemonDesc(url) {
        axios.get(url)
        .then((response) => {
          this.pokemonDesc  = response.data.effect_entries[0].effect
        })
        .catch((err) => {
          console.log(err)     
        })
      },
      catchPokemon(pokemonName) {
        let catched = Math.floor(Math.random() * 2)

        if(catched == 1) {
          setTimeout(this.catchedSuccess(pokemonName),2000)
        } else {
          this.makeToast('info', 'HAHAHAHA...!!', "you're weak, you must try harder to catch me!! HAHAHAHA..!!")
        }
      },
      isCatched() {
        if(this.arrPokemon != null) {
          if(this.arrPokemon.includes(this.$route.params.name))
          {
            this.catched = true
          }
        }
      },
      catchedSuccess(pokemonName) {
        var arrPokemon = []
        
        if(this.arrPokemon == null) {
          arrPokemon.push(pokemonName)
        } else {
          arrPokemon = this.arrPokemon
          arrPokemon.push(pokemonName)
        }

        localStorage.setItem("pokemonName", JSON.stringify(arrPokemon))
        this.catched = true
        this.makeToast('success', 'Congratulations', "Aww.. you catch me.. i'll be your good pokemon sir")
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
ul li {
    list-style: none;
}
img {
  width: 150px;
  height:100%
}
</style>
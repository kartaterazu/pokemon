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
                <b-button pill variant="primary" v-b-modal.modal-catch v-if="catched == false">
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
          <b-col sm="4" md="2" v-for="(moveData, i) in moves" :key="moveData.move.name" style="margin-bottom: 10px;">
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
        <b-modal
          id="modal-catch"
          ref="modal"
          title="Submit Your Pokemon Nick Name"
          ok-title="Catch !"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
        >
          <form ref="form" @submit.stop.prevent="catchPokemon(pokemon.name, img)">
            <b-form-group
              :state="nameState"
              label="Pokemon Nick Name"
              label-for="name-input"
              invalid-feedback="Nick Name is required"
            >
              <b-form-input
                id="name-input"
                v-model="nick_name"
                :state="nameState"
                required
              ></b-form-input>
            </b-form-group>
          </form>
        </b-modal>
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
          catched: false,
          nick_name: '',
          nameState: null
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
      catchPokemon(pokemonName, img) {
        let catched = Math.floor(Math.random() * 2)

        if(catched == 1) {
          setTimeout(this.catchedSuccess(pokemonName, img),2000)
        } else {
          this.makeToast('info', 'HAHAHAHA...!!', "you're weak, you must try harder to catch me!! HAHAHAHA..!!")
        }
      },
      isCatched() {
        if(this.arrPokemon != null) {
          let pokemonName = this.$route.params.name
          var newPokemon = []

          var filtered = this.arrPokemon.filter(function(value, index, arr){
            newPokemon.push(value.name)
            return newPokemon
          })

          if(newPokemon.includes(this.$route.params.name))
          {
            this.catched = true
          }
        }
      },
      catchedSuccess(pokemonName, img) {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }

        var arrPokemon = []
        
        if(this.arrPokemon == null) {
          arrPokemon.push(pokemonName)
        } else {
          arrPokemon = this.arrPokemon
          var newPokemon = {name: pokemonName, nickname: this.nick_name, images: img}
          arrPokemon.push(newPokemon)
        }

        localStorage.setItem("pokemonName", JSON.stringify(arrPokemon))
        this.catched = true
        this.makeToast('success', 'Congratulations', "Aww.. you catch me.. i'll be your good pokemon sir")

        // Hide the modal manually
        this.$nextTick(() => {
          this.$refs.modal.hide()
        })
      },
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid ? 'valid' : 'invalid'
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()

        // Trigger submit handler
        this.catchedSuccess(this.pokemon.name, this.img)
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
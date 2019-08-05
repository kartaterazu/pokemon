import Home from "./components/Home"
import Pokemon from "./components/Pokemon"
import MyPokemon from "./components/MyPokemon"

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/pokemon/:name",
    name: "Pokemon",
    component: Pokemon
  },
  {
    path: "/my-pokemon",
    name: "MyPokemon",
    component: MyPokemon
  }
]

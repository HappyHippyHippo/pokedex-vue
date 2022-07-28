import { createStore } from "vuex";

export default createStore({
  state: {
    pokemon: {
      id: 0,
      name: "",
      image: "#",
    },
  },
  getters: {
    pokemonId: (ctx) => ctx.pokemon.id,
    pokemonName: (ctx) => ctx.pokemon.name,
    pokemonImage: (ctx) => ctx.pokemon.image,
  },
  mutations: {
    setPokemon: (ctx, payload) => (ctx.pokemon = payload),
  },
  actions: {},
  modules: {},
});

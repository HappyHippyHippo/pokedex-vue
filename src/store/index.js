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
    getPokemonID: (ctx) => ctx.pokemon.id,
    getPokemonName: (ctx) => ctx.pokemon.name,
    getPokemonImage: (ctx) => ctx.pokemon.image,
  },
  mutations: {
    setPokemon: (ctx, payload) => (ctx.pokemon = payload),
  },
  actions: {
    incrementPokemon: async (ctx) => {
      await ctx.dispatch("loadPokemon", ctx.state.pokemon.id + 1);
    },
    decrementPokemon: async (ctx) => {
      if (ctx.state.pokemon.id > 1) {
        await ctx.dispatch("loadPokemon", ctx.state.pokemon.id - 1);
      }
    },
    loadPokemon: async (ctx, payload) => {
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${payload}`);
      if (resp.status === 200) {
        const json = await resp.json();
        ctx.commit("setPokemon", {
          id: json.id,
          name: json.name,
          image:
            json["sprites"]["versions"]["generation-v"]["black-white"][
              "animated"
            ]["front_default"],
        });
      } else {
        ctx.commit("setPokemon", {
          id: "",
          name: "Not found",
          image: "#",
        });
      }
    },
  },
  modules: {},
});

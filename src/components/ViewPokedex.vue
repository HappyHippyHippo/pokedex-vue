<template>
  <main>
    <img v-bind:src="pokemonImage" alt="" class="pokemon__image" />

    <h1 class="pokemon__data">
      <span class="pokemon__number">{{ pokemonId }}</span> -
      <span class="pokemon__name">{{ pokemonName }}</span> -
    </h1>

    <form class="form" @submit="requestPokemon">
      <input
        v-model="id"
        type="search"
        class="input__search"
        placeholder="Name or Number"
        required
      />
    </form>

    <div class="buttons">
      <button class="button btn-prev" @click="decrementPokemon">
        Prev &lt;
      </button>
      <button class="button btn-next" @click="incrementPokemon">
        Next &gt;
      </button>
    </div>

    <img src="@/assets/pokedex.png" alt="pokedex" class="pokedex" />
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import { PokeAPI } from "@/apis/pokeapi";

export default {
  name: "ViewPokedex",
  api: null,
  data: function () {
    return {
      id: "",
    };
  },
  computed: {
    pokemonId: function () {
      return this.getPokemonId();
    },
    pokemonName: function () {
      return this.getPokemonName();
    },
    pokemonImage: function () {
      return this.getPokemonImage();
    },
  },
  created() {
    this.api = new PokeAPI(this.$store);
  },
  mounted() {
    this.api.get(1);
  },
  methods: {
    ...mapGetters({
      getPokemonId: "pokemonId",
      getPokemonName: "pokemonName",
      getPokemonImage: "pokemonImage",
    }),
    decrementPokemon() {
      this.api.decrement();
    },
    incrementPokemon() {
      this.api.increment();
    },
    requestPokemon(event) {
      event.preventDefault();
      this.api.get(this.id.toLowerCase());
      this.id = "";
    },
  },
};
</script>

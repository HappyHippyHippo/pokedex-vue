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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ViewPokedex",
  data: function () {
    return {
      id: "",
    };
  },
  computed: {
    pokemonId: function () {
      return this.getPokemonID();
    },
    pokemonName: function () {
      return this.getPokemonName();
    },
    pokemonImage: function () {
      return this.getPokemonImage();
    },
  },
  mounted() {
    this.$store.dispatch("loadPokemon", 1);
  },
  methods: {
    ...mapActions({
      loadPokemon: "loadPokemon",
    }),
    ...mapGetters({
      getPokemonID: "getPokemonID",
      getPokemonName: "getPokemonName",
      getPokemonImage: "getPokemonImage",
    }),
    decrementPokemon() {
      this.$store.dispatch("decrementPokemon");
    },
    incrementPokemon() {
      this.$store.dispatch("incrementPokemon");
    },
    requestPokemon(event) {
      this.$store.dispatch("loadPokemon", this.id);
      event.preventDefault();
      this.id = "";
    },
  },
};
</script>

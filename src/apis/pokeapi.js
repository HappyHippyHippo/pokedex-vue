import axios from "axios";

export class PokeAPI {
  constructor(store) {
    this._store = store;
  }

  async get(pokemon) {
    this._store.commit(
      "setPokemon",
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((resp) => {
          if (resp.status === 200) {
            return {
              id: resp.data.id,
              name: resp.data.name,
              image:
                resp.data["sprites"]["versions"]["generation-v"]["black-white"][
                  "animated"
                ]["front_default"],
            };
          } else throw new Error("pokemon not found");
        })
        .catch(() => {
          return {
            id: "",
            name: "Not found",
            image: "#",
          };
        })
    );
  }

  increment() {
    this.get(this._store.getters.pokemonId + 1);
  }

  decrement() {
    const id = this._store.getters.pokemonId;
    if (id > 1) this.get(id - 1);
  }
}

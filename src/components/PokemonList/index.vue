<template>
  <div>
    <v-container>
      <v-row>
        <h2>
          LIST
        </h2>
      </v-row>
      <v-row>
        <v-col
          v-for="(pokemon, index) in pokemons"
          :key="`pokemon-${index}`"
          cols="12"
          sm="12"
          md="6"
          lg="4"
          xl="4"
        >
        <PokemonCard 
          :pokemon="pokemon"
        />
        </v-col>
      </v-row>
      <v-row>
        <v-btn
          class="centralized mb-6 mt-6 highlight-button"
          @click="loadMorePokemons()"
        >
          Load More
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PokemonCard from '@/components/PokemonCard';

export default {
  name: 'PokemonList',

  components: {
    PokemonCard,
  },

  data() {
    return {
      pokemons: []
    };
  },

  mounted() {
    this.getPokemons();
  },

  methods: {
    getPokemons(offset = 1, limit = 21) {
      const promises = [];
      for (let i = offset; i <= limit; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(res => res.json()));
      }

      Promise.all(promises).then(results => {
        results.map(data => this.pokemons.push({
          name: data.name,
          id: data.id,
          image: data.sprites["front_default"],
          type: data.types.map(type => type.type.name),
        }));
      })
    },
    loadMorePokemons() {
      const offset = this.pokemons.length + 1;
      const limit = this.pokemons.length + 21;
      this.getPokemons(offset, limit);
    },
  }
}
</script>
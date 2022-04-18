<template>
  <div>
    <v-form
      v-model="valid"
      @submit="submit"
    >
      <v-text-field
        v-model="search"
        placeholder="Search a pokemon"
        class="centralized"
      >
        <v-icon
          slot="append"
          @click="submit"
        >
          mdi-magnify
        </v-icon>
      </v-text-field>
    </v-form>
    <v-alert
      :value="alert"
      text
      prominent
      type="error"
      icon="mdi-cloud-alert"
      transition="scale-transition"
    >
      {{ errorText }}
    </v-alert>
    <div
      v-if="pokemons.length > 0"
    >
      <v-divider
        class="mb-6"
      />
        <div
          class="d-flex flex-row mb-6"
        >
          <h2>
            HISTORY
          </h2>        
          <v-btn
            class="ml-2"
            @click="deleteHistory()"
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
      <v-slide-group
        center-active
        show-arrows
        class="pa-2"
      >
        <v-slide-item
          v-for="(pokemon, index) in pokemons"
          :key="`history-pokemon-${index}`"
          class="mr-6 mb-6 history-card"
        >
          <PokemonCard
            :pokemon="pokemon"
          />
        </v-slide-item>
      </v-slide-group>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>
import PokemonCard from '@/components/PokemonCard';

import axios from "axios";

export default {
  name: 'SearchForm',

  components: {
    PokemonCard
  },

  data() {
    return {
      search: '',
      valid: true,
      alert: false,
      pokemons: [],
    };
  },

  props: {
    errorText: {
      type: String,
      default: 'Oops! Something went wrong.',
    }
  },

  mounted() {
    if (localStorage.history) {
      localStorage.history.split(',').map(pokemonId => this.getPokemonById(pokemonId));
    }
  },

  methods: {
    submit(event) {
      event.preventDefault();
      const url = `https://pokeapi.co/api/v2/pokemon/${this.search}`;
      axios.get(url)
      .then((response) => {
        if (localStorage.history) {
          localStorage.history = [response.data.id,localStorage.history];
        } else {
          localStorage.history = response.data.id;
        }
        this.$router.push({ name: 'Pokemon', params: { id: response.data.id } });
      })
      .catch(() => {
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        },3000);
      })
    },

    getPokemonById(id) {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      axios.get(url)
      .then((response) => {
        this.pokemons.push({
          ...response.data,
          image: response.data.sprites["front_default"],
          type: response.data.types.map(type => type.type.name),
        });
      })
    },

    deleteHistory() {
      if(confirm('Do you really want to delete this history?')) {
        localStorage.history = null;
        this.pokemons = [];
      }
    }
  }
}
</script>
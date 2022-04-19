<template>
  <v-card
    class="height-500"
    elevation="10"
    outlined
  >
    <v-list-item four-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          {{ getFormattedPokemonCode(pokemon.id) }}
        </div>
        <v-list-item-title class="text-h5 mb-1">
          <span>
            {{ getFormattedPokemonName(pokemon.name) }}
          </span>
        </v-list-item-title>
        <v-list-item-subtitle>
          <v-row
            v-for="type in pokemon.type"
            :key="`pokemon-${pokemon.code}-${type}`"
            class="ma-2"
          >
            <v-chip
              :class="getTypeColor(type)"
            >
              {{ type }}
            </v-chip>
          </v-row>
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
      >
        <v-img :src="pokemon.image"></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
        width="100%"
        class="highlight-button"
        @click="seePokemonDetails(pokemon.id)"
      >
        See more
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PokemonCard',

  props: {
    pokemon: {
      type: Object,
      required: true,
    }
  },

  methods: {
    getFormattedPokemonCode(code) {
      return `#${("000" + code).slice(-3)}`;
    },

    getFormattedPokemonName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1)
    },

    seePokemonDetails(id) {
      this.$router.push({ name: 'Pokemon', params: { id } })
    },

    getTypeColor(type) {
      return `pokemon-type-color pokemon-type-color__${type}`;
    }
  }
}
</script>
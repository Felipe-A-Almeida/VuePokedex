<template>
  <div>
    <v-row
      class="mt-6 ml-6"
    >
      <v-btn
        @click="goBack()"
      >
        <v-icon>
          mdi-arrow-left-thick
        </v-icon>
        Back
      </v-btn>
    </v-row>
    <v-container
      class="mt-12"
    >
      <v-row>
        <v-col
          cols="12"
          sm="12"
          md="2"
          lg="2"
          xl="2"
        />
        <v-col
          cols="12"
          sm="12"
          md="4"
          lg="4"
          xl="4"
        >
          <v-img 
            :src="image"
            :alt="this.name"
            max-width="350px"
          />
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="4"
          lg="4"
          xl="4"
        >
          <v-container>
            <v-row>
              <h1>
                {{ getFormattedPokemonCode(id) }} - {{ getFormattedName(name) }}
              </h1>
            </v-row>
            <v-row>
              <v-col
                v-for="type in types"
                :key="`type-${type.type.name}`"
              >
                <v-chip
                  :class="getTypeColor(type.type.name)"
                >
                  {{ getFormattedName(type.type.name) }}
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-row>
                  <span
                    class="subtitle"
                  >
                    ABILITIES
                  </span>                
                </v-row>
                <v-row
                  v-for="ability in abilities"
                  :key="`abilty-${ability.ability.name}`"
                >
                  {{ getFormattedName(ability.ability.name) }}
                </v-row>
              </v-col>
              <v-col>
                <v-row>
                  <span
                    class="subtitle"
                  >
                    LOCATION AREA
                  </span>
                </v-row>
                <v-row
                  v-for="location in locations"
                  :key="`location-${location}`"
                >
                  {{ getFormattedName(location) }}
                </v-row>
              </v-col>
            </v-row>
            <v-divider
              class="mt-6 mb-6"
            ></v-divider>
            <v-row>
              <v-col>
                <v-row>
                  <span
                    class="subtitle"
                  >
                    STATUS
                  </span>
                </v-row>
                <v-row>
                  <v-col
                    v-for="stat in stats"
                    :key="`stat-${stat.name}`"
                    cols="12"
                    sm="12"
                    md="6"
                    lg="6"
                    xl="6"
                  >
                    <span
                      class="highlighted-text"
                    >
                      {{ getFormattedName(stat.name) }}:
                    </span>
                    <span>
                      {{ stat.value }}
                    </span>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="2"
          lg="2"
          xl="2"
        />
      </v-row>
    </v-container>
  </div>
</template>

<script>

  import axios from 'axios';

  export default {
    name: 'Pokemon',

    data() {
      return {
        id: '',
        name: '',
        types: [],
        abilities: [],
        stats: [],
        image: '',
        locations: [],
      };
    },

    mounted() {
      this.getPokemon();
    },
    
    methods: {
      getPokemon() {
        const id = this.$route.params.id;
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        fetch(url).then(res => res.json())
        .then(result => {
          this.id = result.id;
          this.name = result.name
          this.types = result.types;
          this.abilities = result.abilities;
          this.stats = result.stats.map(stat => ({ name: stat.stat.name, value: stat.base_stat }))
          this.image = result.sprites.other['official-artwork'].front_default;
          this.getLocations(result.location_area_encounters);
        })
      },

      getLocations(locationURL) {
        axios.get(locationURL)
        .then((response) => {
          this.locations = response.data.length > 0 ?
            response.data.map(location => location.location_area.name) :
            this.locations = ['No locations found'];
        })
        .catch(() => {
          this.locations = ['No locations found'];
        })
      },

      goBack() {
        console.log(this.$route);
        this.$router.back();
      },

      getFormattedPokemonCode(code) {
        return `#${("000" + code).slice(-3)}`;
      },

      getFormattedName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1)
      },

      getTypeColor(type) {
        return `pokemon-type-color pokemon-type-color__${type}`;
      }
    }
  }
</script>

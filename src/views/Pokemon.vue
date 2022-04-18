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
    <PokemonDetail />
  </div>
</template>

<script>
  import PokemonDetail from '@/components/PokemonDetail';

  export default {
    name: 'Pokemon',

    components: {
      PokemonDetail,
    },
    
    methods: {
      goBack() {
        this.$router.back();
      },
    }
  }
</script>

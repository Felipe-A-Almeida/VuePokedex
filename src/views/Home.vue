<template>
  <div class="home">
    <div
      class="mb-6 mt-6"
    >
      <div
        class="pa-2"
      >
        <v-container>
          <Title
            :classes="classes"
            :text="titleText"
          />
          <SearchForm 
            :error-text="searchFormErrorText"
          />
        </v-container>
      </div>
    </div>
    <v-container>
      <PokemonList />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Title from '@/components/Title';
import SearchForm from '@/components/SearchForm';
import PokemonList from '@/components/PokemonList';

export default {
  name: 'Home',
  components: {
    Title,
    SearchForm,
    PokemonList,
  },

  data() {
    return {
      classes: 'centralized',
      titleText: 'WELCOME TO THE POKEDEX',
      searchFormErrorText: 'ERROR: The searched Pokemon was not found.',
    };
  },
}
</script>

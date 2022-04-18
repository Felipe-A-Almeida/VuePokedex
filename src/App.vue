<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Pokemon Logo"
          class="shrink mr-2"
          contain
          src="./../public/pokemon-23.svg"
          transition="scale-transition"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/Felipe-A-Almeida/VuePokedex"
        target="_blank"
        text
      >
        <v-img
          src="./../public/github-icon-1.svg"
          alt="Github Logo"
          contain
          transition="scale-transition"  
          width="30"
          class="mr-2 mb-1"
        />
        <span class="mr-2">Github</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

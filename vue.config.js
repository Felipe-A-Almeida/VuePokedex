module.exports = {
  
  publicPath: process.env.NODE_ENV === "production" ? "/VuePokedex/" : "/",

  transpileDependencies: [
    'vuetify'
  ]
}

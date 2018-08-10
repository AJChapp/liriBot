console.log(`this is loaded`)

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
exports.openWeather = {
  key: process.env.oWApi
}
exports.omdbAPI={
  key: process.env.omdbAPI
}
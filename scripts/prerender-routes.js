(async () => {
  const fs = require('fs')
  const TOTAL_POKEMONS = 151
  const TOTAL_PAGES = 12

  //Pokemons
  const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  let fileContentPokemon = pokemonIds.map((id)=> `/pokemon/${id}`).join('\n')
  //Pages
  const pokemonPages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);
  let fileContentPage = pokemonPages.map((n)=> `/pokemons/page/${n}`).join('\n')

  let fileContent = fileContentPage + '\n' +fileContentPokemon

  const pokemonNameList = await fetch( `https://pokeapi.co/api/v2/pokemon?limit=${ TOTAL_POKEMONS }` )
    .then( res => res.json() );

  fileContent += '\n';
  fileContent += pokemonNameList.results.map(
    pokemon => `/pokemons/${ pokemon.name }`
  ).join( '\n' );

  fs.writeFileSync('routes.txt', fileContent)

  console.log('Static file generated')
})();
//node scripts/prerender-routes.js

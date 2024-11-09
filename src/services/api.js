const basePath = 'https://pokeapi.co/api/v2/'
const slug = 'pokemon?limit=100000&offset=0.'

export async function getPokemons() {
    try {
        const resp = await fetch(`${basePath}${slug}`)
        const respJson = resp.json()
        return respJson
    } catch (error) {
        console.error('Deu ruim: ', error)
    }
}



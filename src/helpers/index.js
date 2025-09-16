export function getEvolutionChain(chain) {
  const evoArray = []
  let current = chain

  while (current) {
    evoArray.push(current?.species)
    if (current?.evolves_to?.length > 0) {
      current = current.evolves_to[0]
    } else {
      current = null
    }
  }

  return evoArray
}

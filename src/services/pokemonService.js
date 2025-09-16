import { LIMIT_FOR_PAGE } from "../helpers/constants";

const BASE_URL = 'https://pokeapi.co/api/v2'

async function handleResponse(res, context) {
  if (!res.ok) {
    let message;
    switch (res.status) {
      case 404:
        message = `${context} no encontrado`;
        break;
      case 500:
        message = `Error interno del servidor al obtener ${context}`;
        break;
      default:
        message = `Error ${res.status} al obtener ${context}`;
    }
    throw new Error(message);
  }
  return res.json();
}

export async function fetchPokemonSpecies(offset = 0, limit = LIMIT_FOR_PAGE) {
  const res = await fetch(`${BASE_URL}/pokemon-species?offset=${offset}&limit=${limit}`)
  return handleResponse(res, 'Lista de Pokémon');
}

export async function fetchPokemonSpeciesDetail(name) {
  const res = await fetch(`${BASE_URL}/pokemon/${name}`)
  return handleResponse(res, `Pokémon ${name}`);
}

export async function fetchPokemonSpeciesById(id) {
  const res = await fetch(`${BASE_URL}/pokemon-species/${id}`)
  return handleResponse(res, `Pokémon con id ${id}`);
}

export async function fetchEvolutionChain(url) {
  const id = url.split("/").filter(Boolean).pop();
  const res = await fetch(`${BASE_URL}/evolution-chain/${id}`)
  return handleResponse(res, 'Cadena de evolución');
}
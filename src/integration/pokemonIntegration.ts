import axios from 'axios';
import { Pokemon } from '../@types/pokemon';

const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

const API_URL =
  'https://lnh1dhp1mj.execute-api.us-east-1.amazonaws.com/api-pokemon';

/* POKEAPI*/

export const getPokemons = async (
  limit = 151
): Promise<Pokemon[]> => {
  const response = await pokeApi.get(
    `/pokemon?limit=${limit}`
  );

  const list = response.data.results;

  const detailedList = await Promise.all(
    list.map(async (pokemon: { url: string }) => {
      const detailRes = await axios.get(
        pokemon.url
      );

      const data = detailRes.data;

      return {
        nome: data.name,
        index: data.id.toString().padStart(3, '0'),
        tipos: data.types.map(
          (t: any) => t.type.name
        ),
        imagem: data.sprites.front_default,
        poderes: data.stats.map(
          (s: any) => ({
            nome: s.stat.name,
            forca: s.base_stat,
          })
        ),
      };
    })
  );

  return detailedList;
};

/* API DO PROJETO */

export async function getTeam(
  userId: string
) {
  const response = await fetch(
    `${API_URL}/pokemon/v1/team?user-id=${userId}`
  );

  return response.json();
}

export async function capturePokemon(
  userId: string,
  pokemonId: number
) {
  const response = await fetch(
    `${API_URL}/pokemon/v1/captured?user-id=${userId}&pokemon-id=${pokemonId}`,
    {
      method: 'PUT',
    }
  );

  return response.json();
}

export async function releasePokemon(
  userId: string,
  pokemonId: number
) {
  const response = await fetch(
    `${API_URL}/pokemon/v1/captured?user-id=${userId}&pokemon-id=${pokemonId}`,
    {
      method: 'DELETE',
    }
  );

  return response.json();
}
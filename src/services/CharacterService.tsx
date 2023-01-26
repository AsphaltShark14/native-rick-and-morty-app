import { QueryFunction } from "@tanstack/react-query";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { InfoData } from "../utils/types";

type CharacterId = number;
type CharactersIds = string[];

type Origin = {
  name: string;
  url: string;
};

type Location = {
  name: string;
  url: string;
};

export type Character = {
  episode: string[];
  gender: string;
  id: CharacterId;
  image: string;
  location: Location;
  name: string;
  origin: Origin;
  species: string;
  status: string;
  type: string;
};

export type CharacterListResult = {
  error?: string;
  info: InfoData;
  results: Character[];
};

export type CharacterListArgs = {
  query?: string;
};

type CharacterKey = ["character", CharacterId];
type CharactersKey = ["characters", CharacterListArgs] | ["characters"];
type CharactersEpisodeKey = ["episodeCharacter", CharactersIds];

export type CharacterServiceValue = {
  episodeKey: (arg: CharactersIds) => CharactersEpisodeKey;
  episodeList: QueryFunction<Character[], CharactersEpisodeKey>;
  get: QueryFunction<Character, CharacterKey>;
  key: (id: number) => CharacterKey;
  list: QueryFunction<CharacterListResult, CharactersKey>;
  listKey: (args: CharacterListArgs) => CharactersKey;
};

type CharacterServiceNullableValue =
  | {
      isInitialized: false;
    }
  | {
      isInitialized: true;
      value: CharacterServiceValue;
    };

export const CharacterService = createContext<CharacterServiceNullableValue>({
  isInitialized: false,
});

export const useCharacterService = (): CharacterServiceValue => {
  const context = useContext(CharacterService);

  if (!context.isInitialized) {
    throw new Error("CharacterService not defined");
  }

  return context.value;
};

type Props = {
  children: ReactNode;
};

export const CharacterServiceProvider = ({ children }: Props): ReactElement => {
  const value = useMemo<CharacterServiceNullableValue>(() => {
    return {
      isInitialized: true,
      value: {
        episodeKey: (arg) => ["episodeCharacter", arg],
        episodeList: async ({ queryKey }) => {
          const [, arg] = queryKey;
          const ids = arg.join();

          const response = await fetch(
            `https://rickandmortyapi.com/api/character/${ids}`
          );
          const result = await response.json();

          return result;
        },
        get: async ({ queryKey }) => {
          const [, id] = queryKey;

          const response = await fetch(
            `https://rickandmortyapi.com/api/character/${id}`
          );

          const result = response.json();

          return result;
        },
        key: (id) => ["character", id],
        list: async ({ queryKey, pageParam }) => {
          const [, args] = queryKey;

          const fetchURL =
            pageParam || "https://rickandmortyapi.com/api/character/?page=1";

          if (!args?.query) {
            const response = await fetch(fetchURL);
            const data = await response.json();

            return data;
          }

          const response = await fetch(`${fetchURL}&name=${args.query}`);
          const data = await response.json();

          return data;
        },
        listKey: (args) => {
          return args ? ["characters", args] : ["characters"];
        },
      },
    };
  }, []);

  return (
    <CharacterService.Provider value={value}>
      {children}
    </CharacterService.Provider>
  );
};

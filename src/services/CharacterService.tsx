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

export type CharacterServiceValue = {
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
        get: async ({ queryKey }) => {
          const [, id] = queryKey;

          const response = await fetch(
            `https://rickandmortyapi.com/api/character/${id}`
          );

          const result = response.json();

          return result;
        },
        key: (id) => ["character", id],
        list: async ({ queryKey, pageParam = "1" }) => {
          const [, args] = queryKey;

          const page: string =
            pageParam.length === 1 ? pageParam : pageParam.split("=").pop();

          if (!args?.query) {
            const response = await fetch(
              `https://rickandmortyapi.com/api/character/?page=${page}`
            );
            const data = await response.json();

            return data;
          }

          const response = await fetch(
            `https://rickandmortyapi.com/api/character/?name=${args.query}&page=${page}`
          );
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

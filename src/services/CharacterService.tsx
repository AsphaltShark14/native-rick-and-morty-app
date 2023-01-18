import { QueryFunction } from "@tanstack/react-query";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";

type CharacterId = number;

type Origin = {
  link: string;
  originLocation: string;
};

type Location = {
  link: string;
  location: string;
};

type InfoData = {
  count: number;
  next: string;
  pages: number;
  prev: null | string;
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
  info: InfoData;
  results: Character[];
};

export type CharacterListArgs = {
  query?: string;
};

type CharactersKey = ["characters", CharacterListArgs] | ["characters"];

export type CharacterServiceValue = {
  list: QueryFunction<Character[], CharactersKey>;
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
        list: async ({ queryKey }) => {
          const [, args] = queryKey;

          if (!args) {
            const response = await fetch(
              "https://rickandmortyapi.com/api/character"
            );
            const data = await response.json();

            const result: Character[] = data.results;

            return result;
          }

          const searchParams = new URLSearchParams({
            name: args.query as string,
          });

          const response = await fetch(
            `https://rickandmortyapi.com/api/character/?name=${args.query}`
          );
          const data = await response.json();

          const result: Character[] = data.results;

          return result;
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

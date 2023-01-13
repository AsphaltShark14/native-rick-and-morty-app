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

type CharactersKey = ["characters"];

export type CharacterServiceValue = {
  list: QueryFunction<Character[], CharactersKey>;
  listKey: () => CharactersKey;
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
        list: async () => {
          const response = await fetch(
            "https://rickandmortyapi.com/api/character"
          );

          const result = await response.json();

          return result;
        },
        listKey: () => {
          return ["characters"];
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

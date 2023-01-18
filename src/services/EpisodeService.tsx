import { QueryFunction } from "@tanstack/react-query";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { InfoData } from "../utils/types";

type EpisodeId = number;
type EpisodesIds = string[];

export type Episode = {
  airDate: string;
  characters: string[];
  episode: string;
  id: EpisodeId;
  name: string;
};

export type EpisodeListResult = {
  info: InfoData;
  results: Episode[];
};

export type EpisodeListArgs = {
  id?: string[];
  query?: string;
};

type EpisodeKey = ["episode", EpisodeId];
type EpisodesKey = ["episodes", EpisodeListArgs] | ["episodes"];
type EpisodesCharacterKey = ["characterEpisodes", EpisodesIds];

export type EpisodeServiceValue = {
  characterKey: (arg: EpisodesIds) => EpisodesCharacterKey;
  characterList: QueryFunction<Episode[], EpisodesCharacterKey>;
  get: QueryFunction<Episode, EpisodeKey>;
  key: (id: EpisodeId) => EpisodeKey;
  list: QueryFunction<EpisodeListResult, EpisodesKey>;
  listKey: (args: EpisodeListArgs) => EpisodesKey;
};

type EpisodeServiceNullableValue =
  | {
      isInitialized: false;
    }
  | {
      isInitialized: true;
      value: EpisodeServiceValue;
    };

export const EpisodeService = createContext<EpisodeServiceNullableValue>({
  isInitialized: false,
});

export const useEpisodeService = (): EpisodeServiceValue => {
  const context = useContext(EpisodeService);

  if (!context.isInitialized) {
    throw new Error("EpisodeService not defined");
  }

  return context.value;
};

type Props = {
  children: ReactNode;
};

export const EpisodeServiceProvider = ({ children }: Props): ReactElement => {
  const value = useMemo<EpisodeServiceNullableValue>(() => {
    return {
      isInitialized: true,
      value: {
        characterList: async ({ queryKey }) => {
          const [, arg] = queryKey;

          const ids = arg.join();

          const response = await fetch(
            `https://rickandmortyapi.com/api/episode/${ids}`
          );
          const data = await response.json();

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const result = [data].flat().map((element: any) => ({
            ...element,
            airDate: element.air_date,
          }));

          return result;
        },
        characterKey: (arg) => ["characterEpisodes", arg],
        get: async ({ queryKey }) => {
          const [, id] = queryKey;
          const response = await fetch(
            `https://rickandmortyapi.com/api/episode/${id}`
          );

          const data = await response.json();

          const result = {
            ...data,
            airDate: data.air_date,
          };

          return result;
        },
        key: (id) => {
          return ["episode", id];
        },
        list: async ({ queryKey }) => {
          const [, args] = queryKey;

          if (!args?.query) {
            const response = await fetch(
              `https://rickandmortyapi.com/api/episode`
            );
            const data = await response.json();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = [...data].map((element: any) => ({
              ...element,
              airDate: element.air_date,
            }));

            return result;
          }

          const response = await fetch(
            `https://rickandmortyapi.com/api/episode/?name=${args.query}`
          );
          const data = await response.json();

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const result = data.map((element: any) => ({
            ...element,
            airDate: element.air_date,
          }));

          return result;
        },
        listKey: (args) => {
          return args ? ["episodes", args] : ["episodes"];
        },
      },
    };
  }, []);

  return (
    <EpisodeService.Provider value={value}>{children}</EpisodeService.Provider>
  );
};

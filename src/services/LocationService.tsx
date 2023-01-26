import { QueryFunction } from "@tanstack/react-query";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { InfoData } from "../utils/types";

type LocationId = number;

export type Location = {
  dimension: string;
  id: LocationId;
  name: string;
  residents: string[];
  type: string;
};

export type LocationListResult = {
  info: InfoData;
  results: Location[];
};

export type LocationListArgs = {
  id?: string[];
  query?: string;
};

type LocationKey = ["location", LocationId];
type LocationsKey = ["locations", LocationListArgs] | ["locations"];

export type LocationServiceValue = {
  get: QueryFunction<Location, LocationKey>;
  key: (id: LocationId) => LocationKey;
  list: QueryFunction<LocationListResult, LocationsKey>;
  listKey: (args: LocationListArgs) => LocationsKey;
};

type LocationServiceNullableValue =
  | {
      isInitialized: false;
    }
  | {
      isInitialized: true;
      value: LocationServiceValue;
    };

export const LocationService = createContext<LocationServiceNullableValue>({
  isInitialized: false,
});

export const useLocationService = (): LocationServiceValue => {
  const context = useContext(LocationService);

  if (!context.isInitialized) {
    throw new Error("LocationService not defined");
  }

  return context.value;
};

type Props = {
  children: ReactNode;
};

export const LocationServiceProvider = ({ children }: Props): ReactElement => {
  const value = useMemo<LocationServiceNullableValue>(() => {
    return {
      isInitialized: true,
      value: {
        get: async ({ queryKey }) => {
          const [, id] = queryKey;

          const response = await fetch(
            `https://rickandmortyapi.com/api/location/${id}`
          );

          const result = await response.json();

          return result;
        },
        key: (id) => {
          return ["location", id];
        },
        list: async ({ queryKey, pageParam }) => {
          const [, args] = queryKey;

          const fetchURL =
            pageParam || `https://rickandmortyapi.com/api/location/?page=1`;

          if (!args?.query) {
            const response = await fetch(fetchURL);
            const result = await response.json();

            return result;
          }

          const response = await fetch(`${fetchURL}&name=${args.query}`);
          const result = await response.json();

          return result;
        },
        listKey: (args) => (args ? ["locations", args] : ["locations"]),
      },
    };
  }, []);

  return (
    <LocationService.Provider value={value}>
      {children}
    </LocationService.Provider>
  );
};

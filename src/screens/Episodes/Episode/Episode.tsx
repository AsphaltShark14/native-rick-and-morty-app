import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { Flex, Heading } from "native-base";
import { ReactElement } from "react";
import { InfoComponent } from "../../../modules/InfoComponent/InfoComponent";
import { LoadingSpinner } from "../../../modules/LoadingSpinner/LoadingSpinner";
import { RootStackParams } from "../../../routes/HomeNavigator";
import { useEpisodeService } from "../../../services/EpisodeService";
import { EpisodeCharactersList } from "./EpisodeCharactersList/EpisodeCharactersList";

type Props = NativeStackScreenProps<RootStackParams, "Episode">;

export const Episode = ({ route, navigation }: Props): ReactElement => {
  const id = route.params.id;

  const episodeService = useEpisodeService();
  const { data, isLoading } = useQuery(
    episodeService.key(id),
    episodeService.get
  );

  const characters = () => {
    const charactersIds: string[] = [];

    data?.characters.forEach((character) => {
      const result = character.split("/").pop();
      charactersIds.push(result as string);
    });
    return charactersIds;
  };
  return (
    <Flex flex={1}>
      {isLoading ? (
        <LoadingSpinner text="Loading Episode" />
      ) : (
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mt="4"
          paddingX="4"
        >
          <Heading color="primary.500" mb="2">
            {data?.name}
          </Heading>
          <Flex>
            <InfoComponent info={data?.episode} name="Episode" />
            <InfoComponent info={data?.air_date} name="Air Date" />
          </Flex>
          <Flex>
            <Heading color="coolGray.700" mx="auto" my="2">
              LIST OF CHARACTERS
            </Heading>
            <EpisodeCharactersList
              characters={characters()}
              navigation={navigation}
            />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

import { useDimensions } from "@/hooks/useDimensions";
import { InfoComponent } from "@/modules/InfoComponent/InfoComponent";
import { LoadingSpinner } from "@/modules/LoadingSpinner/LoadingSpinner";
import { RootStackParams } from "@/routes/HomeNavigator";
import { useCharacterService } from "@/services/CharacterService";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { Flex, Heading, Image, ScrollView } from "native-base";
import { ReactElement } from "react";
import { CharacterEpisodesList } from "./CharacterEpisodesList/CharacterEpisodesList";

type Props = NativeStackScreenProps<RootStackParams, "Character">;

export const Character = ({ route, navigation }: Props): ReactElement => {
  const id = route.params.id;

  const { windowWidth, windowHeight } = useDimensions();

  const characterService = useCharacterService();
  const { data, isLoading } = useQuery(
    characterService.key(id),
    characterService.get
  );
  const episodes = () => {
    const episodesIds: string[] = [];

    data?.episode.forEach((episode) => {
      const result = episode.split("/").pop();
      episodesIds.push(result as string);
    });
    return episodesIds;
  };

  return (
    <Flex h={windowHeight}>
      {isLoading ? (
        <LoadingSpinner text="Loading Character" />
      ) : (
        <Flex>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            mt="4"
            paddingX="4"
          >
            <Heading color="primary.500" mb="2">
              {data?.name}
            </Heading>
            <Image
              alt={data?.name}
              borderColor="primary.500"
              borderRadius={100}
              borderWidth={1}
              size="xl"
              source={{ uri: data?.image }}
            />
          </Flex>
          <ScrollView centerContent horizontal>
            <Flex w={windowWidth}>
              <Flex>
                <Heading color="coolGray.700" mx="auto" my="3">
                  ADDITIONAL INFO
                </Heading>
                <InfoComponent info={data?.status} name="Status" />
                <InfoComponent info={data?.species} name="Species" />
                <InfoComponent info={data?.gender} name="Gender" />
                <InfoComponent info={data?.origin.name} name="Origin" />
                <InfoComponent info={data?.location.name} name="Location" />
              </Flex>
            </Flex>
            <Flex p="4" w={windowWidth}>
              <Heading color="coolGray.700" mx="auto" my="2">
                LIST OF EPISODES
              </Heading>
              <CharacterEpisodesList
                episodes={episodes()}
                navigation={navigation}
              />
            </Flex>
          </ScrollView>
        </Flex>
      )}
    </Flex>
  );
};

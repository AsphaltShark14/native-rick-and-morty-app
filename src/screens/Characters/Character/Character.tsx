import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Pressable,
  ScrollView,
  Text,
} from "native-base";
import { ReactElement } from "react";
import { useDimensions } from "../../../hooks/useDimensions";
import { InfoComponent } from "../../../modules/InfoComponent/InfoComponent";
import { LoadingSpinner } from "../../../modules/LoadingSpinner/LoadingSpinner";
import { RootStackParams } from "../../../routes/HomeNavigator";
import { useCharacterService } from "../../../services/CharacterService";
import { EpisodesList } from "./EpisodesList/EpisodesList";

type Props = NativeStackScreenProps<RootStackParams, "Character">;

export const Character = ({ route }: Props): ReactElement => {
  const id = route.params.id;

  const { windowWidth } = useDimensions();

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
    <Flex>
      {isLoading ? (
        <LoadingSpinner text="Loading Character" />
      ) : (
        <>
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
              alt="characters"
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
              </Flex>
              <Flex mt="4" mx="auto" w="72">
                <Center>
                  <Text
                    color="coolGray.700"
                    fontSize="lg"
                    fontWeight="semibold"
                  >
                    ORIGIN
                  </Text>
                  <Pressable>
                    <Button size="lg">{data?.origin.name}</Button>
                  </Pressable>
                </Center>
                <Center mt="2">
                  <Text
                    color="coolGray.700"
                    fontSize="lg"
                    fontWeight="semibold"
                  >
                    LOCATION
                  </Text>
                  <Pressable>
                    <Button size="lg">{data?.location.name}</Button>
                  </Pressable>
                </Center>
              </Flex>
            </Flex>
            <Flex p="4" w={windowWidth}>
              <Heading color="coolGray.700" mx="auto" my="2">
                LIST OF EPISODES
              </Heading>
              <EpisodesList episodes={episodes()} />
            </Flex>
          </ScrollView>
        </>
      )}
    </Flex>
  );
};

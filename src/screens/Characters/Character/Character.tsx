import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Pressable,
  Text,
} from "native-base";
import { ReactElement } from "react";
import { InfoComponent } from "../../../modules/InfoComponent/InfoComponent";
import { LoadingSpinner } from "../../../modules/LoadingSpinner/LoadingSpinner";
import { RootStackParams } from "../../../routes/HomeNavigator";
import { useCharacterService } from "../../../services/CharacterService";

type Props = NativeStackScreenProps<RootStackParams, "Character">;

export const Character = ({ route }: Props): ReactElement => {
  const id = route.params.id;
  const characterService = useCharacterService();
  const { data, isLoading } = useQuery(
    characterService.key(id),
    characterService.get
  );
  console.log(data?.episode);
  return (
    <Center>
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
          <Flex>
            <Heading color="coolGray.700" mx="auto" my="3">
              ADDITIONAL INFO
            </Heading>
            <InfoComponent info={data?.status} name="Status" />
            <InfoComponent info={data?.species} name="Species" />
            <InfoComponent info={data?.gender} name="Gender" />
          </Flex>
          <Flex direction="row" justify="space-between" mt="4" w="72">
            <Center>
              <Text color="coolGray.700" fontSize="lg" fontWeight="semibold">
                ORIGIN
              </Text>
              <Pressable>
                <Button size="lg">{data?.origin.name}</Button>
              </Pressable>
            </Center>
            <Center>
              <Text color="coolGray.700" fontSize="lg" fontWeight="semibold">
                LOCATION
              </Text>
              <Pressable>
                <Button size="lg">{data?.location.name}</Button>
              </Pressable>
            </Center>
          </Flex>
          <Flex>
            <Heading color="coolGray.700" mx="auto" my="3">
              LIST OF EPISODES
            </Heading>
            <EpisodesList />
          </Flex>
        </>
      )}
    </Center>
  );
};

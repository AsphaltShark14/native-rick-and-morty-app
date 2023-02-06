import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { Flex, Heading } from "native-base";
import { ReactElement } from "react";
import { InfoComponent } from "@/modules/InfoComponent/InfoComponent";
import { LoadingSpinner } from "@/modules/LoadingSpinner/LoadingSpinner";
import { RootStackParams } from "@/routes/HomeNavigator";
import { useLocationService } from "@/services/LocationService";
import { EpisodeCharactersList } from "../../Episodes/Episode/EpisodeCharactersList/EpisodeCharactersList";

type Props = NativeStackScreenProps<RootStackParams, "Episode">;

export const Location = ({ route, navigation }: Props): ReactElement => {
  const id = route.params.id;

  const locationService = useLocationService();
  const { data, isLoading } = useQuery(
    locationService.key(id),
    locationService.get
  );

  const residents = () => {
    const residentsIds: string[] = [];

    data?.residents.forEach((resident) => {
      const result = resident.split("/").pop();
      residentsIds.push(result as string);
    });
    return residentsIds;
  };

  return (
    <Flex flex={1}>
      {isLoading ? (
        <LoadingSpinner text="Loading Location" />
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
            <InfoComponent info={data?.dimension} name="Dimension" />
            <InfoComponent info={data?.type} name="Type" />
          </Flex>
          <Flex>
            <Heading color="coolGray.700" mx="auto" my="2">
              LIST OF RESIDENTS
            </Heading>
            <EpisodeCharactersList
              characters={residents()}
              navigation={navigation}
            />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

import { useQuery } from "@tanstack/react-query";
import { Flex } from "native-base";
import { ReactElement } from "react";
import { SafeAreaView, StyleSheet, VirtualizedList } from "react-native";
import { LoadingSpinner } from "../../../../modules/LoadingSpinner/LoadingSpinner";
import {
  Episode,
  useEpisodeService,
} from "../../../../services/EpisodeService";
import { CharacterEpisodeTile } from "./CharacterEpisodeTile/CharacterEpisodeTile";

type Props = {
  episodes: string[];
};

export const CharacterEpisodesList = ({ episodes }: Props): ReactElement => {
  const episodeService = useEpisodeService();
  const { data, isLoading } = useQuery(
    episodeService.characterKey(episodes),
    episodeService.characterList
  );

  const getItem = (data: Episode[], index: number) => {
    return data[index];
  };
  return (
    <>
      {isLoading ? (
        <LoadingSpinner text="Loading episodes" />
      ) : (
        <Flex>
          <SafeAreaView style={styles.list}>
            <VirtualizedList
              data={data}
              getItem={getItem}
              getItemCount={(data) => data.length}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <CharacterEpisodeTile episode={item.episode} name={item.name} />
              )}
            />
          </SafeAreaView>
        </Flex>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

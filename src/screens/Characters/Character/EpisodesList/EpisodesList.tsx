import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { SafeAreaView, StyleSheet, VirtualizedList } from "react-native";
import { LoadingSpinner } from "../../../../modules/LoadingSpinner/LoadingSpinner";
import {
  Episode,
  useEpisodeService,
} from "../../../../services/EpisodeService";
import { EpisodeTile } from "./EpisodeTile/EpisodeTile";

type Props = {
  episodes: string[];
};

export const EpisodesList = ({ episodes }: Props): ReactElement => {
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
        <SafeAreaView style={styles.list}>
          <VirtualizedList
            data={data}
            getItem={getItem}
            getItemCount={(data) => data.length}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <EpisodeTile episode={item.episode} name={item.name} />
            )}
          />
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },
});

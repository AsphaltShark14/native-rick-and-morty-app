import { LoadingSpinner } from "@/modules/LoadingSpinner/LoadingSpinner";
import { RootStackParams } from "@/routes/HomeNavigator";
import { Episode, useEpisodeService } from "@/services/EpisodeService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { Flex } from "native-base";
import { ReactElement } from "react";
import { SafeAreaView, StyleSheet, VirtualizedList } from "react-native";
import { CharacterEpisodeTile } from "./CharacterEpisodeTile/CharacterEpisodeTile";

type Props = {
  episodes: string[];
  navigation: NativeStackNavigationProp<RootStackParams, "Character">;
};

export const CharacterEpisodesList = ({
  episodes,
  navigation,
}: Props): ReactElement => {
  const episodeService = useEpisodeService();
  const { data, isLoading } = useQuery(
    episodeService.characterKey(episodes),
    episodeService.characterList
  );

  const getItem = (data: Episode[], index: number) => {
    return data[index];
  };

  const navigationHandler = (id: number) => {
    navigation.navigate("Episode", { id });
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
                <CharacterEpisodeTile
                  episode={item.episode}
                  name={item.name}
                  onPress={() => navigationHandler(item.id)}
                />
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
    height: "80%",
  },
});

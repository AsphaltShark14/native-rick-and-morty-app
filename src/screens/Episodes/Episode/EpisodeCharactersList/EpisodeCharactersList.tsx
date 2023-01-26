import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Flex } from "native-base";
import { ReactElement } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { LoadingSpinner } from "../../../../modules/LoadingSpinner/LoadingSpinner";
import { RootStackParams } from "../../../../routes/HomeNavigator";
import { useCharacterService } from "../../../../services/CharacterService";
import { EpisodeCharactersTile } from "./EpisodeCharactersTile/EpisodeCharactersTile";

type Props = {
  characters: string[];
  navigation: NativeStackNavigationProp<RootStackParams, "Episode">;
};

export const EpisodeCharactersList = ({
  characters,
  navigation,
}: Props): ReactElement => {
  const characterService = useCharacterService();
  const { data, isLoading } = useQuery(
    characterService.episodeKey(characters),
    characterService.episodeList
  );

  const navigationHandler = (id: number) => {
    navigation.navigate("Character", { id });
  };
  return (
    <>
      {isLoading ? (
        <LoadingSpinner text="Loading characters" />
      ) : (
        <Flex>
          <SafeAreaView style={styles.list}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              renderItem={({ item }) => (
                <EpisodeCharactersTile
                  image={item.image}
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
    height: "84%",
  },
});

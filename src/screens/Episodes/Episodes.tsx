import { useDebounce } from "@/hooks/useDebounce";
import { LoadingSpinner } from "@/modules/LoadingSpinner/LoadingSpinner";
import { SearchBar } from "@/modules/SearchBar/SearchBar";
import { RootStackParams } from "@/routes/HomeNavigator";
import { Episode, useEpisodeService } from "@/services/EpisodeService";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Pressable,
  Spinner,
} from "native-base";
import { ReactElement, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  VirtualizedList,
} from "react-native";
import { EpisodeTile } from "./EpisodeTile/EpisodeTile";

type Props = NativeStackScreenProps<RootStackParams, "Episodes">;

export const Episodes = ({ navigation }: Props): ReactElement => {
  const [query, setQuery] = useState<string>();

  const episodeService = useEpisodeService();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(episodeService.listKey({ query }), episodeService.list, {
      getNextPageParam: (lastPage) => {
        if (lastPage.info.next) {
          return lastPage.info.next;
        }
        return lastPage;
      },
    });

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const finalData = data?.pages.flatMap((page) => page.results);

  const getItem = (data: Episode[], index: number) => {
    return data[index];
  };

  const debouncedSearchFilter = useDebounce(
    (query: string) => setQuery(query),
    1000
  );

  const navigationHandler = (id: number) => {
    navigation.navigate("Episode", { id });
  };

  return (
    <Pressable flex={1} onPress={() => Keyboard.dismiss()}>
      <Box backgroundColor="light.50" borderRadius="lg" flex={1} m="2">
        <Center>
          <Heading color="primary.500" mb="2">
            EPISODES
          </Heading>
          <Image
            alt="characters"
            borderColor="primary.500"
            borderRadius={100}
            borderWidth={1}
            size="xl"
            source={require("../../assets/episodes.jpeg")}
          />
        </Center>
        <SearchBar
          onChangeText={debouncedSearchFilter}
          placeholder="Search episodes"
        />
        <Center my="4">
          <Heading color="coolGray.700">LIST OF EPISODES</Heading>
        </Center>
        <Flex flex={1} mb="6">
          {isLoading ? (
            <LoadingSpinner text="Loading Episodes" />
          ) : (
            <SafeAreaView style={styles.list}>
              <VirtualizedList
                ListFooterComponent={
                  isFetchingNextPage ? <Spinner size="lg" /> : null
                }
                data={finalData}
                getItem={getItem}
                getItemCount={(data) => data.length}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={loadMore}
                onEndReachedThreshold={0.3}
                renderItem={({ item }) => (
                  <EpisodeTile
                    episode={item.episode}
                    name={item.name}
                    onPress={() => navigationHandler(item.id)}
                  />
                )}
              />
            </SafeAreaView>
          )}
        </Flex>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },
});

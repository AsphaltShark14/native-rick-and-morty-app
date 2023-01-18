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
import React, { ReactElement, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  VirtualizedList,
} from "react-native";
import { LoadingSpinner } from "../../modules/LoadingSpinner/LoadingSpinner";
import { SearchBar } from "../../modules/SearchBar/SearchBar";
import { RootStackParams } from "../../routes/HomeNavigator";
import {
  Character,
  useCharacterService,
} from "../../services/CharacterService";
import { CharacterTile } from "./CharacterTile/CharacterTile";

type Props = NativeStackScreenProps<RootStackParams, "Characters">;

export const Characters = ({ navigation }: Props): ReactElement => {
  const [query, setQuery] = useState<string>();

  const characterService = useCharacterService();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      characterService.listKey({ query }),
      characterService.list,
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.info.next) {
            return lastPage.info.next;
          }
          return;
        },
      }
    );

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const finalData = data?.pages.flatMap((page) => page.results);

  const getItem = (data: Character[], index: number) => {
    return data[index];
  };

  const changeHandler = (query: string) => {
    setQuery(query);
  };

  const navigationHandler = (id: number) => {
    navigation.navigate("Character", { id });
  };

  return (
    <Pressable flex={1} onPress={() => Keyboard.dismiss()}>
      <Box backgroundColor="light.50" borderRadius="lg" flex={1} m="2">
        <Center>
          <Heading color="primary.500" mb="2">
            CHARACTERS
          </Heading>
          <Image
            alt="characters"
            borderColor="primary.500"
            borderRadius={100}
            borderWidth={1}
            size="xl"
            source={require("../../assets/characters.jpeg")}
          />
        </Center>
        <SearchBar
          onChangeText={changeHandler}
          placeholder="Search characters"
        />
        <Center my="4">
          <Heading color="coolGray.700">LIST OF CHARACTERS</Heading>
        </Center>
        <Flex flex={1} mb="6">
          {isLoading ? (
            <LoadingSpinner text="Loading Characters" />
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
                  <CharacterTile
                    name={item.name}
                    onPress={() => navigationHandler(item.id)}
                    url={item.image}
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

import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Center,
  FlatList,
  Heading,
  Image,
  Pressable,
  Text,
} from "native-base";
import React, { ReactElement, useState } from "react";
import { Keyboard, SafeAreaView, StyleSheet } from "react-native";
import { SearchBar } from "../../modules/SearchBar/SearchBar";
import { useCharacterService } from "../../services/CharacterService";
import { CharacterTile } from "./CharacterTile/CharacterTile";

export const Characters = (): ReactElement => {
  const [query, setQuery] = useState<string>();

  const characterService = useCharacterService();
  const { data, isLoading } = useQuery(
    characterService.listKey({ query }),
    characterService.list
  );

  const changeHandler = (query: string) => {
    setQuery(query);
  };

  return (
    <Pressable flex={1} onPress={() => Keyboard.dismiss()}>
      <Box backgroundColor="light.50" borderRadius="lg" flex={1} m="2">
        <Center>
          <Heading color="coolGray.700" mb="2">
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
        <Center flex={1} my="6">
          <Heading color="coolGray.700">LIST OF CHARACTERS</Heading>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <SafeAreaView style={styles.list}>
              <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <CharacterTile name={item.name} url={item.image} />
                )}
              />
            </SafeAreaView>
          )}
        </Center>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },
});

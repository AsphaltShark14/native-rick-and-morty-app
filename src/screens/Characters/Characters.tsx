import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Center,
  FlatList,
  Flex,
  Heading,
  Image,
  Pressable,
} from "native-base";
import React, { ReactElement, useState } from "react";
import { Keyboard, SafeAreaView, StyleSheet } from "react-native";
import { LoadingSpinner } from "../../modules/LoadingSpinner/LoadingSpinner";
import { SearchBar } from "../../modules/SearchBar/SearchBar";
import { RootStackParams } from "../../routes/HomeNavigator";
import { useCharacterService } from "../../services/CharacterService";
import { CharacterTile } from "./CharacterTile/CharacterTile";

type Props = NativeStackScreenProps<RootStackParams, "Characters">;

export const Characters = ({ navigation }: Props): ReactElement => {
  const [query, setQuery] = useState<string>();

  const characterService = useCharacterService();
  const { data, isLoading } = useQuery(
    characterService.listKey({ query }),
    characterService.list
  );

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
              <FlatList
                data={data?.results}
                keyExtractor={(item) => item.id.toString()}
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

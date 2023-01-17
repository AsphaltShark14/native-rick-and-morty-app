import { useQuery } from "@tanstack/react-query";
import { Box, Center, FlatList, Heading, Image, Text } from "native-base";
import React, { ReactElement } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useCharacterService } from "../../services/CharacterService";
import { CharacterTile } from "./CharacterTile/CharacterTile";

export const Characters = (): ReactElement => {
  const characterService = useCharacterService();
  const { data, isLoading } = useQuery(
    characterService.listKey(),
    characterService.list
  );

  return (
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
      <Center mt="6">
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
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },
});

import { useQuery } from "@tanstack/react-query";
import { Box, Center, Heading, Image, Text } from "native-base";
import React, { ReactElement } from "react";
import { StyleSheet, VirtualizedList } from "react-native";
import {
  Character,
  useCharacterService,
} from "../../services/CharacterService";
import { CharacterTile } from "./CharacterTile/CharacterTile";

export const Characters = (): ReactElement => {
  const characterService = useCharacterService();
  const { data, isLoading } = useQuery(
    characterService.listKey(),
    characterService.list
  );
  const getItem = (data: Character[], index: number) => {
    return data[index];
  };

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
      <Center>
        <Heading color="coolGray.700" mt="4">
          LIST OF CHARACTERS
        </Heading>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <VirtualizedList
            data={data}
            getItem={getItem}
            getItemCount={(data) => data.length}
            initialNumToRender={4}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <CharacterTile key={item.id} name={item.name} url={item.image} />
            )}
            style={styles.list}
          />
        )}
      </Center>
    </Box>
  );
};

const styles = StyleSheet.create({
  list: {
    alignSelf: "stretch",
  },
});

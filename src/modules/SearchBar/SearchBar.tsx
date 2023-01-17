import { MaterialIcons } from "@expo/vector-icons";
import { Center, Icon, Input } from "native-base";
import { ReactElement } from "react";

type Props = {
  onChangeText: (val: string) => void;
  placeholder: string;
};

export const SearchBar = ({
  placeholder,
  onChangeText,
}: Props): ReactElement => {
  return (
    <Center alignSelf="center" mt="4" w="100%">
      <Input
        InputLeftElement={
          <Icon
            as={<MaterialIcons name="search" />}
            color="coolGray.400"
            m="2"
            ml="3"
            size="6"
          />
        }
        borderRadius="4"
        fontSize="sm"
        onChangeText={onChangeText}
        placeholder={placeholder}
        px="1"
        py="3"
        width="100%"
      />
    </Center>
  );
};

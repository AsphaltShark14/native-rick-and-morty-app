import { Heading, HStack, Spinner } from "native-base";
import { ReactElement } from "react";

type Props = {
  text: string;
};

export const LoadingSpinner = ({ text }: Props): ReactElement => {
  return (
    <HStack justifyContent="center" space={2}>
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="md">
        {text}
      </Heading>
    </HStack>
  );
};

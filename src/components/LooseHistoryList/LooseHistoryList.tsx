import { Heading, List, ListItem, Box } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import SpinGameStore from '../../stores/SpinGameStore';

export const LooseHistoryList = observer(() => {
  return (
    <Box width="250px">
      <Heading size="md">Идут нахуй сегодня:</Heading>
      <List mt={4}>
        {SpinGameStore.looseHistory.map((item, ind) => (
          <ListItem key={ind}>{item}</ListItem>
        ))}
      </List>
    </Box>
  );
});

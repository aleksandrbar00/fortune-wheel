import { Button, Flex, List, ListItem } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import PicksStore from '../../stores/PicksStore';

export const PicksList = observer(() => {
  return (
    <List spacing={2}>
      {PicksStore.listPicks.map((pick) => (
        <ListItem
          as={Flex}
          alignItems="center"
          justifyContent="space-between"
          key={pick.key}
        >
          {pick.value}
          <Button
            onClick={() => {
              PicksStore.removeFromPicks(pick.key);
            }}
          >
            -
          </Button>
        </ListItem>
      ))}
      {PicksStore.listPicks.length > 0 && (
        <ListItem>
          <Button
            onClick={() => {
              PicksStore.clearAll();
            }}
          >
            Очистить все
          </Button>
        </ListItem>
      )}
    </List>
  );
});

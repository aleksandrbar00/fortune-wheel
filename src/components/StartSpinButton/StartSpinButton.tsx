import { Button } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import SpinGameStore from '../../stores/SpinGameStore';
import PicksStore from '../../stores/PicksStore';

export const StartSpinButton = observer(() => {
  if (PicksStore.listPicks.length < 2) {
    return null;
  }

  if (SpinGameStore.isRunning) {
    return (
      <Button
        onClick={() => {
          SpinGameStore.stopGame();
        }}
      >
        Остановить
      </Button>
    );
  }

  return (
    <Button
      onClick={() => {
        SpinGameStore.startGame();
      }}
    >
      Начать
    </Button>
  );
});

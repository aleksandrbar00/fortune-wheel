import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import PicksStore from '../../stores/PicksStore';
import SpinGameStore from '../../stores/SpinGameStore';

export const SpinnerPicker = observer(() => {
  const data = useMemo(() => {
    return PicksStore.listPicks.map((item) => ({
      title: item.value,
      value: 10,
      key: item.key,
      color: item.color,
    }));
  }, [PicksStore.listPicks]);

  const styles = useMemo(() => {
    return {
      ...SpinGameStore.style,
    };
  }, [SpinGameStore.style]);

  return (
    <Box style={SpinGameStore.isRunning ? styles : {}} width="100%">
      <PieChart
        animate={true}
        labelStyle={{
          fontSize: 1,
          fill: '#fafafa',
        }}
        label={(el) => el.dataEntry.title}
        data={data}
      />
    </Box>
  );
});

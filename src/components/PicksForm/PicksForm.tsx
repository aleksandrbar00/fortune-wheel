import { Input, Button, Flex } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import PicksStore from '../../stores/PicksStore';

export const PickerForm = observer(() => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      picked: '',
    },
  });

  const onSubmit = (values: { picked: string }) => {
    PicksStore.addToPicks(values.picked);

    reset();
  };

  return (
    <Flex
      alignItems="center"
      gap={2}
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input {...register('picked')} />
      <Button type="submit">+</Button>
    </Flex>
  );
});

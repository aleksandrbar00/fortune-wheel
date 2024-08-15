import './App.css';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import { SpinnerPicker } from './components/SpinnerPicker/SpinnerPicker';
import { PickerForm } from './components/PicksForm/PicksForm';
import { PicksList } from './components/PicksList/PicksList';
import { StartSpinButton } from './components/StartSpinButton/StartSpinButton';
import { LooseHistoryList } from './components/LooseHistoryList/LooseHistoryList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ChakraProvider>
      <Flex gap={4}>
        <Flex flexDirection="column" gap={2}>
          <PickerForm />
          <PicksList />
          <Box mt={10}>
            <StartSpinButton />
          </Box>
        </Flex>
        <Flex flex={1} justifyContent="center">
          <SpinnerPicker />
        </Flex>
        <LooseHistoryList />
      </Flex>
      <ToastContainer />
    </ChakraProvider>
  );
}

export default App;

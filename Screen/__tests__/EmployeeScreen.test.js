import React from 'react';
import {render} from '@testing-library/react-native';
import EmployeeScreen from '../EmployeeScreen';

jest.mock('react-native-shadow-cards', () => {});

it('renders', () => {
  render(<EmployeeScreen />);
});

import '@testing-library/jest-dom'
import React, {useContext} from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlertProvider, { AlertContext } from './';

describe('AlertProvider', () => {
  it('should render children', () => {
    const TestComponent = () => <div>Test</div>;

    render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should trigger alert and display the message', () => {
    const TestComponent = () => {
      const { triggerAlert } = useContext(AlertContext);
      
      return (
        <button onClick={() => triggerAlert('Error Message')}>Trigger Alert</button>
      );
    }

    render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );

    fireEvent.click(screen.getByText('Trigger Alert'));

    expect(screen.getByText('Error Message')).toBeInTheDocument();
  });
});

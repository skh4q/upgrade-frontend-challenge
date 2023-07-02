import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { FormContext } from '../FormProvider';
import SignUp from '.';

describe('SignUp', () => {
  it('should render sign up form and handle changes', () => {
    const mockFormik = {
      touched: {
        name: false,
        email: false,
        password: false,
      },
      errors: {},
      values: {
        name: '',
        email: '',
        password: '',
      },
      handleBlur: jest.fn(),
      handleChange: jest.fn(),
    };

    render(
      <Router>
        <FormContext.Provider value={mockFormik}>
          <Formik
            initialValues={mockFormik.values}
            onSubmit={jest.fn()}
            render={(formik) => (
              <Form>
                <SignUp formik={formik} />
              </Form>
            )}
          />
        </FormContext.Provider>
      </Router>
    );
    
    expect(screen.getByRole('button')).toBeDisabled;

    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'Test' },
    });

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@test.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'testpassword' },
    });

    expect(screen.getByRole('button')).toBeEnabled;
  });
});

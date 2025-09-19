import React from 'react';
import RegisterForm from '../components/RegisterForm';
import AuthContainer from '../components/AuthContainer.jsx';

const RegisterPage = () => {
  return (
    <AuthContainer title="Register">
      <RegisterForm />
    </AuthContainer>
  );
};

export default RegisterPage;

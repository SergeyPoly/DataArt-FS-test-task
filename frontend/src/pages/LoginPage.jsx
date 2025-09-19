import React from 'react';
import LoginForm from '../components/LoginForm';
import AuthContainer from '../components/AuthContainer.jsx';

const LoginPage = () => {
  return (
    <AuthContainer title="Login">
      <LoginForm />
    </AuthContainer>
  );
};

export default LoginPage;

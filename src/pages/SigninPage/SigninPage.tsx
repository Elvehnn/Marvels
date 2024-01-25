import { memo } from 'react';
import MainLayout from '../../components/MainLayout/MainLayout';
import SigninForm from '../../components/SigninForm/SigninForm';

const SigninPage = () => {
  return (
    <MainLayout>
      <SigninForm />
    </MainLayout>
  );
};

export default memo(SigninPage);

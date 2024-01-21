import { memo } from 'react';
import MainLayout from '../../components/MainLayout/MainLayout';
import SigninForm from '../../components/SigninForm';

const SigninPage = () => {
  return (
    <MainLayout isMainPage>
      <SigninForm />
    </MainLayout>
  );
};

export default memo(SigninPage);

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Container, TextField, ThemeProvider } from '@mui/material';
import theme from '../../constants/theme';
import { PATH } from '../../constants/paths';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { isLoadingActions, isLoadingSelectors } from '../../store/slices/isLoading/isLoadingSlice';
import { authActions } from '../../store/slices/auth/authSlice';

export type AuthFormInputs = {
  login: string;
  password: string;
};

const SigninForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(isLoadingSelectors.all);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormInputs>();

  const onSubmit = async (data: AuthFormInputs) => {
    dispatch(isLoadingActions.setIsLoading(true));

    if (
      data.login === process.env.REACT_APP_USER_LOGIN &&
      data.password === process.env.REACT_APP_USER_PASSWORD
    ) {
      reset({ login: '', password: '' });
      dispatch(authActions.setIsAuth(true));
      navigate(PATH.SEARCH_RESULTS);
    }

    dispatch(isLoadingActions.setIsLoading(false));
  };

  const handleCancel = () => {
    reset({ login: '', password: '' });
    navigate(PATH.BASE_URL);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="xs"
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContext: 'center',
          minHeight: '100vh',
          color: '#fff',
        }}
      >
        <form className="form" data-testid="auth_form" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth">
            <div className="auth-container">
              <TextField
                data-testid="login-input"
                variant="outlined"
                className="text-input"
                sx={{
                  height: '100%',
                  backgroundColor: '#fff',
                  borderRadius: '6px 0 0 6px',
                }}
                placeholder="Enter login"
                {...register('login', { required: 'Login is empty!' })}
              />
              {errors.login && <p>Login is required!</p>}

              <TextField
                data-testid="password-input"
                variant="outlined"
                className="text-input"
                sx={{
                  height: '100%',
                  backgroundColor: '#fff',
                  borderRadius: '6px 0 0 6px',
                }}
                placeholder="Enter password"
                {...register('password', { required: 'Password is empty!' })}
              />
            </div>

            {errors.password && <p>Password is required!</p>}
          </div>

          <div className="search__options">
            <Button
              variant="outlined"
              className="cancel_btn"
              data-testid="cancel-btn"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Отмена
            </Button>
            <Button
              variant="contained"
              sx={{
                padding: '6px 16px',
                minWidth: '0',
                height: '100%',
                backgroundColor: '#87A8EC',
                borderRadius: '0 4px 4px 0',
              }}
              className="login_btn"
              data-testid="login-btn"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              Войти
            </Button>
          </div>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default SigninForm;

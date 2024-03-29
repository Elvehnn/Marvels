import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Container, TextField, ThemeProvider } from '@mui/material';
import theme from '../../constants/theme';
import { PATH } from '../../constants/paths';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { isLoadingActions, isLoadingSelectors } from '../../store/slices/isLoading/isLoadingSlice';
import { authActions } from '../../store/slices/auth/authSlice';
import './SigninForm.scss';

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
          color: '#fff',
          paddingTop: '100px',
        }}
      >
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth">
            <div className="auth-container">
              <TextField
                data-testid="login-input"
                variant="outlined"
                className="text-input"
                sx={{
                  width: '100%',
                  height: '56px',
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                }}
                placeholder="Введите логин"
                {...register('login', { required: 'Пустая строка!' })}
              />
              {errors.login && <p className="form_error">Login is required!</p>}
            </div>

            <div className="auth-container">
              <TextField
                data-testid="password-input"
                variant="outlined"
                className="form_input"
                sx={{
                  width: '100%',
                  height: '56px',
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                }}
                placeholder="Введите пароль"
                {...register('password', { required: 'Пустая строка!' })}
              />

              {errors.password && <p className="form_error">Password is required!</p>}
            </div>
          </div>

          <div className="form_buttons">
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
                borderRadius: '4px 4px',
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

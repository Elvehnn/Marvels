import Typography from '@mui/material/Typography';
import { ErrorObject } from '../../constants/interfaces';
import './ErrorPage.scss';

export const ErrorPage = (props: ErrorObject) => {
  return (
    <div className="error-page">
      <Typography variant="h4" color="warning">
        {props.title}
      </Typography>
      <h4 className="error-page_description">{props.description}</h4>
    </div>
  );
};

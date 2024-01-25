import './Footer.scss';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { memo } from 'react';

const Footer = () => {
  return (
    <Box className="footer" component="footer">
      <Box className="footer__container" sx={{ justifyContent: 'center' }}>
        <Typography
          variant="body2"
          color="text.secondary"
          align="right"
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          Copyright ©
          <Link color="inherit" href="https://github.com/Elvehnn/Marvels" target="_blank">
            Elena Shashina
          </Link>
          , 2024.
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          align="right"
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          Copyright ©
          <Link color="inherit" href="https://github.com/Elvehnn/Marvels" target="_blank">
            Elena
          </Link>
          , 2024.
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(Footer);

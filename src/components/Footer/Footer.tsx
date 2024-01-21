import './Footer.scss';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

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
          <Link color="inherit" href="https://github.com/Elvehnn" target="_blank">
            Elena Shashina
          </Link>
          , 2022.
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          align="right"
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          Copyright ©
          <Link color="inherit" href="https://github.com/Elvehnn" target="_blank">
            Elena
          </Link>
          , 2022.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;

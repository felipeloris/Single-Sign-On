import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { useLanguage } from '../../../hooks/language';
import Copyright from '../../../components/Copyright';
import { AuthenticationValidations } from '../../../common/validations';
import { setSnackbarOn } from '../../../store/snackbar/actions';
import { IUserStateWrapper } from '../../../store/user/user';
import Loading from '../../../components/Loading';
import { ChangePasswordRequest } from '../../../store/user/actions';
import useStyles from './styles';

const ChangePassword: React.FC = props => {
  const isLoading = useSelector<IUserStateWrapper, boolean>(state => state.user.isLoading);
  const classes = useStyles();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [identification, setIdentification] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const identificationRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const newPasswordRef = React.useRef(null);
  const newPassword2Ref = React.useRef(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const validations = new AuthenticationValidations();
    validations.identification(identificationRef);
    validations.password(passwordRef, '"senha anterior"');
    validations.password(newPasswordRef, '"nova senha"');
    validations.password(newPassword2Ref, '"confirme a nova senha"');
    validations.newPassword(newPasswordRef, newPassword2Ref);

    if (validations.hasError()) {
      dispatch(setSnackbarOn('error', validations.getMessageFirst()));
      validations.setFocusFirst();
      return;
    }

    const history = get(props, 'history');

    dispatch(ChangePasswordRequest({ identification, language, password, newPassword }, history));
  };

  return (
    <Grid container component="main" className={classes.root} justify="center">
      <Loading isLoading={isLoading} />
      <Grid item xs={12} sm={9} md={6} component={Paper}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('lbl_change_pwd')}
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={0} justify="space-around">
              <Grid item xs={10}>
                <TextField
                  id="identification"
                  name="identification"
                  label={t('lbl_identification')}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                  inputRef={identificationRef}
                  onChange={e => setIdentification(e.target.value)}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  id="password"
                  name="password"
                  label={t('lbl_old_password')}
                  type="password"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  inputRef={passwordRef}
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  id="newPassword"
                  name="newPassword"
                  label={t('lbl_new_password')}
                  type="password"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  inputRef={newPasswordRef}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  id="newPassword2"
                  name="newPassword2"
                  label={t('lbl_confirm_new_pwd')}
                  type="password"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  inputRef={newPassword2Ref}
                />
              </Grid>
              <Grid item xs={10}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      {t('lbl_to_confirm')}
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      href="/signin"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      {t('lbl_cancel')}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;

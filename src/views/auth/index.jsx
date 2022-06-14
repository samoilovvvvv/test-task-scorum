import React from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useLocation, useNavigate } from 'react-router-dom';

import {
  Button, CircularProgress, Grid, TextField, Typography
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import { useDispatch } from 'react-redux';
import { authSlice } from '../../store/reducers/authReducer';

import { auth } from '../../utils/auth';

const useStyles = makeStyles(() => ({
  text: {
    '&.MuiTypography-root': {
      marginBottom: 10,
      
      fontSize: 32,
      fontWeight: 'bold'
    }
  },
  form: {
    width: 500,
    display: 'flex',
    flexDirection: 'column',
    
    '& p.MuiFormHelperText-root': {
      margin: 0,
      
      backgroundColor: '#f3f3f6'
    }
  },
  field: {
    backgroundColor: '#ffffff',
    
    '&.MuiTextField-root': {
      marginTop: 15
    }
  },
  button: {
    '&.MuiButton-root': {
      marginTop: 25,
      minHeight: 40,
      
      textTransform: 'none',
      
      fontSize: 16,
      
      backgroundColor: '#4e44e5'
    }
  },
  loader: {
    '&.MuiCircularProgress-root': {
      color: '#ffffff'
    }
  }
}));

const initialValues = {
  username: '',
  password: ''
};

const validationSchema = yup.object({
  username: yup.string()
    .required('Username is required'),
  password: yup.string()
    .required('Password is required')
});

const Auth = () => {
  const classes = useStyles();
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';
  
  const dispatch = useDispatch();
  const { signIn } = authSlice.actions;
  
  const [isLoading, setIsLoading] = React.useState(false);
  const [authError, setAuthError] = React.useState('');

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setAuthError('');
        setIsLoading(true);
        await auth(values);
        
        localStorage.setItem('isAuth', 'true');
        dispatch(signIn());
        
        navigate(from, { replace: true });
      } catch (error) {
        setAuthError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <Grid
      container
      item
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      flexGrow={1}
    >
      <Typography className={classes.text}>Sign in to your account</Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          id={'username'}
          name={'username'}
          className={classes.field}
          placeholder={'Username address'}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.username && !!formik.errors.username}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          id={'password'}
          name={'password'}
          className={classes.field}
          placeholder={'Password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
        />
        {
          authError && <Typography color={'error'}>{authError}</Typography>
        }
        <Button
          type={'submit'}
          className={classes.button}
          fullWidth
          variant={'contained'}
        >
          {
            isLoading ? <CircularProgress className={classes.loader} size={24} /> : 'Sign in'
          }
        </Button>
      </form>
    </Grid>
  );
};

export default Auth;
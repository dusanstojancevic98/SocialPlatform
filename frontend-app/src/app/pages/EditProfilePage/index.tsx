import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { editUser } from 'app/services/UserService';
import { Helmet } from 'react-helmet-async';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../LoginPage/slice/selectors';
import './styles.css';
import { Radio, RadioGroup } from '@mui/material';
import { useCurrentUserSlice } from '../LoginPage/slice';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function EditProfilePage() {
  const currentUser = useSelector(selectUser);

  const [image, setImage] = useState(currentUser?.image);

  const { actions } = useCurrentUserSlice();

  const dispatch = useDispatch();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      password: currentUser?.password,
      username: currentUser?.username,
      email: currentUser?.email,
      age: currentUser?.age,
      image: currentUser?.image,
      gender: currentUser?.gender,
    },
  });

  const onSubmit = data => {
    const formData = new FormData();
    for (const prop in data) {
      formData.append(prop, data[prop]);
    }
    formData.append('id', currentUser?.id + '');

    if (typeof data['image'] !== 'string' && data['image'])
      formData.append('image', data['image'][0]);
    if (data['image'] === null) formData.append('image', '');
    editUser(formData).then(freshUser => {
      dispatch(actions.changeUser(freshUser));
      toast.success('You successfully changed profile');
    });
  };

  const handleImage = e => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImage(URL.createObjectURL(file));
      console.log(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Helmet>Edit profile</Helmet>
      <div>
        <form className="center" onSubmit={handleSubmit(onSubmit)}>
          <h1>Edit pofile</h1>
          <TextField
            helperText="Please enter your name"
            {...register('firstName')}
            label="First name"
          />
          <br></br>
          <TextField
            helperText="Please enter your last name"
            {...register('lastName')}
            label="Last name"
          />
          <br></br>

          <TextField
            helperText=" Please enter your username"
            {...register('username')}
            label="Username"
          />
          <br></br>

          <TextField
            helperText=" Please enter your password"
            label="Password"
            {...register('password')}
            type="password"
          />
          <br></br>

          <TextField
            helperText=" Please enter your email"
            label="Email"
            {...register('email')}
            type="email"
          />
          <br></br>

          <TextField
            label="Age"
            {...register('age')}
            helperText=" Please enter your age"
          />
          <br></br>
          {image ? (
            <img src={image + ''} width="100px" height="100px" />
          ) : (
            <></>
          )}

          <br />
          <br />

          <Button variant="contained" component="label">
            Change image
            <input
              type="file"
              {...register('image', {
                onChange: handleImage,
              })}
              hidden
            />
          </Button>
          <br />
          <br />

          <Box sx={{ display: 'flex' }} className="box">
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => {
                  return (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                  );
                }}
              />
            </FormControl>
          </Box>

          <div>
            <Button type="submit" variant="contained" color="primary">
              Edit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

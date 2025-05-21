import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './App.css'
import { zPayload } from '@/types'
import { Alert, Button, Snackbar, type SnackbarCloseReason, TextField } from '@mui/material'
import { useState } from 'react'
import { z } from 'zod'


function App() {

  const zFormValues = z.strictObject({
    firstName: zPayload.shape.firstName,
    middleName: zPayload.shape.middleName.or(z.literal('')),
    lastName: zPayload.shape.lastName,
    egn: zPayload.shape.egn.or(z.literal('')),
    phoneNumber: zPayload.shape.phoneNumber.or(z.literal('')),
    address: zPayload.shape.address,
    postcode: zPayload.shape.postcode,
    email: zPayload.shape.email.or(z.literal(''))
  })
  // Phone number is required if email is empty
  .refine(data => !(!data.email && !data.phoneNumber), {
    message: 'Please provide either a phone number or an email address.',
    path: ['email'],
  })
  // Sofia postcode check
  .refine(data => {
    return data.address.includes('Sofia') ? data.postcode === '1000' : true
  }, {
    message: 'The provided postcode does not match the address',
    path: ['postcode']
  })

  type FormValues = z.infer<typeof zFormValues>

  const form = useForm<FormValues>({
    resolver: zodResolver(zFormValues)
  })

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    event?.preventDefault()
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function onSubmit(values: FormValues) {
    handleClick()
    console.log('payload', values)
  }

  console.log('form', form.formState.errors)

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>

      <h1>Peronsal Information Form</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="form">

        <TextField
          required
          variant="outlined"
          label="First Name"
          {...form.register('firstName')}
          error={!!form.formState.errors.firstName}
          helperText={form.formState.errors.firstName?.message}
          autoComplete={'none'}
        />

        <TextField
          variant="outlined"
          label="Middle Name"
          {...form.register('middleName', { required: false })}
          error={!!form.formState.errors.middleName}
          helperText={form.formState.errors.middleName?.message}
          autoComplete={'none'}
        />

        <TextField
          required
          variant="outlined"
          label="Last Name"
          {...form.register('lastName')}
          error={!!form.formState.errors.lastName}
          helperText={form.formState.errors.lastName?.message}
          autoComplete={'none'}
        />

        <TextField
          variant="outlined"
          label="EGN"
          {...form.register('egn', { required: false })}
          error={!!form.formState.errors.egn}
          helperText={form.formState.errors.egn?.message}
          autoComplete={'none'}
        />

        <TextField
          required={!form.watch('email')} // Required if email is empty
          variant="outlined"
          label="Phone Number"
          {...form.register('phoneNumber')}
          error={!!form.formState.errors.phoneNumber}
          helperText={form.formState.errors.phoneNumber?.message}
          autoComplete={'none'}
        />

        <TextField
          required
          variant="outlined"
          label="Address"
          {...form.register('address')}
          error={!!form.formState.errors.address}
          helperText={form.formState.errors.address?.message}
          autoComplete={'none'}
        />

        <TextField
          required
          variant="outlined"
          label="Postcode"
          {...form.register('postcode')}
          error={!!form.formState.errors.postcode}
          helperText={form.formState.errors.postcode?.message}
          autoComplete={'none'}
        />

        <TextField
          required={!form.watch('phoneNumber')} // Required if phone number is empty
          variant="outlined"
          label="Email"
          {...form.register('email')}
          error={!!form.formState.errors.email}
          helperText={form.formState.errors.email?.message}
          autoComplete={'none'}
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>

      </form>
    </>
  )
}

export default App

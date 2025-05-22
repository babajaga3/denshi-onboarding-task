import { TextField } from '@mui/material'
import type { UseFormReturn } from 'react-hook-form'
import type { FormValues } from '@/types'


export function ContactInformation({ form } : { form: UseFormReturn<FormValues> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div>
        <h3 style={{}}>Personal Information</h3>
        <p style={{ color: '#898782' }}>We will use this to contact you. You may fill out one or both fields.</p>
      </div>
      <TextField
        required={!form.watch('phoneNumber')} // Required if phone number is empty
        variant="outlined"
        label="Email"
        {...form.register('email')}
        error={!!form.formState.errors.email}
        helperText={form.formState.errors.email?.message}
        autoComplete={'none'}
        type="email"
      />
      <TextField
        required={!form.watch('email')} // Required if email is empty
        variant="outlined"
        label="Phone Number"
        {...form.register('phoneNumber')}
        error={!!form.formState.errors.phoneNumber}
        helperText={form.formState.errors.phoneNumber?.message}
        autoComplete={'none'}
        type={'tel'}
      />
    </div>
  )
}
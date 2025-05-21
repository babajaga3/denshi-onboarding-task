import { TextField } from '@mui/material'
import type { UseFormReturn } from 'react-hook-form'
import type { FormValues } from '@/types'


export function PersonalInformation({ form } : { form: UseFormReturn<FormValues> }) {
  return (
    <>
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
    </>
  )
}
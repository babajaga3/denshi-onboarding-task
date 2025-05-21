import { TextField } from '@mui/material'
import type { UseFormReturn } from 'react-hook-form'
import type { FormValues } from '@/types'


export function AddressInformation({ form } : { form: UseFormReturn<FormValues> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div>
        <h3 style={{}}>Address Information</h3>
        <p style={{ color: '#898782' }}>We will use it to send any postal related news.</p>
      </div>
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
    </div>
  )
}
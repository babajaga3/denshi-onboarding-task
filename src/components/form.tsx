import { Alert, Button, Snackbar, type SnackbarCloseReason } from '@mui/material'
import { useForm } from 'react-hook-form'
import { type FormValues, type Payload, zFormValues } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { PersonalInformation } from '@/components/personal-information.tsx'
import { AddressInformation } from '@/components/address-information.tsx'
import { ContactInformation } from '@/components/contact-information.tsx'
import { useIsMobile } from '@/hooks/use-is-mobile.tsx'
import { createCustomer } from '@/api'


export function Form() {
  const isMobile = useIsMobile()

  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(zFormValues)
  })

  const customerMutation = useMutation({
    mutationKey: [ 'customer', 'create', form.getValues('egn') ],
    mutationFn: createCustomer,
    onSuccess: () => {
      form.reset()
      handleClick()
    },
    onError: () => {
      
    },
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

  const onSubmit = useCallback((values: FormValues) => {

    // Construct payload
    const payload: Payload = {
      type: 'INDIVIDUAL',
      ...values
    }

    // Invoke mutation
    customerMutation.mutate(payload)
  }, [ customerMutation ])

  console.log('form', form.formState.errors)

  return (
    <>
      <Snackbar open={open} autoHideDuration={null} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Your form has been submitted successfully!
        </Alert>
      </Snackbar>

      <h1>ID Online Registration Form</h1>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          width: !isMobile ? '30%' : '95%'
        }}
      >

        <PersonalInformation form={form} />

        <AddressInformation form={form} />

        <ContactInformation form={form} />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>

      </form>
    </>
  )
}
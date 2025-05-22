import { Alert, Button, Snackbar, type SnackbarCloseReason } from '@mui/material'
import { useForm } from 'react-hook-form'
import { type FormValues, type Payload, zFormValues } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { type SyntheticEvent, useCallback, useState } from 'react'
import { PersonalInformation } from '@/components/personal-information.tsx'
import { AddressInformation } from '@/components/address-information.tsx'
import { ContactInformation } from '@/components/contact-information.tsx'
import { useIsMobile } from '@/hooks/use-is-mobile.tsx'
import { createCustomer } from '@/api'


interface ToastState {
  open: boolean
  message: string
  status: 'success' | 'error'
}

export function Form() {
  const isMobile = useIsMobile()

  // Toast state
  const [ toastState, setToastState ] = useState<ToastState>({
    open: false,
    message: '',
    status: 'success'
  })

  // Form state
  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(zFormValues)
  })

  // Tanstack Mutation
  const customerMutation = useMutation({
    mutationKey: [ 'customer', 'create', form.getValues('egn') ],
    // mutationFn: createCustomer,
    mutationFn: async (payload: Payload) => {
      console.log(payload)
    },
    onSuccess: () => {
      form.reset()
      handleClick('success', 'Your form has been submitted successfully!')
    },
    onError: () => {
      handleClick('error', 'There was an error processing your form. Please try again later.')
    },
  })

  // Toast handlers
  const handleClick = useCallback((status: ToastState['status'], message: string) => {
    setToastState({
      open: true,
      message,
      status
    })
  }, [ setToastState ])

  const handleClose = useCallback((
    event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    event?.preventDefault()
    if (reason === 'clickaway') {
      return;
    }

    setToastState(prev => {
      return {
        ...prev,
        open: false
      }
    })
  }, [ setToastState ])

  // Form submit handler
  const onSubmit = useCallback((values: FormValues) => {

    // Construct payload
    const payload: Payload = {
      type: 'INDIVIDUAL',
      ...values
    }

    // Invoke mutation
    customerMutation.mutate(payload)
  }, [ customerMutation ])

  return (
    <>
      <Snackbar open={toastState.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={toastState.status}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toastState.message}
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
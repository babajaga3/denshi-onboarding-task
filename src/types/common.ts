import { z } from 'zod'


export const zName = z.string()
  .min(2, { message: 'Name must be at least 2 characters long' })
  .max(64, { message: 'Name must be at most 64 characters long' })
  .regex(/^[A-Za-z' -]+$/, { message: 'Only letters, apostrophes, hyphens, and spaces are allowed' }) // Regex supports letters, ' - and space
export const zEGN = z.string()
  .length(10, { message: 'Maximum length of EGN is 10 characters' }) // .regex(/^[0-9]+$/) // todo update regex with EGN rules
export const zAddress = z.string()
  .min(2, { message: 'Address must be at least 2 characters long' })
  .max(255, { message: 'Address must be at most 255 characters long' })
export const zPostcode = z.string()
  .length(4, { message: 'Postcode must be exactly 4 characters long' })
  .regex(/\d{4}$/, { message: 'Postcode must be a 4-digit number' }) // Regex supports only 4 digits
export const zPhoneNumber = z.string()
  .min(9, { message: 'Phone number must be at least 9 characters long' })
  .max(16, { message: 'Phone number must be at most 16 characters long' })
  .regex(/^(?:\+|00)\d{9,16}$/, { message: 'Phone number must start with + or 00' }) // Starts with + or 00 and followed by 9 to 16 digits
export const zEmail = z.string()
  .email({ message: 'Email must be a valid email address' })

export const zPayload = z.strictObject({
  type: z.literal('INDIVIDUAL'),
  firstName: zName,
  middleName: zName.optional(),
  lastName: zName,
  egn: zEGN.optional(),
  phoneNumber: zPhoneNumber,
  address: zAddress,
  postcode: zPostcode,
  email: zEmail
})

export type Payload = z.infer<typeof zPayload>

export const zFormValues = z.strictObject({
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

export type FormValues = z.infer<typeof zFormValues>


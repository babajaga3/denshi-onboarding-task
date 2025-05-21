import { z } from 'zod'


export const zName = z.string().min(2).max(64).regex(/^[A-Za-z' -]+$/) // Regex supports letters, ' - and space
export const zEGN = z.string().length(10) // .regex(/^[0-9]+$/) // todo update regex with EGN rules
export const zAddress = z.string().min(2).max(255)
export const zPostcode = z.number().int().nonnegative().min(1000).max(9999)
export const zPhoneNumber = z.string().min(9).max(16).regex(/^(?:\+|00)\d{9,16}$/) // Starts with + or 00 and
// followed by
// 9-16 digits
export const zEmail = z.string().email()

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
  // Phone number is required if email is empty
  .refine(data => {
    if (!data.email && !data.phoneNumber) return false
  }, {
    message: 'Please provide either a phone number or an email address.',
    path: ['email', 'phoneNumber']
  })
  // Sofia postcode check
  .refine(data => {
    if (data.address.includes('Sofia') && data.postcode !== 1000) return false
  }, {
    message: 'The provided postcode does not match the address',
    path: ['postcode']
  })

export type Payload = z.infer<typeof zPayload>
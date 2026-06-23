import { sendRegistrationEmail as sendRegistrationEmailHelper } from '../../lib/email';

export async function sendRegistrationEmail(email: string) {
  await sendRegistrationEmailHelper(email);
}

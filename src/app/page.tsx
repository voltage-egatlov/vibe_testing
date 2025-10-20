import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to /home by default
  redirect('/home');
}

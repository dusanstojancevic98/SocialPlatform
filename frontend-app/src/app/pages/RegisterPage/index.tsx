import { Register } from 'app/components/Register/Register';
import { Helmet } from 'react-helmet-async';

export function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Register />
    </>
  );
}

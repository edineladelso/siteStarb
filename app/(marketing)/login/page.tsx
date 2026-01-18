import { Button } from "@/components/ui/button";
import {  registrarComEmail, fazerLoginComEmail} from "@/lib/supabase/auth/auth-actions";

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <Button formAction={fazerLoginComEmail}>Log in</Button>
      <Button formAction={registrarComEmail}>Sign up</Button>
    </form>
  );
}

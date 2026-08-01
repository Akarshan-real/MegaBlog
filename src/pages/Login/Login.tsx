import {Login as LogInComponent} from "../../components/index"
import { usePageMeta } from "../../Helper/Function";

const Login = () => {
  usePageMeta("Login | MegaBlog", "Sign in to your MegaBlog account.");
  return (
    <div className='py-8 min-h-screen bg-(--bg) text-(--text)'>
      <LogInComponent />
    </div>
  )
}

export default Login

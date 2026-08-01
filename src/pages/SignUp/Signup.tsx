import { Signup as SignUpComponent } from '../../components/index'
import { usePageMeta } from "../../Helper/Function";

const Signup = () => {
    usePageMeta("Sign Up | MegaBlog", "Create your MegaBlog account.");
    return (
        <div className='py-8 min-h-screen bg-(--bg) text-(--text)'>
            <SignUpComponent />
        </div>
    )
}

export default Signup

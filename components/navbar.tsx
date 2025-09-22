import Link from 'next/link';
import Image from 'next/image';
import NavItems from '../components/NavItems';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link href="/">
                <div className="flex items-center gap-2.5" style={{ cursor: 'pointer' }}>
                    <Image src={'/images/logo.svg'} alt="logo" width={46} height={44} />
                </div>
            </Link>
            <div className='flex items-center gap-8'>
               <NavItems />
                <SignedOut>
                    <Link href="/sign-in">
                        <SignInButton />
                    </Link>
                    <Link href="/sign-up">
                        <SignUpButton />
                    </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
}
export default Navbar;
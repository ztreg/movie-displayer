import Link from 'next/link'
import {SuspendedSearchBar} from './'

const Navbar = () => {
  return (
    <header className='w-full absolute z-10'>
        <nav className='max-w-[1440px] mx-auto flex flex-row justify-between items-center sm:px-16 px-6 py-4 mb-6'>
            <div className='flex justify-start gap-6 items-center w-[100%]'>
                <Link href="/" className='hover:underline'>
                    <h2 className="text-xl font-semibold mb-4">Movies</h2>
                </Link>
                <Link href="./shows" className='hover:underline'>
                    <h2 className="text-xl font-semibold mb-4">Shows</h2>
                </Link>
                <Link href="./shows" className='hover:underline'>
                    <h2 className="text-xl font-semibold mb-4">Fantasy</h2>
                </Link>
            </div>

            <SuspendedSearchBar />
        </nav>
    </header>
  )
}

export default Navbar
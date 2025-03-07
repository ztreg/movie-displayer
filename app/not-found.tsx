import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='absolute w-full p-4 text-white text-3xl transform flex justify-center flex-col top-[25%] items-center'>
      <h2>Not Found 😭</h2>
      <Link href="/" className='hover:bg-gray-700'>Return Home</Link>
    </div>
  )
}
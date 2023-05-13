import Image from 'next/image'


export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Hello World</h1>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      <p className="text-center font-sans text-2xl">Hello World</p>
    </div>
  )
}

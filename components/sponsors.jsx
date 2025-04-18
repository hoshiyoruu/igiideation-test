/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XjRmdUxewxr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
const Sponsors = () => {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Organized by:
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Department of Computer Sciences<br/>
                Kulliyyah of Information  and Communication Technology<br/>
                International Islamic University Malaysia Gombak<br/>
              </p>
            </div>
        <div className="container px-4 grid items-center justify-center text-center md:px-6">
          <div className="mx-auto grid max-w-[900px] gap- lg:grid-cols-5 xl:gap-8 mt-10">
            <div className="flex flex-col gap-0   overflow-hidden">
              <img
                src="/iium.png"
                alt="Logo"
                className=" w-auto h-auto"
              />
            </div>
            <div className="flex flex-col gap-0   overflow-hidden">
              <img
                src="/kict.png"
                alt="Logo"
                className=" w-auto h-auto"
              />
            </div>
            <div className="flex flex-col gap-0   overflow-hidden">
              <img
                src="/mbot.png"
                alt="Logo"
                className=" w-auto h-auto"
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl ">In Collaboration:</h2>
          <div className="mx-auto grid max-w-[900px] gap- lg:grid-cols-5 xl:gap-8 mt-10">
            <div className="flex flex-col gap-0   overflow-hidden">
              <img
                src="/usk.png"
                alt="Logo"
                className="aspect-[2/1] w-auto h-auto"
              />
            </div>
            <div className="flex flex-col gap-0   overflow-hidden">
              <img
                src="/mila.png"
                alt="Logo"
                className="aspect-[2/1] w-auto h-auto"
              />
            </div>
            <div className="flex flex-col gap-0   overflow-hidden">
              <img
                src="/silver.png"
                alt="Logo"
                className="aspect-[2/1] w-auto h-auto"
              />
            </div>
            <div className="flex flex-col gap-0   overflow-hidden">
              <img
                src="/mmu.png"
                alt="Logo"
                className="aspect-[2/1] w-auto h-auto"
              />
            </div>
            <div className="flex flex-col gap-0   overflow-hidden">
              <img
                src="/uitm.png"
                alt="Logo"
                className="w-full h-auto object-center"
              />
            </div>
          </div>
        </div>
      </section>
    )
  }

  export default Sponsors;


import Link from "next/link";
import Image from "next/image";
import { WaveGradient } from "@/components/Wave-Gradient";

export const dynamic = "force-dynamic";

export default function Landing() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#FE2C55] via-black to-black">
        <main className="flex-1 text-white">
          <section className="w-full pt-12 md:pt-24 lg:pt-32 relative overflow-hidden">
            <WaveGradient />
            <div className="px-4 md:px-6 space-y-10 xl:space-y-16 relative z-10">
              <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                <div>
                  <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                    TIKTOK Judging System
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl mt-10 text-justify">
                  Get ready, KICT IIUM! 🎉 The KICT TikTok Awards 2025 are here to celebrate the creativity, humor, and talent of our amazing students. Whether you’re a tech genius, content king, or just love to make people smile, this is your chance to shine on screen and win exciting prizes! Submit your best TikTok videos, show off your KICT spirit, and compete for titles like Best Creator, Funniest Video, Most Inspiring Content, and more. Let’s make the FYP proud — it’s your time to go viral! 📱✨ #KICTTikTokAwards #IIUMVibes #KICTOnTrend
                  </p>
                  <Link
                    href="/login"
                    className="mt-5 inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative before:absolute before:inset-0 before:rounded-md before:border before:border-gradient-to-r before:from-purple-500 before:via-pink-500 before:to-orange-500 before:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 w-full mb-10"
                    prefetch={false}
                  >
                    Login as Judge
                  </Link>

                 
                </div>
                <div className="relative">
                  <img
                    src="image/ioteams.png"
                    alt="Hero"
                    className="mx-auto w-full h-auto object-cover rounded-xl ring-2 ring-black-500 shadow-lg"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="w-fit mx-auto py-12 md:py-24 lg:py-32">
            <div className="container space-y-12 px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg relative before:absolute before:inset-0 before:rounded-lg before:border before:border-gradient-to-r before:from-purple-500 before:via-pink-500 before:to-orange-500 before:opacity-50 bg-gray-900/50 px-3 py-1 text-sm backdrop-blur-sm">
                    New Events
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  TikTok Awards 2025: From KICT to FYP Stardom!
                  </h2>
                  <p className="max-w-[900px] mx-auto text-white-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-grey-400">
                  Got a funny bone, creative spark, or tech story to share? Don’t just scroll — create! Be part of the KICT TikTok Awards 2025 and let your talent shine. Whether it’s coding comedy, student life hacks, or just good vibes, your video could earn you fame and prizes! 🎥✨ Don’t miss the chance to represent KICT in style — submit your TikTok now and show us what you’ve got! 💪🔥 
                  </p>
                </div>
              </div>
              <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4">
                <div className="grid gap-1 p-4 rounded-lg relative before:absolute before:inset-0 before:rounded-lg before:border before:border-gradient-to-r before:from-purple-500 before:via-pink-500 before:to-orange-500 before:opacity-30 hover:before:opacity-100 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10">
                  <h3 className="text-lg font-bold text-gray-50">
                    Showcasing Cutting-Edge Advancements
                  </h3>
                  <p className="text-sm text-gray-300">
                    Discover pioneering projects and technologies in AI, IoT,
                    cybersecurity, Islamic science, and more. IGIIDeation 2025
                    highlights the ingenuity and creativity driving progress
                    across industries.
                  </p>
                </div>
                <div className="grid gap-1 p-4 rounded-lg relative before:absolute before:inset-0 before:rounded-lg before:border before:border-gradient-to-r before:from-purple-500 before:via-pink-500 before:to-orange-500 before:opacity-30 hover:before:opacity-100 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10">
                  <h3 className="text-lg font-bold text-gray-50">
                    Fostering Knowledge Sharing and Collaboration
                  </h3>
                  <p className="text-sm text-gray-300">
                    Engage with researchers, innovators, and global industry
                    leaders to share insights, explore trends, and address
                    complex global challenges through interdisciplinary
                    approaches.
                  </p>
                </div>
                <div className="grid gap-1 p-4 rounded-lg relative before:absolute before:inset-0 before:rounded-lg before:border before:border-gradient-to-r before:from-purple-500 before:via-pink-500 before:to-orange-500 before:opacity-30 hover:before:opacity-100 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10">
                  <h3 className="text-lg font-bold text-gray-50">
                    Inspiring Future Innovators
                  </h3>
                  <p className="text-sm text-gray-300">
                    Connect with experts and visionaries to celebrate creativity
                    and push boundaries. IGIIDeation 2025 encourages future
                    inventors to redefine possibilities and turn bold ideas into
                    reality.
                  </p>
                </div>
                <div className="grid gap-1 p-4 rounded-lg relative before:absolute before:inset-0 before:rounded-lg before:border before:border-gradient-to-r before:from-purple-500 before:via-pink-500 before:to-orange-500 before:opacity-30 hover:before:opacity-100 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10">
                  <h3 className="text-lg font-bold text-gray-50">
                    Celebrating Interdisciplinary Solutions
                  </h3>
                  <p className="text-sm text-gray-300">
                    Highlight the importance of interdisciplinary approaches in
                    solving global challenges and creating transformative
                    solutions that shape the future.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="flex justify-center  bg-gray-100 text-black py-10">
            <div className="container grid items-center justify-center  px-4 text-center md:px-6">
              <section className="w-full ">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Organized by:
                  </h2>
                  <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Department of Computer Sciences
                    <br />
                    Kulliyyah of Information and Communication Technology
                    <br />
                    International Islamic University Malaysia Gombak
                    <br />
                  </p>
                </div>
                <div className="container px-4 grid items-center justify-center text-center md:px-6">
                  <div className="mt-10 flex flex-col md:flex-row justify-center gap-x-10">
                    <Image
                      src="/iium.png"
                      alt="Logo"
                      width={300}
                      height={200}
                      className="w-auto h-auto"
                    />
                    <Image
                      src="/kict.png"
                      alt="Logo"
                      width={100}
                      height={300}
                      className="w-auto h-auto"
                    />
                    <Image
                      src="/ioteamslogo.png"
                      alt="Logo"
                      width={100}
                      height={100}
                      className="w-auto h-auto"
                    />
                  </div>
                </div>
              </section>
              {/* <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Sign up to get notified when we launch.{" "}
                  <Link href="#" className="underline underline-offset-2" prefetch={false}>
                    Terms & Conditions
                  </Link>
                </p>
              </div> */}
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-100">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; 2024 QuantumLeap Technologies. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
              prefetch={false}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
              prefetch={false}
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </>
  );
}

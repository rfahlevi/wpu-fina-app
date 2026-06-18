import FinaApp from "@/components/common/fina-app";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import { IconArrowNarrowRight, IconHeartFilled, IconPasswordUser, IconSparkles } from "@tabler/icons-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fina",
  description: "Your personal finance app with AI Powered",
}

export default function Home() {
  return (
    <main className="flex items-center flex-col w-full gap-2">
      {/* Main Menu */}
      <section className="bg-background/70 backdrop-blur-2xl py-4 px-8 w-full flex items-center justify-between gap-4 border-b sticky top-0">
        <FinaApp />
        <p className="text-sm text-muted-foreground">Your personal finance app with <span className="text-chart-2 font-semibold">AI Powered</span></p>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button size="lg">
            <IconPasswordUser stroke={2} />
            Login
          </Button>
        </div>
      </section>
      {/* Main Menu */}

      {/* Content */}
      <div className="w-full px-8 py-4 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-1 w-fit text-primary font-medium bg-primary/5 border-primary px-3 py-1.5 border rounded-lg text-sm">
              <IconSparkles stroke={2} size={18} />
              <p>AI Powered Finance Manager</p>
            </div>
            <h1 className="text-4xl font-bold mt-4">Manage Your Money <br />
              <span className="text-primary">Smarter</span> with
              <span className="text-chart-2"> AI</span>
            </h1>
            <p className="text-muted-foreground -mt-2 tracking-wide ">Fina App is my portofolio project that helps you track expenses, set budgets,
              and get AI-powered insights using Gemini API. Experience the future of personal finance with Generative UI.</p>
            <Button
              size="default"
              className="w-fit text-sm h-10! px-4 mt-2 mb-4"
              asChild
            >
              <Link href="/dashboard">
                Explore Dashboard
                <IconArrowNarrowRight stroke={2} className="size-5" />
              </Link>
            </Button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              <div className='p-3 border flex flex-col items-center lg:items-start space-y-2 border-border text-sm rounded-sm'>
                <Image src="ic_robot.svg" width={40} height={40} alt="AI Assistant" />
                <div className="flex flex-col items-center lg:items-start">
                  <p className="font-semibold">AI Assistant</p>
                  <p className="text-xs text-muted-foreground">Powered by Gemini API</p>
                </div>
              </div>
              <div className='p-3 border flex flex-col items-center lg:items-start space-y-2 border-border text-sm rounded-sm'>
                <Image src="ic_chart.svg" width={36} height={36} alt="AI Assistant" />
                <div className="flex flex-col items-center lg:items-start">
                  <p className="font-semibold">Smart Insight</p>
                  <p className="text-xs text-muted-foreground">Understand your spending</p>
                </div>
              </div>
              <div className='p-3 border flex flex-col items-center lg:items-start space-y-2 border-border text-sm rounded-sm'>
                <Image src="ic_gen_ui.svg" width={36} height={36} alt="AI Assistant" />
                <div className="flex flex-col items-center lg:items-start">
                  <p className="font-semibold">Generative UI</p>
                  <p className="text-xs text-muted-foreground">Dynamic & Contextual</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-border rounded-xl">
            <Image src="/img_dashboard.png" width={1000} height={1000} alt="Dashboard"
              className="rounded-xl"
            />
          </div>
          <div className="col-span-2 flex flex-col justify-center w-full gap-3 items-center">
            <p className="text-sm font-semibold">Built with <span className="text-primary">Modern</span>
              <span className="text-muted-foreground"> Technologies</span> </p>

            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="flex items-center w-36 justify-center gap-2 py-2 px-4 text-xs font-medium text-slate-900 bg-white dark:bg-white/80 border border-border rounded-md">
                <Image src="/ic_next_js.png" width={20} height={20} alt="Next.js" />
                <p>Next.js</p>
              </div>
              <div className="flex items-center w-36 justify-center gap-2 py-2 px-4 text-xs font-medium text-slate-900 bg-white dark:bg-white/80 border border-border rounded-md">
                <Image src="/ic_shadcn_ui.png" width={20} height={20} alt="Shadcn UI" />
                <p>Shadcn UI</p>
              </div>
              <div className="flex items-center w-36 justify-center gap-2 py-2 px-4 text-xs font-medium text-slate-900 bg-white dark:bg-white/80 border border-border rounded-md">
                <Image src="/ic_gemini.png" width={20} height={20} alt="Gemini API" />
                <p>Gemini API</p>
              </div>
              <div className="flex items-center w-36 justify-center gap-2 py-2 px-4 text-xs font-medium text-slate-900 bg-white dark:bg-white/80 border border-border rounded-md">
                <Image src="/ic_supabase.png" width={20} height={20} alt="Supabase" />
                <p>Supabase</p>
              </div>
              <div className="flex items-center w-36 justify-center gap-2 py-2 px-4 text-xs font-medium text-slate-900 bg-white dark:bg-white/80 border border-border rounded-md">
                <Image src="/ic_vector.svg" width={20} height={20} alt="Vector Search" />
                <p>Vector Search</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <p className="text-xs text-muted-foreground">A portofolio project by me to showcase fullstack, AI Integration, and modern UI skills</p>
              <IconHeartFilled className="size-4 text-primary" />
            </div>
          </div>
        </div>
      </div>
      {/* Content */}

      {/* <IconSubtitlesAi stroke={2} size={60} className="text-primary" />
      <div className="flex flex-col gap-0 justify-center items-center">
        <h1 className="text-xl text-muted-foreground">Welcome to <span className="font-bold text-primary">Fina App</span></h1>
        <p className="text-sm text-muted-foreground not-italic">Your personal finance app with <span className="text-chart-2 font-semibold italic">AI Powered</span></p>
      </div>
      <Button size="lg" className="mt-3 w-60">Get Started</Button> */}
    </main>
  );
}

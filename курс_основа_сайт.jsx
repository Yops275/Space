// package.json
{
  "name": "nastoyashaya-osnova",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "tailwindcss": "^3.3.0",
    "clsx": "^2.1.0",
    "lucide-react": "latest",
    "@shadcn/ui": "latest"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "typescript": "^5.0.0"
  }
}

// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {}
  },
  plugins: []
}

// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

// app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

// components/ui/button.tsx
import { ButtonHTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
    },
    size: {
      default: "h-10 px-4 py-2",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

// lib/utils.ts
export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}

// components/ui/card.tsx
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl shadow p-4 bg-white ${className}`}>{children}</div>
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

// components/ui/progress.tsx
export function Progress({ value }: { value: number }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-green-500 h-2 rounded-full transition-all"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  )
}

// components/ui/tabs.tsx
import { useState } from "react"

export function Tabs({ defaultValue, children, className }: any) {
  const [active, setActive] = useState(defaultValue)
  return (
    <div className={className}>
      {children.map((child: any) =>
        child.type.name === "TabsList"
          ? { ...child, props: { ...child.props, active, setActive } }
          : child.props.value === active && child
      )}
    </div>
  )
}

export function TabsList({ children, active, setActive }: any) {
  return <div className="flex gap-2 mb-2">{children.map((child: any) => ({
    ...child,
    props: {
      ...child.props,
      active,
      setActive,
    },
  }))}</div>
}

export function TabsTrigger({ children, value, active, setActive }: any) {
  return (
    <button
      onClick={() => setActive(value)}
      className={`px-4 py-2 rounded-md border ${active === value ? "bg-black text-white" : "bg-white text-black"}`}
    >
      {children}
    </button>
  )
}

export function TabsContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

// components/ui/scroll-area.tsx
export function ScrollArea({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`${className} overflow-y-auto`}>{children}</div>
}

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

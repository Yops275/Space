#!/bin/bash

# Название проекта
PROJECT_NAME="nastoyashaya-osnova"

# Создание проекта
echo "Создаю проект: $PROJECT_NAME..."
mkdir $PROJECT_NAME && cd $PROJECT_NAME

# Инициализация нового проекта
npm init -y
npm install next@14 react react-dom tailwindcss postcss autoprefixer typescript clsx lucide-react @shadcn/ui
npx tailwindcss init -p

# Создание файлов и папок
mkdir -p app components/ui lib public styles
touch tailwind.config.js postcss.config.js next.config.js
touch app/page.tsx app/globals.css
touch lib/utils.ts
touch README.md

# Создание компонентов UI
echo "Создаю компоненты UI..."
cat > components/ui/button.tsx <<'EOF'
import { ButtonHTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 disabled:opacity-50", {
  variants: {
    variant: {
      default: "bg-black text-white hover:bg-opacity-90",
      outline: "border border-gray-300 bg-white text-black hover:bg-gray-100"
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
EOF

cat > components/ui/card.tsx <<'EOF'
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl shadow p-4 bg-white ${className}`}>{children}</div>
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
EOF

cat > components/ui/progress.tsx <<'EOF'
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
EOF

cat > components/ui/scroll-area.tsx <<'EOF'
export function ScrollArea({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`${className} overflow-y-auto`}>{children}</div>
}
EOF

cat > components/ui/tabs.tsx <<'EOF'
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
  return (
    <div className="flex gap-2 mb-2">
      {children.map((child: any) => ({
        ...child,
        props: {
          ...child.props,
          active,
          setActive,
        },
      }))}
    </div>
  )
}

export function TabsTrigger({ children, value, active, setActive }: any) {
  return (
    <button
      onClick={() => setActive(value)}
      className={`px-4 py-2 rounded-md border ${
        active === value ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {children}
    </button>
  )
}

export function TabsContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
EOF

# Остальные файлы ты можешь вставить так же — скажи, если хочешь полный скрипт с page.tsx и README.md.

# Финал
echo "✅ Проект $PROJECT_NAME создан. Открой VS Code или IDE и продолжай."
echo "👉 Чтобы запустить проект: cd $PROJECT_NAME && npm run dev"

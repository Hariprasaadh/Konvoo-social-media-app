'use client'
// Always Error components must be a client component

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RotateCcw, Home } from 'lucide-react'
import { motion } from 'framer-motion'

// Global Error Boundary Component
export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string },
  reset: () => void
}) {
  const router = useRouter()

  // Log error details to console for debugging purposes
  useEffect(() => {
    console.error('Konvoo App Error:', error)
  }, [error])

  const container = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-background text-foreground"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Brand */}
      <motion.h1 variants={item} className="text-3xl font-bold text-primary mb-2">
        Konvoo
      </motion.h1>
      <motion.div variants={item} className="w-12 h-1 bg-primary rounded-full mb-6"></motion.div>

      {/* Icon */}
      <motion.div
        variants={item}
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <AlertTriangle className="h-20 w-20 text-destructive mb-6" />
      </motion.div>

      {/* Message */}
      <motion.div variants={item} className="max-w-xl space-y-4 mb-6">
        <h2 className="text-4xl font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground">
          Oops! We ran into an unexpected issue. The Konvoo feed may have ghosted us.
          Try refreshing or head back home.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div variants={item} className="flex gap-4 flex-wrap justify-center">
        <Button onClick={() => reset()} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Try Again
        </Button>

        <Button variant="secondary" onClick={() => router.push('/')} className="gap-2">
          <Home className="h-4 w-4" />
          Go Home
        </Button>
      </motion.div>

      {/* Decorative Dots */}
      <motion.div variants={item} className="flex justify-center space-x-2 mt-10">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary rounded-full"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

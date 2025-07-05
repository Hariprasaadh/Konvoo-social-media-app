'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Ghost, Home, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'


// NotFound Component – Shown when a user visits a non-existent route

export default function NotFound() {

  const router = useRouter() // // Access router to allow back navigation

  const containerVariants = {
    hidden: { opacity: 0, y: 30 }, // Initial hidden state
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center"
    >
      <div className="flex flex-col items-center gap-6 max-w-lg">
        {/* Logo/Brand */}
        <motion.div variants={itemVariants} className="mb-2">
          <h2 className="text-2xl font-bold text-primary mb-2">Konvoo</h2>
          <div className="w-12 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        {/* Ghost Icon with Animation */}
        <motion.div
          variants={itemVariants}
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Ghost className="h-20 w-20 text-muted-foreground" />

        </motion.div>

        {/* Error Message */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            404 – Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The page you are looking for might have been removed, moved, or never existed.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4 w-full">
          <Link href="/" className="w-full">
            <Button variant="default" size="lg" className="w-full gap-2">
              <Home className="h-5 w-5" />
              Go Back Home
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="gap-2 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>

        </motion.div>

         {/* Decorative Loading Dots Animation */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center space-x-2 mt-4"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
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
      </div>
    </motion.div>
  )
}
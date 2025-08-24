"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Users,
  Zap,
  Calendar,
  BookOpen,
  Github,
  Twitter,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Network,
  Cpu,
  Linkedin,
} from "lucide-react"

interface NetworkNode {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  connections: number[]
}

export function ChainChapterLanding() {
  const [nodes, setNodes] = useState<NetworkNode[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Initialize network nodes
    const initialNodes: NetworkNode[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      connections: [],
    }))

    // Create connections between nearby nodes
    initialNodes.forEach((node, i) => {
      initialNodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2))
          if (distance < 200 && node.connections.length < 3) {
            node.connections.push(j)
          }
        }
      })
    })

    setNodes(initialNodes)

    // Animate nodes
    const animateNodes = () => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => ({
          ...node,
          x: (node.x + node.vx + window.innerWidth) % window.innerWidth,
          y: (node.y + node.vy + window.innerHeight) % window.innerHeight,
        })),
      )
    }

    const interval = setInterval(animateNodes, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const projects = [
    {
      title: "DeFi Analytics Dashboard",
      description: "Real-time tracking of DeFi protocols and yield farming opportunities",
      tech: ["React", "Web3.js", "The Graph"],
      status: "Active",
      glow: "from-blue-500 to-cyan-500",
    },
    {
      title: "NFT Marketplace",
      description: "Decentralized marketplace for student-created digital art and collectibles",
      tech: ["Solidity", "IPFS", "Next.js"],
      status: "In Development",
      glow: "from-purple-500 to-pink-500",
    },
    {
      title: "DAO Governance Tool",
      description: "Voting and proposal management system for decentralized organizations",
      tech: ["Hardhat", "OpenZeppelin", "TypeScript"],
      status: "Planning",
      glow: "from-green-500 to-emerald-500",
    },
    {
      title: "Cross-Chain Bridge",
      description: "Secure asset transfer between different blockchain networks",
      tech: ["Chainlink", "Polygon", "Ethereum"],
      status: "Research",
      glow: "from-orange-500 to-red-500",
    },
  ]

  const events = [
    {
      title: "Web3 Hackathon 2024",
      date: "March 15-17",
      type: "Hackathon",
      description: "48-hour blockchain development competition with $10K in prizes",
    },
    {
      title: "DeFi Deep Dive Workshop",
      date: "February 28",
      type: "Workshop",
      description: "Hands-on session building yield farming strategies",
    },
    {
      title: "NFT Art Exhibition",
      date: "April 5",
      type: "Showcase",
      description: "Student-created NFT collection launch and gallery",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-purple-950 overflow-hidden">
      {/* Animated Network Background */}
      <div className="fixed inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-20">
          {nodes.map((node) => (
            <g key={node.id}>
              {node.connections.map((connectionId) => {
                const connectedNode = nodes[connectionId]
                if (!connectedNode) return null
                return (
                  <line
                    key={`${node.id}-${connectionId}`}
                    x1={node.x}
                    y1={node.y}
                    x2={connectedNode.x}
                    y2={connectedNode.y}
                    stroke="url(#gradient)"
                    strokeWidth="1"
                    className="animate-pulse"
                  />
                )
              })}
              <circle cx={node.x} cy={node.y} r="3" fill="#8B5CF6" className="animate-pulse" />
            </g>
          ))}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Mouse follower glow */}
      <div
        className="fixed pointer-events-none w-96 h-96 rounded-full opacity-10 blur-3xl transition-all duration-300"
        style={{
          background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="relative mb-12">
              <div className="w-32 h-32 mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-spin opacity-75 blur-sm" />
                <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                  <Network className="h-16 w-16 text-purple-400" />
                </div>
              </div>
              <h1 className="text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 animate-pulse">
                CHAIN CHAPTER
              </h1>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                Elevate Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  Web3 Vision
                </span>
              </h2>
              <p className="text-xl lg:text-2xl text-gray-300 font-light">
                Your Home in Web3. <span className="text-purple-400">Join the Revolution.</span>
              </p>
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold px-12 py-6 text-xl rounded-full transform hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)]"
            >
              <Sparkles className="mr-3 h-6 w-6" />
              Enter the Future
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </section>

        {/* About Section */}
        {/* ... same as before ... */}

        {/* Community Section */}
        {/* ... same as before ... */}

        {/* Call to Action Footer */}
        <footer className="py-20 px-4 bg-gradient-to-r from-black via-purple-950 to-black border-t border-purple-500/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight">
              Step into the Future with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                Chain Chapter
              </span>
            </h2>

            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-12" />

            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold px-16 py-8 text-2xl rounded-full transform hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:shadow-[0_0_60px_rgba(139,92,246,0.8)] mb-12"
            >
              Join Chain Chapter
              <ArrowRight className="ml-4 h-8 w-8" />
            </Button>

            {/* Social Links */}
            <div className="flex justify-center space-x-8">
              <a
                href="https://discord.gg/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                >
                  <MessageCircle className="h-6 w-6 mr-2" />
                  Discord
                </Button>
              </a>

              <a
                href="https://x.com/Rudraps_2005"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/20"
                >
                  <Twitter className="h-6 w-6 mr-2" />
                  Twitter
                </Button>
              </a>

              <a
                href="https://github.com/Rudra-rps"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                >
                  <Github className="h-6 w-6 mr-2" />
                  GitHub
                </Button>
              </a>

              <a
                href="https://www.linkedin.com/in/rudra-pratap-singh-4471b9350/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/20"
                >
                  <Linkedin className="h-6 w-6 mr-2" />
                  LinkedIn
                </Button>
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-purple-800/30">
              <p className="text-gray-500 text-sm">
                © 2025 Chain Chapter. Building the decentralized future, one block at a time.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

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
              {/* Node connections */}
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
              {/* Node */}
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
            {/* Logo */}
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
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                What is{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  Chain Chapter?
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8" />
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                A student-driven society exploring blockchain, DeFi, NFTs, DAOs, and decentralized futures. We're
                building the next generation of Web3 innovators.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-purple-500/30">
                  <Code className="h-10 w-10 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Blockchain Development</h3>
                <p className="text-gray-400">Smart contracts, dApps, and protocol development</p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-cyan-500/30">
                  <Cpu className="h-10 w-10 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">DeFi Innovation</h3>
                <p className="text-gray-400">Decentralized finance protocols and yield strategies</p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-purple-500/30">
                  <Network className="h-10 w-10 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">DAO Governance</h3>
                <p className="text-gray-400">Decentralized autonomous organization structures</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Why{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  Join Us?
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30 backdrop-blur-sm hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300 group cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                    Learn Web3 Tech
                  </h3>
                  <p className="text-gray-400">
                    Master blockchain development, smart contracts, and decentralized technologies through hands-on
                    workshops and mentorship.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-900/20 to-black border-cyan-500/30 backdrop-blur-sm hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300 group cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                    Collaborate on Projects
                  </h3>
                  <p className="text-gray-400">
                    Work with like-minded innovators on cutting-edge Web3 projects, from DeFi protocols to NFT
                    marketplaces.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30 backdrop-blur-sm hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300 group cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                    Be Part of the Revolution
                  </h3>
                  <p className="text-gray-400">
                    Shape the future of decentralized technology and be at the forefront of the Web3 revolution.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Events & Projects */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Events &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  Projects
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto" />
            </div>

            {/* Upcoming Events */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Upcoming Events</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {events.map((event, index) => (
                  <Card
                    key={index}
                    className="bg-black/50 border-purple-500/30 backdrop-blur-sm hover:border-purple-400/60 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                          {event.type}
                        </Badge>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {event.date}
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">{event.title}</h4>
                      <p className="text-gray-400 text-sm">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Active Projects */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Active Projects</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <Card
                    key={index}
                    className="bg-black/50 border-purple-500/30 backdrop-blur-sm hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-300 group"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                          {project.title}
                        </h4>
                        <Badge
                          variant="outline"
                          className={`border-purple-500/50 text-purple-400 bg-gradient-to-r ${project.glow} bg-clip-text text-transparent`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-gray-400 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="bg-purple-900/30 text-purple-300 border-purple-500/30"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="relative">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                A{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  Decentralized
                </span>{" "}
                Community
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8" />
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                We collaborate, innovate, and shape the future of Web3 together. Join a community of builders, dreamers,
                and revolutionaries.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">500+</div>
                <div className="text-gray-400">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">50+</div>
                <div className="text-gray-400">Projects Built</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">100+</div>
                <div className="text-gray-400">Events Hosted</div>
              </div>
            </div>
          </div>
        </section>

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

            <div className="flex justify-center space-x-8">
              <Button
                variant="ghost"
                size="lg"
                className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
              >
                <MessageCircle className="h-6 w-6 mr-2" />
                Discord
              </Button>
              <Button variant="ghost" size="lg" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/20">
                <Twitter className="h-6 w-6 mr-2" />
                Twitter
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
              >
                <Github className="h-6 w-6 mr-2" />
                GitHub
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-purple-800/30">
              <p className="text-gray-500 text-sm">
                © 2024 Chain Chapter. Building the decentralized future, one block at a time.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

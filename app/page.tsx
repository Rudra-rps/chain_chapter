"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Bell } from "lucide-react"
import { Radar, BarChart3, Shield, Eye, Zap, BookOpen, Github, Twitter, Linkedin } from "lucide-react"
import { MainDashboard } from "@/components/main-dashboard"

export default function BlackSwanSentinel() {
  const [workMode, setWorkMode] = useState(false)
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [showDashboard, setShowDashboard] = useState(false)

  const newsItems = [
    "Fed signals aggressive rate hikes • RISK: Market volatility +40%",
    "Geopolitical tensions escalate • RISK: Oil price surge imminent",
    "Major bank reports liquidity issues • RISK: Credit crunch warning",
    "Inflation hits 40-year high • RISK: Consumer spending collapse",
    "Supply chain disruptions worsen • RISK: Manufacturing slowdown",
  ]

  if (showDashboard) {
    return <MainDashboard onBack={() => setShowDashboard(false)} />
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
        workMode
          ? "bg-gradient-to-br from-red-950 via-black to-red-900"
          : "bg-gradient-to-br from-gray-950 via-black to-gray-900"
      }`}
    >
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-4 sm:top-10 left-4 sm:left-10 w-2 sm:w-3 h-2 sm:h-3 bg-[#98B89F] rounded-full animate-pulse" />
        <div className="absolute top-16 sm:top-32 right-8 sm:right-20 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#98B89F] rounded-full animate-pulse delay-1000" />
        <div className="absolute top-32 sm:top-64 left-1/4 w-2 sm:w-4 h-2 sm:h-4 bg-[#98B89F] rounded-full animate-pulse delay-2000" />
        <div className="absolute bottom-48 sm:bottom-96 right-1/3 w-2 sm:w-3 h-2 sm:h-3 bg-[#98B89F] rounded-full animate-pulse delay-3000" />
        <div className="absolute bottom-32 sm:bottom-64 left-8 sm:left-16 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#98B89F] rounded-full animate-pulse delay-4000" />
        <div className="absolute top-1/2 right-4 sm:right-10 w-2 sm:w-3 h-2 sm:h-3 bg-[#98B89F] rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-16 sm:bottom-32 right-1/4 w-2 sm:w-4 h-2 sm:h-4 bg-[#98B89F] rounded-full animate-pulse delay-1500" />
        <div className="absolute top-8 sm:top-20 left-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#98B89F] rounded-full animate-pulse delay-2500" />
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "20px 20px", // Smaller pattern on mobile
          }}
        />
      </div>

      {/* Work Mode Pulse Effect */}
      {workMode && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 border-2 sm:border-4 border-red-500 animate-pulse opacity-50" />
        </div>
      )}

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8 sm:py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-wider leading-tight">
                  THE CHAIN
                  <br />
                  <span className="text-[#98B89F] drop-shadow-[0_0_20px_rgba(152,184,159,0.5)]">CHAPTER</span>
                </h1>
                <div className="w-24 sm:w-32 h-1 bg-white transform -skew-x-12 mx-auto lg:mx-0" />
              </div>

              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-light leading-relaxed text-center lg:text-left">
                Decentralised Dreams,
                <br />
                <span className="text-[#98B89F]">United we build.</span>
              </p>
            </div>

            <div className="relative">
              <div className="w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-[#98B89F]/20 to-transparent rounded-lg backdrop-blur-sm border border-[#98B89F]/30 flex items-center justify-center relative overflow-hidden">
                {/* Blockchain nodes background effect */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-4 sm:top-8 left-4 sm:left-8 w-2 sm:w-3 h-2 sm:h-3 bg-[#98B89F] rounded-full animate-pulse" />
                  <div className="absolute top-8 sm:top-16 right-6 sm:right-12 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#98B89F]/70 rounded-full animate-pulse delay-500" />
                  <div className="absolute bottom-10 sm:bottom-20 left-8 sm:left-16 w-2.5 sm:w-4 h-2.5 sm:h-4 bg-[#98B89F] rounded-full animate-pulse delay-1000" />
                  <div className="absolute bottom-6 sm:bottom-12 right-4 sm:right-8 w-2 sm:w-3 h-2 sm:h-3 bg-[#98B89F]/80 rounded-full animate-pulse delay-1500" />
                  <div className="absolute top-1/2 left-2 sm:left-4 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#98B89F] rounded-full animate-pulse delay-2000" />
                  <div className="absolute top-1/3 right-2 sm:right-4 w-2 sm:w-3 h-2 sm:h-3 bg-[#98B89F]/60 rounded-full animate-pulse delay-2500" />

                  {/* Connection lines between nodes */}
                  <svg className="absolute inset-0 w-full h-full">
                    <line
                      x1="15%"
                      y1="20%"
                      x2="35%"
                      y2="45%"
                      stroke="#98B89F"
                      strokeWidth="1"
                      opacity="0.4"
                      strokeDasharray="3,3"
                      className="animate-pulse"
                    />
                    <line
                      x1="85%"
                      y1="25%"
                      x2="65%"
                      y2="55%"
                      stroke="#98B89F"
                      strokeWidth="1"
                      opacity="0.4"
                      strokeDasharray="3,3"
                      className="animate-pulse delay-1000"
                    />
                    <line
                      x1="35%"
                      y1="75%"
                      x2="15%"
                      y2="50%"
                      stroke="#98B89F"
                      strokeWidth="1"
                      opacity="0.4"
                      strokeDasharray="3,3"
                      className="animate-pulse delay-2000"
                    />
                    <line
                      x1="85%"
                      y1="80%"
                      x2="85%"
                      y="35%"
                      stroke="#98B89F"
                      strokeWidth="1"
                      opacity="0.4"
                      strokeDasharray="3,3"
                      className="animate-pulse delay-1500"
                    />
                  </svg>
                </div>

                {/* Main logo with enhanced effects */}
                <div className="relative z-10">
                  <div className="relative group">
                    {/* Glow effect behind logo */}
                    <div className="absolute inset-0 bg-[#98B89F]/20 rounded-full blur-xl scale-150 group-hover:scale-175 transition-transform duration-500" />

                    <img
                      src="/chain-chapter-logo.png"
                      alt="Chain Chapter Logo"
                      className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain relative z-10 drop-shadow-[0_0_30px_rgba(152,184,159,0.8)] hover:scale-110 transition-all duration-500 group-hover:drop-shadow-[0_0_50px_rgba(152,184,159,1)]"
                    />

                    {/* Rotating ring effect around logo */}
                    <div
                      className="absolute inset-0 border-2 border-[#98B89F]/30 rounded-full animate-spin"
                      style={{ animationDuration: "20s" }}
                    />
                    <div
                      className="absolute inset-2 border border-[#98B89F]/20 rounded-full animate-spin"
                      style={{ animationDuration: "15s", animationDirection: "reverse" }}
                    />
                  </div>
                </div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#98B89F] rounded-full animate-bounce delay-300" />
                  <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-[#98B89F] rounded-full animate-bounce delay-700" />
                  <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-[#98B89F] rounded-full animate-bounce delay-1100" />
                  <div className="absolute bottom-1/4 right-1/6 w-1 h-1 bg-[#98B89F] rounded-full animate-bounce delay-1400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              What's Under the<span className="text-[#98B89F]"> Hood!!</span>
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-[#98B89F] mx-auto transform -skew-x-12" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-[#98B89F]/20 to-transparent rounded-full border-2 border-[#98B89F]/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Radar className="h-10 w-10 sm:h-12 sm:w-12 text-[#98B89F]" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-[#98B89F] rounded-full flex items-center justify-center text-black font-bold text-xs sm:text-sm">
                  1
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Learn Web3 Tech</h3>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-[#98B89F]/20 to-transparent rounded-full border-2 border-[#98B89F]/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-10 w-10 sm:h-12 sm:w-12 text-[#98B89F]" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-[#98B89F] rounded-full flex items-center justify-center text-black font-bold text-xs sm:text-sm">
                  2
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Collaborate on Projects</h3>
            </div>

            <div className="text-center group sm:col-span-2 md:col-span-1">
              <div className="relative mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-[#98B89F]/20 to-transparent rounded-full border-2 border-[#98B89F]/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-[#98B89F]" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-[#98B89F] rounded-full flex items-center justify-center text-black font-bold text-xs sm:text-sm">
                  3
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Be Part of the Revolution</h3>
            </div>
          </div>
        </section>

        {/* Events and Projects Section */}
        <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Events & <span className="text-[#98B89F]">Projects</span>
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-[#98B89F] mx-auto transform -skew-x-12" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <Card
              className={`bg-black/50 border-[#98B89F]/30 backdrop-blur-sm hover:border-[#98B89F]/60 hover:bg-[#98B89F]/5 transition-all duration-300 group cursor-pointer ${
                activeFeature === "hackathon" ? "border-[#98B89F] bg-[#98B89F]/10" : ""
              }`}
              onClick={() => setActiveFeature(activeFeature === "hackathon" ? null : "hackathon")}
            >
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-br from-[#98B89F]/20 to-transparent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-[#98B89F]" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#98B89F] transition-colors">
                  Hackathon
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  48-hour blockchain development competition with prizes and mentorship opportunities.
                </p>
              </CardContent>
            </Card>

            <Card
              className={`bg-black/50 border-[#98B89F]/30 backdrop-blur-sm hover:border-[#98B89F]/60 hover:bg-[#98B89F]/5 transition-all duration-300 group cursor-pointer ${
                activeFeature === "workshops" ? "border-[#98B89F] bg-[#98B89F]/10" : ""
              }`}
              onClick={() => setActiveFeature(activeFeature === "workshops" ? null : "workshops")}
            >
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-br from-[#98B89F]/20 to-transparent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-[#98B89F]" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#98B89F] transition-colors">
                  Workshops
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Hands-on learning sessions covering smart contracts, DeFi, and Web3 development.
                </p>
              </CardContent>
            </Card>

            <Card
              className={`bg-black/50 border-[#98B89F]/30 backdrop-blur-sm hover:border-[#98B89F]/60 hover:bg-[#98B89F]/5 transition-all duration-300 group cursor-pointer sm:col-span-2 md:col-span-1 ${
                activeFeature === "project" ? "border-[#98B89F] bg-[#98B89F]/10" : ""
              }`}
              onClick={() => setActiveFeature(activeFeature === "project" ? null : "project")}
            >
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-br from-[#98B89F]/20 to-transparent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-[#98B89F]" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#98B89F] transition-colors">
                  Project
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Collaborative blockchain projects building the future of decentralized technology.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Work Mode Toggle */}
        <div className="container mx-auto px-4 mb-6 sm:mb-8">
          <Card className="bg-black/50 border-red-500/30 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Bell
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${workMode ? "text-red-500 animate-pulse" : "text-gray-400"}`}
                  />
                  <span className="text-white font-semibold text-sm sm:text-base">Work Mode</span>
                </div>
                <Switch checked={workMode} onCheckedChange={setWorkMode} className="data-[state=checked]:bg-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* News Ticker */}
        <div className="container mx-auto px-4 pb-8 sm:pb-12">
          <Card className="bg-black/50 border-[#98B89F]/30 backdrop-blur-sm">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="text-white flex items-center space-x-2 text-sm sm:text-base">
                <span>📈</span>
                <span>Live Market Intelligence</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-hidden">
                <div className="animate-scroll whitespace-nowrap">
                  {newsItems.map((item, index) => (
                    <span key={index} className="inline-block text-[#98B89F] mx-4 sm:mx-8 text-xs sm:text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call-to-Action Footer */}
        <footer className="bg-gradient-to-r from-black via-gray-900 to-black border-t border-[#98B89F]/30">
          <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
                Step into the Future with{" "}
                <span className="text-[#98B89F] drop-shadow-[0_0_20px_rgba(152,184,159,0.5)]">Chain Chapter</span>
              </h2>

              <div className="w-24 sm:w-32 h-1 bg-[#98B89F] mx-auto transform -skew-x-12 mb-6 sm:mb-8" />

              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
                Join thousands of innovators who are already building the decentralized future with blockchain
                technology and Web3 solutions.
              </p>

              <Button
                size="lg"
                className="bg-[#98B89F] hover:bg-[#7a9681] text-black font-bold px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl transform hover:scale-105 transition-all duration-200 shadow-[0_0_30px_rgba(152,184,159,0.4)] hover:shadow-[0_0_40px_rgba(152,184,159,0.6)]"
              >
                Join the Revolution →
              </Button>

              <div className="mt-12 sm:mt-16 mb-8 sm:mb-12">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">About Us</h3>
                <p className="text-sm sm:text-base text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                  Chain Chapter is a community-driven platform dedicated to advancing blockchain education and fostering
                  collaboration in the Web3 ecosystem. We bring together developers, innovators, and visionaries to
                  build the decentralized future through hands-on learning, collaborative projects, and cutting-edge
                  technology.
                </p>
              </div>

              <div className="mb-8 sm:mb-12">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Connect With Us</h4>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
                  <a
                    href="https://github.com/Rudra-rps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-2 text-gray-400 hover:text-[#98B89F] transition-colors duration-200"
                  >
                    <Github className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium text-sm sm:text-base">GitHub</span>
                  </a>
                  <a
                    href="https://twitter.com/Rudraps_2005"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-2 text-gray-400 hover:text-[#98B89F] transition-colors duration-200"
                  >
                    <Twitter className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium text-sm sm:text-base">X (Twitter)</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rudra-pratap-singh-4471b9350/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-2 text-gray-400 hover:text-[#98B89F] transition-colors duration-200"
                  >
                    <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium text-sm sm:text-base">LinkedIn</span>
                  </a>
                </div>
              </div>

              <div className="pt-6 sm:pt-8 border-t border-gray-800">
                <p className="text-gray-500 text-xs sm:text-sm px-4">
                  © 2025 Chain Chapter. Building the decentralized future, one block at a time.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  )
}

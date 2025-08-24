"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Filter, RefreshCw, ExternalLink, TrendingUp, AlertTriangle } from "lucide-react"

interface PolicyUpdate {
  id: string
  title: string
  summary: string
  category: "monetary" | "fiscal" | "regulatory" | "trade" | "environmental"
  severity: "low" | "medium" | "high" | "critical"
  source: string
  publishedAt: string
  impactScore: number
  affectedSectors: string[]
  region: string
  url: string
  sentiment: "positive" | "negative" | "neutral"
}

export function PolicyWatch() {
  const [updates, setUpdates] = useState<PolicyUpdate[]>([])
  const [filteredUpdates, setFilteredUpdates] = useState<PolicyUpdate[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "monetary", label: "Monetary Policy" },
    { value: "fiscal", label: "Fiscal Policy" },
    { value: "regulatory", label: "Regulatory" },
    { value: "trade", label: "Trade Policy" },
    { value: "environmental", label: "Environmental" },
  ]

  const severityLevels = [
    { value: "all", label: "All Severity" },
    { value: "critical", label: "Critical" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ]

  const fetchPolicyUpdates = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock policy updates - replace with real API
    const mockUpdates: PolicyUpdate[] = [
      {
        id: "1",
        title: "Federal Reserve Signals Aggressive Rate Hikes Through 2024",
        summary:
          "Fed Chair Powell indicates potential for 75bp increases in upcoming meetings to combat persistent inflation, signaling a more hawkish stance than previously anticipated.",
        category: "monetary",
        severity: "critical",
        source: "Federal Reserve",
        publishedAt: "2024-01-15T10:30:00Z",
        impactScore: 95,
        affectedSectors: ["Banking", "Real Estate", "Technology", "Consumer Discretionary"],
        region: "United States",
        url: "#",
        sentiment: "negative",
      },
      {
        id: "2",
        title: "EU Implements New Digital Asset Regulation Framework",
        summary:
          "Markets in Crypto-Assets (MiCA) regulation comes into effect, establishing comprehensive rules for cryptocurrency operations across European Union member states.",
        category: "regulatory",
        severity: "high",
        source: "European Securities and Markets Authority",
        publishedAt: "2024-01-14T14:20:00Z",
        impactScore: 78,
        affectedSectors: ["Cryptocurrency", "Financial Services", "Technology"],
        region: "European Union",
        url: "#",
        sentiment: "neutral",
      },
      {
        id: "3",
        title: "China Announces $500B Infrastructure Stimulus Package",
        summary:
          "Beijing unveils massive infrastructure spending program focused on renewable energy, transportation, and digital infrastructure to boost economic growth.",
        category: "fiscal",
        severity: "high",
        source: "State Council of China",
        publishedAt: "2024-01-14T08:45:00Z",
        impactScore: 82,
        affectedSectors: ["Infrastructure", "Materials", "Energy", "Technology"],
        region: "China",
        url: "#",
        sentiment: "positive",
      },
      {
        id: "4",
        title: "US-EU Trade Agreement on Critical Minerals Finalized",
        summary:
          "New bilateral agreement reduces tariffs on lithium, cobalt, and rare earth elements, aimed at securing supply chains for clean energy transition.",
        category: "trade",
        severity: "medium",
        source: "US Trade Representative",
        publishedAt: "2024-01-13T16:15:00Z",
        impactScore: 65,
        affectedSectors: ["Mining", "Energy", "Automotive", "Technology"],
        region: "Global",
        url: "#",
        sentiment: "positive",
      },
      {
        id: "5",
        title: "Bank of Japan Maintains Ultra-Low Interest Rates",
        summary:
          "BoJ keeps benchmark rate at -0.1% despite global tightening trend, citing concerns over economic recovery and deflationary pressures.",
        category: "monetary",
        severity: "medium",
        source: "Bank of Japan",
        publishedAt: "2024-01-13T12:00:00Z",
        impactScore: 58,
        affectedSectors: ["Banking", "Currency", "Export Industries"],
        region: "Japan",
        url: "#",
        sentiment: "neutral",
      },
      {
        id: "6",
        title: "SEC Proposes Enhanced Climate Risk Disclosure Rules",
        summary:
          "New regulations would require public companies to disclose detailed climate-related risks and greenhouse gas emissions in annual reports.",
        category: "regulatory",
        severity: "medium",
        source: "Securities and Exchange Commission",
        publishedAt: "2024-01-12T11:30:00Z",
        impactScore: 72,
        affectedSectors: ["Energy", "Utilities", "Manufacturing", "Transportation"],
        region: "United States",
        url: "#",
        sentiment: "neutral",
      },
    ]

    setUpdates(mockUpdates)
    setFilteredUpdates(mockUpdates)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchPolicyUpdates()
  }, [])

  useEffect(() => {
    let filtered = updates

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (update) =>
          update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          update.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
          update.affectedSectors.some((sector) => sector.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((update) => update.category === categoryFilter)
    }

    // Apply severity filter
    if (severityFilter !== "all") {
      filtered = filtered.filter((update) => update.severity === severityFilter)
    }

    setFilteredUpdates(filtered)
  }, [updates, searchTerm, categoryFilter, severityFilter])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      default:
        return "bg-green-500"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case "negative":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-400" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <Card className="bg-black/50 border-[#98B89F]/30 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center space-x-2">
            <span>👁️</span>
            <span>Policy Watch</span>
          </CardTitle>
          <Button
            onClick={fetchPolicyUpdates}
            disabled={isLoading}
            size="sm"
            className="bg-[#98B89F]/20 hover:bg-[#98B89F]/30 text-[#98B89F] border border-[#98B89F]/30"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-[#98B89F]/30 text-white"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="bg-black/50 border-[#98B89F]/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-black border-[#98B89F]/30">
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="bg-black/50 border-[#98B89F]/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-black border-[#98B89F]/30">
              {severityLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="text-sm text-gray-400 flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            {filteredUpdates.length} updates
          </div>
        </div>

        {/* Policy Updates Feed */}
        <ScrollArea className="h-96">
          <div className="space-y-4 pr-4">
            {filteredUpdates.map((update) => (
              <Card
                key={update.id}
                className="bg-black/30 border-[#98B89F]/20 hover:border-[#98B89F]/40 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(update.severity)}`} />
                      <div>
                        <h4 className="text-white font-medium text-sm leading-tight">{update.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {update.category}
                          </Badge>
                          <span className="text-xs text-gray-500">{update.source}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{formatDate(update.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getSentimentIcon(update.sentiment)}
                      <div className="text-right">
                        <div className="text-sm font-semibold text-[#98B89F]">{update.impactScore}</div>
                        <div className="text-xs text-gray-400">Impact</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-3 leading-relaxed">{update.summary}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {update.affectedSectors.slice(0, 3).map((sector, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {sector}
                        </Badge>
                      ))}
                      {update.affectedSectors.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{update.affectedSectors.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{update.region}</span>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#98B89F]/20">
          <div className="text-center">
            <div className="text-lg font-bold text-red-400">
              {filteredUpdates.filter((u) => u.severity === "critical").length}
            </div>
            <div className="text-xs text-gray-400">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-400">
              {filteredUpdates.filter((u) => u.severity === "high").length}
            </div>
            <div className="text-xs text-gray-400">High</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-[#98B89F]">
              {Math.round(filteredUpdates.reduce((sum, u) => sum + u.impactScore, 0) / filteredUpdates.length) || 0}
            </div>
            <div className="text-xs text-gray-400">Avg Impact</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">
              {new Set(filteredUpdates.flatMap((u) => u.affectedSectors)).size}
            </div>
            <div className="text-xs text-gray-400">Sectors</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { BookOpen, AlertCircle, CheckCircle, Clock } from "lucide-react"

interface DefenseStrategy {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  timeframe: string
  difficulty: number
  effectiveness: number
  category: "immediate" | "short-term" | "long-term"
  steps: string[]
  risks: string[]
  benefits: string[]
  status: "pending" | "in-progress" | "completed"
}

interface PlaybookScenario {
  id: string
  name: string
  riskLevel: number
  strategies: DefenseStrategy[]
}

export function DefensePlaybooks() {
  const [selectedScenario, setSelectedScenario] = useState("market_crash")
  const [playbook, setPlaybook] = useState<PlaybookScenario | null>(null)
  const [filter, setFilter] = useState("all")
  const [isGenerating, setIsGenerating] = useState(false)

  const scenarios = [
    { id: "market_crash", name: "Market Crash", riskLevel: 85 },
    { id: "inflation_spike", name: "Hyperinflation", riskLevel: 70 },
    { id: "currency_collapse", name: "Currency Collapse", riskLevel: 90 },
    { id: "banking_crisis", name: "Banking Crisis", riskLevel: 75 },
    { id: "supply_chain", name: "Supply Chain Crisis", riskLevel: 60 },
  ]

  const generatePlaybook = async (scenarioId: string) => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock AI-generated strategies based on scenario
    const mockStrategies: DefenseStrategy[] = [
      {
        id: "1",
        title: "Emergency Cash Position",
        description: "Build immediate liquidity buffer to weather the storm",
        priority: "high",
        timeframe: "24-48 hours",
        difficulty: 20,
        effectiveness: 85,
        category: "immediate",
        steps: [
          "Liquidate 20-30% of equity positions",
          "Move funds to high-yield savings or money market",
          "Maintain 6-12 months of expenses in cash",
          "Set up emergency credit lines",
        ],
        risks: ["Opportunity cost", "Inflation erosion"],
        benefits: ["Immediate liquidity", "Reduced volatility", "Peace of mind"],
        status: "pending",
      },
      {
        id: "2",
        title: "Defensive Asset Rotation",
        description: "Shift portfolio to defensive assets and sectors",
        priority: "high",
        timeframe: "1-2 weeks",
        difficulty: 60,
        effectiveness: 75,
        category: "short-term",
        steps: [
          "Increase allocation to consumer staples",
          "Add utilities and healthcare exposure",
          "Consider gold and precious metals (5-10%)",
          "Reduce cyclical and growth stock exposure",
        ],
        risks: ["Sector concentration", "Timing risk"],
        benefits: ["Lower volatility", "Dividend income", "Inflation hedge"],
        status: "pending",
      },
      {
        id: "3",
        title: "Options Hedging Strategy",
        description: "Implement protective puts and collar strategies",
        priority: "medium",
        timeframe: "1 week",
        difficulty: 80,
        effectiveness: 70,
        category: "short-term",
        steps: [
          "Buy protective puts on major holdings",
          "Implement collar strategies on large positions",
          "Consider VIX calls for volatility protection",
          "Set up systematic hedging rules",
        ],
        risks: ["Premium costs", "Complexity", "Timing sensitivity"],
        benefits: ["Downside protection", "Maintain upside", "Volatility hedge"],
        status: "pending",
      },
      {
        id: "4",
        title: "Geographic Diversification",
        description: "Spread risk across global markets and currencies",
        priority: "medium",
        timeframe: "2-4 weeks",
        difficulty: 50,
        effectiveness: 65,
        category: "long-term",
        steps: [
          "Increase international equity allocation",
          "Add emerging market exposure",
          "Consider foreign currency positions",
          "Invest in global REITs",
        ],
        risks: ["Currency risk", "Political risk", "Correlation increase in crisis"],
        benefits: ["Risk diversification", "Currency hedge", "Growth opportunities"],
        status: "pending",
      },
      {
        id: "5",
        title: "Alternative Investment Allocation",
        description: "Add uncorrelated assets to reduce portfolio risk",
        priority: "low",
        timeframe: "1-3 months",
        difficulty: 70,
        effectiveness: 60,
        category: "long-term",
        steps: [
          "Allocate 10-15% to commodities",
          "Consider private equity or hedge funds",
          "Add cryptocurrency exposure (2-5%)",
          "Invest in infrastructure or farmland",
        ],
        risks: ["Liquidity constraints", "High fees", "Complexity"],
        benefits: ["Diversification", "Inflation protection", "Uncorrelated returns"],
        status: "pending",
      },
    ]

    const scenario = scenarios.find((s) => s.id === scenarioId)
    setPlaybook({
      id: scenarioId,
      name: scenario?.name || "",
      riskLevel: scenario?.riskLevel || 0,
      strategies: mockStrategies,
    })

    setIsGenerating(false)
  }

  useEffect(() => {
    generatePlaybook(selectedScenario)
  }, [selectedScenario])

  const updateStrategyStatus = (strategyId: string, status: DefenseStrategy["status"]) => {
    if (!playbook) return

    const updatedStrategies = playbook.strategies.map((strategy) =>
      strategy.id === strategyId ? { ...strategy, status } : strategy,
    )

    setPlaybook({ ...playbook, strategies: updatedStrategies })
  }

  const filteredStrategies =
    playbook?.strategies.filter((strategy) => {
      if (filter === "all") return true
      if (filter === "priority") return strategy.priority === "high"
      return strategy.category === filter
    }) || []

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      default:
        return "bg-green-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-400" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <Card className="bg-black/50 border-[#98B89F]/30 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center space-x-2">
            <span>📘</span>
            <span>AI Defense Playbooks</span>
          </CardTitle>
          <Button
            onClick={() => generatePlaybook(selectedScenario)}
            disabled={isGenerating}
            size="sm"
            className="bg-[#98B89F]/20 hover:bg-[#98B89F]/30 text-[#98B89F] border border-[#98B89F]/30"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            {isGenerating ? "Generating..." : "Regenerate"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scenario Selection */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Crisis Scenario</label>
            <Select value={selectedScenario} onValueChange={setSelectedScenario}>
              <SelectTrigger className="bg-black/50 border-[#98B89F]/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-[#98B89F]/30">
                {scenarios.map((scenario) => (
                  <SelectItem key={scenario.id} value={scenario.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{scenario.name}</span>
                      <Badge variant="destructive" className="ml-2">
                        {scenario.riskLevel}%
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Filter Strategies</label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="bg-black/50 border-[#98B89F]/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-[#98B89F]/30">
                <SelectItem value="all">All Strategies</SelectItem>
                <SelectItem value="priority">High Priority</SelectItem>
                <SelectItem value="immediate">Immediate Actions</SelectItem>
                <SelectItem value="short-term">Short-term</SelectItem>
                <SelectItem value="long-term">Long-term</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Playbook Overview */}
        {playbook && (
          <div className="p-4 bg-gradient-to-r from-[#98B89F]/10 to-transparent rounded-lg border border-[#98B89F]/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">{playbook.name} Defense Playbook</h3>
              <Badge variant="destructive">Risk Level: {playbook.riskLevel}%</Badge>
            </div>
            <p className="text-gray-300 text-sm">
              AI-generated strategies tailored for {playbook.name.toLowerCase()} scenarios. Prioritized by effectiveness
              and implementation difficulty.
            </p>
          </div>
        )}

        {/* Strategy Cards */}
        <div className="space-y-4">
          {filteredStrategies.map((strategy) => (
            <Card key={strategy.id} className="bg-black/30 border-[#98B89F]/20">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(strategy.priority)}`} />
                    <div>
                      <h4 className="text-white font-semibold">{strategy.title}</h4>
                      <p className="text-gray-400 text-sm">{strategy.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(strategy.status)}
                    <Badge variant="outline" className="text-xs">
                      {strategy.timeframe}
                    </Badge>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Effectiveness</span>
                      <span className="text-[#98B89F]">{strategy.effectiveness}%</span>
                    </div>
                    <Progress value={strategy.effectiveness} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Difficulty</span>
                      <span className="text-yellow-400">{strategy.difficulty}%</span>
                    </div>
                    <Progress value={strategy.difficulty} className="h-2" />
                  </div>
                </div>

                {/* Implementation Steps */}
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-white mb-2">Implementation Steps:</h5>
                    <ul className="space-y-1">
                      {strategy.steps.map((step, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start">
                          <span className="text-[#98B89F] mr-2">{index + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-green-400 mb-1">Benefits:</h5>
                      <ul className="space-y-1">
                        {strategy.benefits.map((benefit, index) => (
                          <li key={index} className="text-xs text-gray-400">
                            • {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-red-400 mb-1">Risks:</h5>
                      <ul className="space-y-1">
                        {strategy.risks.map((risk, index) => (
                          <li key={index} className="text-xs text-gray-400">
                            • {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-4">
                  <Button
                    size="sm"
                    onClick={() => updateStrategyStatus(strategy.id, "in-progress")}
                    disabled={strategy.status === "completed"}
                    className="bg-[#98B89F]/20 hover:bg-[#98B89F]/30 text-[#98B89F] border border-[#98B89F]/30"
                  >
                    Start Implementation
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStrategyStatus(strategy.id, "completed")}
                    disabled={strategy.status === "completed"}
                    className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                  >
                    Mark Complete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

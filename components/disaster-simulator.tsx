"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Play, AlertTriangle } from "lucide-react"

interface PortfolioItem {
  asset: string
  allocation: number
  currentValue: number
}

interface SimulationResult {
  scenario: string
  timeframe: string
  totalLoss: number
  recoveryTime: number
  impactByAsset: { asset: string; loss: number }[]
  timeline: { month: number; portfolioValue: number }[]
}

export function DisasterSimulator() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([
    { asset: "Stocks", allocation: 60, currentValue: 600000 },
    { asset: "Bonds", allocation: 30, currentValue: 300000 },
    { asset: "Real Estate", allocation: 10, currentValue: 100000 },
  ])
  const [selectedScenario, setSelectedScenario] = useState("")
  const [severity, setSeverity] = useState([70])
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)

  const scenarios = [
    { id: "market_crash", name: "Market Crash", description: "30-50% equity decline" },
    { id: "inflation_spike", name: "Hyperinflation", description: "15%+ inflation rate" },
    { id: "currency_collapse", name: "Currency Collapse", description: "50%+ devaluation" },
    { id: "banking_crisis", name: "Banking Crisis", description: "Credit freeze" },
    { id: "supply_chain", name: "Supply Chain Breakdown", description: "Global logistics failure" },
    { id: "cyber_attack", name: "Financial Cyber Attack", description: "System-wide disruption" },
  ]

  const runSimulation = async () => {
    if (!selectedScenario) return

    setIsSimulating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const scenario = scenarios.find((s) => s.id === selectedScenario)
    const severityMultiplier = severity[0] / 100

    // Mock simulation logic
    const baseLoss =
      {
        market_crash: 0.35,
        inflation_spike: 0.25,
        currency_collapse: 0.45,
        banking_crisis: 0.3,
        supply_chain: 0.2,
        cyber_attack: 0.15,
      }[selectedScenario] || 0.3

    const totalPortfolioValue = portfolio.reduce((sum, item) => sum + item.currentValue, 0)
    const adjustedLoss = baseLoss * severityMultiplier
    const totalLoss = totalPortfolioValue * adjustedLoss

    // Generate impact by asset
    const impactByAsset = portfolio.map((item) => ({
      asset: item.asset,
      loss: item.currentValue * adjustedLoss * (item.asset === "Stocks" ? 1.2 : item.asset === "Bonds" ? 0.6 : 1.0),
    }))

    // Generate recovery timeline
    const timeline = Array.from({ length: 24 }, (_, i) => ({
      month: i,
      portfolioValue: totalPortfolioValue * (1 - adjustedLoss + adjustedLoss * Math.min(i / 18, 1)),
    }))

    setSimulationResult({
      scenario: scenario?.name || "",
      timeframe: "24 months",
      totalLoss,
      recoveryTime: Math.ceil(18 * severityMultiplier),
      impactByAsset,
      timeline,
    })

    setIsSimulating(false)
  }

  const updatePortfolioItem = (index: number, field: keyof PortfolioItem, value: number) => {
    const newPortfolio = [...portfolio]
    newPortfolio[index] = { ...newPortfolio[index], [field]: value }
    setPortfolio(newPortfolio)
  }

  const addPortfolioItem = () => {
    setPortfolio([...portfolio, { asset: "New Asset", allocation: 0, currentValue: 0 }])
  }

  const totalValue = portfolio.reduce((sum, item) => sum + item.currentValue, 0)

  return (
    <Card className="bg-black/50 border-[#98B89F]/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <span>🧪</span>
          <span>Disaster Simulator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Portfolio Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Portfolio Configuration</h3>
            <Button
              onClick={addPortfolioItem}
              size="sm"
              className="bg-[#98B89F]/20 hover:bg-[#98B89F]/30 text-[#98B89F] border border-[#98B89F]/30"
            >
              Add Asset
            </Button>
          </div>

          <div className="grid gap-4">
            {portfolio.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-black/30 rounded-lg border border-[#98B89F]/20"
              >
                <div>
                  <Label className="text-sm text-gray-300">Asset</Label>
                  <Input
                    value={item.asset}
                    onChange={(e) => updatePortfolioItem(index, "asset", e.target.value as any)}
                    className="bg-black/50 border-[#98B89F]/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-300">Allocation %</Label>
                  <Input
                    type="number"
                    value={item.allocation}
                    onChange={(e) => updatePortfolioItem(index, "allocation", Number(e.target.value))}
                    className="bg-black/50 border-[#98B89F]/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-300">Value ($)</Label>
                  <Input
                    type="number"
                    value={item.currentValue}
                    onChange={(e) => updatePortfolioItem(index, "currentValue", Number(e.target.value))}
                    className="bg-black/50 border-[#98B89F]/30 text-white"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-right">
            <span className="text-[#98B89F] font-semibold">Total Portfolio Value: ${totalValue.toLocaleString()}</span>
          </div>
        </div>

        {/* Scenario Selection */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-300">Disaster Scenario</Label>
            <Select value={selectedScenario} onValueChange={setSelectedScenario}>
              <SelectTrigger className="bg-black/50 border-[#98B89F]/30 text-white">
                <SelectValue placeholder="Select scenario" />
              </SelectTrigger>
              <SelectContent className="bg-black border-[#98B89F]/30">
                {scenarios.map((scenario) => (
                  <SelectItem key={scenario.id} value={scenario.id}>
                    <div>
                      <div className="font-medium">{scenario.name}</div>
                      <div className="text-xs text-gray-400">{scenario.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-300">Severity Level: {severity[0]}%</Label>
            <Slider value={severity} onValueChange={setSeverity} max={100} min={10} step={10} className="w-full" />
          </div>
        </div>

        {/* Run Simulation */}
        <Button
          onClick={runSimulation}
          disabled={!selectedScenario || isSimulating}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          <Play className="mr-2 h-4 w-4" />
          {isSimulating ? "Running Simulation..." : "Run Stress Test"}
        </Button>

        {/* Results */}
        {simulationResult && (
          <div className="space-y-6 p-4 bg-red-900/20 rounded-lg border border-red-500/30">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <h3 className="text-lg font-semibold text-white">Simulation Results: {simulationResult.scenario}</h3>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-black/30 rounded-lg">
                <div className="text-2xl font-bold text-red-400">-${simulationResult.totalLoss.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Loss</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded-lg">
                <div className="text-2xl font-bold text-orange-400">
                  {((simulationResult.totalLoss / totalValue) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-400">Portfolio Impact</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">{simulationResult.recoveryTime}mo</div>
                <div className="text-sm text-gray-400">Recovery Time</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recovery Timeline */}
              <div>
                <h4 className="text-white font-medium mb-3">Recovery Timeline</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={simulationResult.timeline}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#98B89F" strokeOpacity={0.2} />
                      <XAxis dataKey="month" stroke="#98B89F" />
                      <YAxis stroke="#98B89F" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid #98B89F",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="portfolioValue"
                        stroke="#98B89F"
                        strokeWidth={2}
                        dot={{ fill: "#98B89F", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Impact by Asset */}
              <div>
                <h4 className="text-white font-medium mb-3">Impact by Asset</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={simulationResult.impactByAsset}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#98B89F" strokeOpacity={0.2} />
                      <XAxis dataKey="asset" stroke="#98B89F" />
                      <YAxis stroke="#98B89F" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid #98B89F",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="loss" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"
import { RefreshCw, ChevronDown } from "lucide-react"

interface RiskData {
  sector: string
  risk: number
  volatility: number
  trend: "up" | "down" | "stable"
  lastUpdate: string
}

interface RadarData {
  subject: string
  risk: number
  fullMark: 100
}

export function SwanRadar() {
  const [riskData, setRiskData] = useState<RiskData[]>([])
  const [radarData, setRadarData] = useState<RadarData[]>([])
  const [timeframe, setTimeframe] = useState("1d")
  const [riskThreshold, setRiskThreshold] = useState([70])
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSectorDropdown, setShowSectorDropdown] = useState(false)

  const sectors = ["Technology", "Finance", "Energy", "Healthcare", "Real Estate", "Commodities", "Crypto", "Bonds"]

  const fetchRiskData = async () => {
    setIsLoading(true)
    // Mock API call - replace with real endpoint
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockData: RiskData[] = [
      { sector: "Technology", risk: 85, volatility: 78, trend: "up", lastUpdate: "2 min ago" },
      { sector: "Finance", risk: 72, volatility: 65, trend: "down", lastUpdate: "1 min ago" },
      { sector: "Energy", risk: 68, volatility: 82, trend: "up", lastUpdate: "3 min ago" },
      { sector: "Healthcare", risk: 45, volatility: 38, trend: "stable", lastUpdate: "1 min ago" },
      { sector: "Real Estate", risk: 58, volatility: 55, trend: "down", lastUpdate: "4 min ago" },
      { sector: "Commodities", risk: 76, volatility: 88, trend: "up", lastUpdate: "2 min ago" },
      { sector: "Crypto", risk: 95, volatility: 92, trend: "up", lastUpdate: "30 sec ago" },
      { sector: "Bonds", risk: 25, volatility: 18, trend: "stable", lastUpdate: "5 min ago" },
    ]

    const filteredData =
      selectedSectors.length > 0 ? mockData.filter((item) => selectedSectors.includes(item.sector)) : mockData

    setRiskData(filteredData)

    const radarChartData = filteredData.map((item) => ({
      subject: item.sector,
      risk: item.risk,
      fullMark: 100,
    }))

    setRadarData(radarChartData)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchRiskData()
  }, [timeframe, selectedSectors])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSectorDropdown) {
        setShowSectorDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showSectorDropdown])

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return "bg-red-500"
    if (risk >= 60) return "bg-orange-500"
    if (risk >= 40) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getRiskLevel = (risk: number) => {
    if (risk >= 80) return "CRITICAL"
    if (risk >= 60) return "HIGH"
    if (risk >= 40) return "MEDIUM"
    return "LOW"
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "↗️"
      case "down":
        return "↘️"
      default:
        return "➡️"
    }
  }

  return (
    <Card className="bg-black/50 border-[#98B89F]/30 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center space-x-2">
            <span>🦢</span>
            <span>Swan Radar - Risk Heatmap</span>
          </CardTitle>
          <Button
            onClick={fetchRiskData}
            disabled={isLoading}
            size="sm"
            className="bg-[#98B89F]/20 hover:bg-[#98B89F]/30 text-[#98B89F] border border-[#98B89F]/30"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Timeframe</label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="bg-black/50 border-[#98B89F]/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-[#98B89F]/30">
                <SelectItem value="1h">1 Hour</SelectItem>
                <SelectItem value="1d">1 Day</SelectItem>
                <SelectItem value="1w">1 Week</SelectItem>
                <SelectItem value="1m">1 Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Risk Threshold: {riskThreshold[0]}%</label>
            <Slider value={riskThreshold} onValueChange={setRiskThreshold} max={100} step={5} className="w-full" />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Filter Sectors</label>
            <div className="relative">
              <Button
                variant="outline"
                className="w-full justify-between bg-black/50 border-[#98B89F]/30 text-white hover:bg-black/70"
                onClick={() => setShowSectorDropdown(!showSectorDropdown)}
              >
                {selectedSectors.length === 0
                  ? "All Sectors"
                  : selectedSectors.length === 1
                    ? selectedSectors[0]
                    : `${selectedSectors.length} sectors selected`}
                <ChevronDown className="h-4 w-4" />
              </Button>

              {showSectorDropdown && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-black border border-[#98B89F]/30 rounded-md shadow-lg max-h-60 overflow-auto">
                  <div className="p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-white hover:bg-[#98B89F]/20"
                      onClick={() => {
                        setSelectedSectors([])
                        setShowSectorDropdown(false)
                      }}
                    >
                      All Sectors
                    </Button>
                    {sectors.map((sector) => (
                      <Button
                        key={sector}
                        variant="ghost"
                        size="sm"
                        className={`w-full justify-start text-white hover:bg-[#98B89F]/20 ${
                          selectedSectors.includes(sector) ? "bg-[#98B89F]/20" : ""
                        }`}
                        onClick={() => {
                          setSelectedSectors((prev) =>
                            prev.includes(sector) ? prev.filter((s) => s !== sector) : [...prev, sector],
                          )
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-3 h-3 border border-[#98B89F] rounded ${
                              selectedSectors.includes(sector) ? "bg-[#98B89F]" : ""
                            }`}
                          />
                          <span>{sector}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#98B89F" strokeOpacity={0.3} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#98B89F", fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#98B89F", fontSize: 10 }} />
                <Radar
                  name="Risk Level"
                  dataKey="risk"
                  stroke="#98B89F"
                  fill="#98B89F"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Grid */}
          <div className="space-y-3">
            {riskData.map((item, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  item.risk >= riskThreshold[0]
                    ? "border-red-500/50 bg-red-500/10"
                    : "border-[#98B89F]/20 bg-[#98B89F]/5"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">{item.sector}</span>
                    <span className="text-lg">{getTrendIcon(item.trend)}</span>
                  </div>
                  <Badge
                    variant={item.risk >= 80 ? "destructive" : item.risk >= 60 ? "secondary" : "default"}
                    className="text-xs"
                  >
                    {getRiskLevel(item.risk)}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Risk Level</span>
                    <span className="text-white">{item.risk}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getRiskColor(item.risk)} transition-all duration-1000`}
                      style={{ width: `${item.risk}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Volatility: {item.volatility}%</span>
                    <span>Updated: {item.lastUpdate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

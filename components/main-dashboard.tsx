"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import {
  ArrowLeft,
  Shield,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Activity,
  Clock,
  Target,
} from "lucide-react"

interface Transaction {
  id: string
  type: "buy" | "sell" | "hedge"
  asset: string
  amount: number
  price: number
  status: "pending" | "executed" | "cancelled"
  timestamp: string
  reason: string
}

interface ThreatAverted {
  id: string
  threatType: string
  severity: "low" | "medium" | "high" | "critical"
  description: string
  potentialLoss: number
  actionTaken: string
  timestamp: string
  confidence: number
}

interface PortfolioMetrics {
  totalValue: number
  dailyChange: number
  dailyChangePercent: number
  threatsAvoided: number
  protectedValue: number
  riskScore: number
}

export function MainDashboard({ onBack }: { onBack: () => void }) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [threatsAverted, setThreatsAverted] = useState<ThreatAverted[]>([])
  const [portfolioMetrics, setPortfolioMetrics] = useState<PortfolioMetrics>({
    totalValue: 1250000,
    dailyChange: 15750,
    dailyChangePercent: 1.28,
    threatsAvoided: 7,
    protectedValue: 187500,
    riskScore: 23,
  })
  const [performanceData, setPerformanceData] = useState<any[]>([])

  useEffect(() => {
    // Mock real-time data updates
    const interval = setInterval(() => {
      // Update portfolio metrics
      setPortfolioMetrics((prev) => ({
        ...prev,
        totalValue: prev.totalValue + (Math.random() - 0.5) * 1000,
        dailyChange: prev.dailyChange + (Math.random() - 0.5) * 500,
        dailyChangePercent: prev.dailyChangePercent + (Math.random() - 0.5) * 0.1,
      }))

      // Add new transaction occasionally
      if (Math.random() < 0.3) {
        const newTransaction: Transaction = {
          id: Date.now().toString(),
          type: Math.random() > 0.5 ? "sell" : "hedge",
          asset: ["AAPL", "TSLA", "SPY", "QQQ", "GLD"][Math.floor(Math.random() * 5)],
          amount: Math.floor(Math.random() * 1000) + 100,
          price: Math.random() * 200 + 50,
          status: "executed",
          timestamp: new Date().toISOString(),
          reason: "AI Risk Mitigation",
        }
        setTransactions((prev) => [newTransaction, ...prev.slice(0, 9)])
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Initialize mock data
    const mockTransactions: Transaction[] = [
      {
        id: "1",
        type: "sell",
        asset: "NVDA",
        amount: 500,
        price: 875.5,
        status: "executed",
        timestamp: new Date(Date.now() - 300000).toISOString(),
        reason: "High volatility detected",
      },
      {
        id: "2",
        type: "hedge",
        asset: "SPY PUT",
        amount: 10,
        price: 12.75,
        status: "executed",
        timestamp: new Date(Date.now() - 600000).toISOString(),
        reason: "Market crash protection",
      },
      {
        id: "3",
        type: "buy",
        asset: "GLD",
        amount: 200,
        price: 185.25,
        status: "executed",
        timestamp: new Date(Date.now() - 900000).toISOString(),
        reason: "Inflation hedge",
      },
      {
        id: "4",
        type: "sell",
        asset: "TSLA",
        amount: 150,
        price: 242.8,
        status: "pending",
        timestamp: new Date(Date.now() - 120000).toISOString(),
        reason: "Regulatory risk alert",
      },
    ]

    const mockThreats: ThreatAverted[] = [
      {
        id: "1",
        threatType: "Market Crash Signal",
        severity: "critical",
        description: "AI detected 85% probability of 15%+ market decline within 48 hours",
        potentialLoss: 125000,
        actionTaken: "Reduced equity exposure by 30%, increased cash position",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        confidence: 92,
      },
      {
        id: "2",
        threatType: "Sector Rotation Risk",
        severity: "high",
        description: "Technology sector showing signs of major outflow",
        potentialLoss: 45000,
        actionTaken: "Sold FAANG positions, moved to defensive sectors",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        confidence: 78,
      },
      {
        id: "3",
        threatType: "Currency Devaluation",
        severity: "medium",
        description: "USD weakness detected against major currencies",
        potentialLoss: 22500,
        actionTaken: "Increased international exposure, bought EUR/JPY",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        confidence: 85,
      },
      {
        id: "4",
        threatType: "Interest Rate Shock",
        severity: "high",
        description: "Fed hawkish pivot probability increased to 75%",
        potentialLoss: 67500,
        actionTaken: "Shortened bond duration, added floating rate notes",
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        confidence: 88,
      },
    ]

    const mockPerformanceData = Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      portfolio: 1000000 + Math.random() * 300000,
      benchmark: 1000000 + Math.random() * 200000,
      protected: Math.random() * 50000,
    }))

    setTransactions(mockTransactions)
    setThreatsAverted(mockThreats)
    setPerformanceData(mockPerformanceData)
  }, [])

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "buy":
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case "sell":
        return <TrendingDown className="h-4 w-4 text-red-400" />
      case "hedge":
        return <Shield className="h-4 w-4 text-blue-400" />
      default:
        return <Activity className="h-4 w-4 text-gray-400" />
    }
  }

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-[#98B89F]/30 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button onClick={onBack} variant="ghost" size="sm" className="text-[#98B89F] hover:bg-[#98B89F]/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Overview
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-white">Black Swan Sentinel</h1>
                  <p className="text-sm text-gray-400">Active Protection Dashboard</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-gray-400">Portfolio Value</div>
                  <div className="text-xl font-bold text-white">{formatCurrency(portfolioMetrics.totalValue)}</div>
                </div>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="container mx-auto px-4 py-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-black/50 border-[#98B89F]/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Daily P&L</p>
                    <p
                      className={`text-2xl font-bold ${portfolioMetrics.dailyChange >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {portfolioMetrics.dailyChange >= 0 ? "+" : ""}
                      {formatCurrency(portfolioMetrics.dailyChange)}
                    </p>
                    <p
                      className={`text-sm ${portfolioMetrics.dailyChangePercent >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {portfolioMetrics.dailyChangePercent >= 0 ? "+" : ""}
                      {portfolioMetrics.dailyChangePercent.toFixed(2)}%
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-[#98B89F]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-[#98B89F]/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Threats Avoided</p>
                    <p className="text-2xl font-bold text-[#98B89F]">{portfolioMetrics.threatsAvoided}</p>
                    <p className="text-sm text-gray-400">Last 24h</p>
                  </div>
                  <Shield className="h-8 w-8 text-[#98B89F]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-[#98B89F]/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Protected Value</p>
                    <p className="text-2xl font-bold text-green-400">
                      {formatCurrency(portfolioMetrics.protectedValue)}
                    </p>
                    <p className="text-sm text-gray-400">Losses prevented</p>
                  </div>
                  <Target className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-[#98B89F]/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Risk Score</p>
                    <p className="text-2xl font-bold text-yellow-400">{portfolioMetrics.riskScore}</p>
                    <Progress value={portfolioMetrics.riskScore} className="mt-2 h-2" />
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Activity */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Performance Chart */}
            <Card className="lg:col-span-2 bg-black/50 border-[#98B89F]/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Portfolio Performance vs Benchmark</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#98B89F" strokeOpacity={0.2} />
                      <XAxis dataKey="day" stroke="#98B89F" />
                      <YAxis stroke="#98B89F" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid #98B89F",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="portfolio"
                        stackId="1"
                        stroke="#98B89F"
                        fill="#98B89F"
                        fillOpacity={0.3}
                        name="Protected Portfolio"
                      />
                      <Area
                        type="monotone"
                        dataKey="benchmark"
                        stackId="2"
                        stroke="#6b7280"
                        fill="#6b7280"
                        fillOpacity={0.2}
                        name="Market Benchmark"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Active Transactions */}
            <Card className="bg-black/50 border-[#98B89F]/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Active Transactions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-72">
                  <div className="space-y-3">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="p-3 bg-black/30 rounded-lg border border-[#98B89F]/20">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getTransactionIcon(transaction.type)}
                            <span className="text-white font-medium text-sm">
                              {transaction.type.toUpperCase()} {transaction.asset}
                            </span>
                          </div>
                          <Badge
                            variant={
                              transaction.status === "executed"
                                ? "default"
                                : transaction.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="text-xs"
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-400 space-y-1">
                          <div>
                            Amount: {transaction.amount} @ ${transaction.price}
                          </div>
                          <div>Reason: {transaction.reason}</div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatTime(transaction.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Threats Averted */}
          <Card className="bg-black/50 border-[#98B89F]/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Recent Threats Averted</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {threatsAverted.map((threat) => (
                  <div
                    key={threat.id}
                    className="p-4 bg-gradient-to-r from-green-900/20 to-transparent rounded-lg border border-green-500/30"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getSeverityColor(threat.severity)}`} />
                        <div>
                          <h4 className="text-white font-semibold">{threat.threatType}</h4>
                          <p className="text-gray-300 text-sm mt-1">{threat.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">{formatCurrency(threat.potentialLoss)} saved</div>
                        <div className="text-xs text-gray-400">{threat.confidence}% confidence</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-300">{threat.actionTaken}</span>
                      </div>
                      <span className="text-xs text-gray-500">{formatTime(threat.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

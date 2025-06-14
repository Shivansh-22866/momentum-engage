"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Brain, TrendingUp, TrendingDown, CheckCircle, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { NeuralNetworkViz } from "./NeuralNetworkViz"
import { AIBrainScan } from "./AIBrainScan"
import type { AIinsights } from "../../types/agent"

interface AIInsightsDisplayProps {
  insights: AIinsights
  isProcessing: boolean
}

export function AIInsightsDisplay({ insights, isProcessing }: AIInsightsDisplayProps) {
  const getOutlookIcon = () => {
    switch (insights.outlook.toLowerCase()) {
      case "bullish":
        return <TrendingUp className="h-5 w-5 text-green-400" />
      case "bearish":
        return <TrendingDown className="h-5 w-5 text-red-400" />
      default:
        return <Zap className="h-5 w-5 text-yellow-400" />
    }
  }

  const getOutlookColor = () => {
    switch (insights.outlook.toLowerCase()) {
      case "bullish":
        return "from-green-500 to-emerald-600"
      case "bearish":
        return "from-red-500 to-pink-600"
      default:
        return "from-yellow-500 to-orange-600"
    }
  }

  const getRiskColor = () => {
    switch (insights.riskLevel.toLowerCase()) {
      case "low":
        return "text-green-400"
      case "medium":
        return "text-yellow-400"
      case "high":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="space-y-8">
      {/* AI Processing Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="flex items-center justify-center mb-4">
          <motion.div
            className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30"
            animate={{
              scale: isProcessing ? [1, 1.1, 1] : 1,
              rotate: isProcessing ? [0, 360] : 0,
            }}
            transition={{
              scale: { duration: 2, repeat: isProcessing ? Number.POSITIVE_INFINITY : 0 },
              rotate: { duration: 10, repeat: isProcessing ? Number.POSITIVE_INFINITY : 0, ease: "linear" },
            }}
          >
            <Brain className="h-8 w-8 text-purple-400" />
          </motion.div>
        </div>
        <h2 className="text-3xl font-bold text-white font-mono mb-2">AI NEURAL ANALYSIS</h2>
        <p className="text-gray-400">Advanced machine learning insights powered by quantum neural networks</p>
      </motion.div>

      {/* Neural Network Visualization */}
      {/* <Card className="bg-black/60 backdrop-blur-md border border-purple-500/30 shadow-2xl">
        <CardHeader className="border-b border-purple-500/20">
          <CardTitle className="text-xl text-white font-mono flex items-center">
            <Brain className="h-5 w-5 mr-2 text-purple-400" />
            NEURAL NETWORK PROCESSING
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-96">
            <NeuralNetworkViz isProcessing={isProcessing} />
          </div>
        </CardContent>
      </Card> */}

      {/* AI Insights Grid */}
      <AnimatePresence>
        {insights.summary && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Main Analysis */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Card */}
              <Card className="bg-black/60 backdrop-blur-md border border-cyan-500/30 shadow-2xl">
                <CardHeader className="border-b border-cyan-500/20">
                  <CardTitle className="text-xl text-white font-mono flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-cyan-400" />
                    AI ANALYSIS SUMMARY
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <motion.p
                    className="text-gray-300 text-lg leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {insights.summary}
                  </motion.p>
                </CardContent>
              </Card>

              {/* Key Signals */}
              <Card className="bg-black/60 backdrop-blur-md border border-green-500/30 shadow-2xl">
                <CardHeader className="border-b border-green-500/20">
                  <CardTitle className="text-xl text-white font-mono flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-green-400" />
                    KEY SIGNALS DETECTED
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {insights.keySignals.map((signal, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center space-x-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-gray-300 flex-1">{signal}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Reasoning */}
              <Card className="bg-black/60 backdrop-blur-md border border-purple-500/30 shadow-2xl">
                <CardHeader className="border-b border-purple-500/20">
                  <CardTitle className="text-xl text-white font-mono flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-purple-400" />
                    AI REASONING PROCESS
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-purple-400 uppercase tracking-wider mb-2">
                      Primary Analysis
                    </h4>
                    <p className="text-gray-300">{insights.reason}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-purple-400 uppercase tracking-wider mb-2">
                      Critical Review
                    </h4>
                    <p className="text-gray-300">{insights.review}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Brain Scan */}
              <Card className="bg-black/60 backdrop-blur-md border border-cyan-500/30 shadow-2xl">
                <CardHeader className="border-b border-cyan-500/20">
                  <CardTitle className="text-lg text-white font-mono flex items-center">
                    <Brain className="h-4 w-4 mr-2 text-cyan-400" />
                    AI BRAIN SCAN
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-48">
                    <AIBrainScan confidence={insights.confidence} />
                  </div>
                </CardContent>
              </Card>

              {/* Outlook */}
              <Card className="bg-black/60 backdrop-blur-md border border-yellow-500/30 shadow-2xl">
                <CardHeader className="border-b border-yellow-500/20">
                  <CardTitle className="text-lg text-white font-mono flex items-center">
                    {getOutlookIcon()}
                    <span className="ml-2">MARKET OUTLOOK</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center">
                    <motion.div
                      className={`text-4xl font-bold bg-gradient-to-r ${getOutlookColor()} bg-clip-text text-transparent mb-4 font-mono`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      {insights.outlook.toUpperCase()}
                    </motion.div>
                    <Badge
                      variant="outline"
                      className={`${getRiskColor()} border-current bg-current/10 px-4 py-2 font-mono`}
                    >
                      {insights.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Confidence Meter */}
              <Card className="bg-black/60 backdrop-blur-md border border-blue-500/30 shadow-2xl">
                <CardHeader className="border-b border-blue-500/20">
                  <CardTitle className="text-lg text-white font-mono flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-400" />
                    CONFIDENCE LEVEL
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <motion.div
                        className="text-3xl font-bold text-blue-400 font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {(insights.confidence * 100).toFixed(1)}%
                      </motion.div>
                    </div>
                    <Progress
                      value={insights.confidence * 100}
                      className="h-3 bg-gray-800"
                      style={{
                        background: "linear-gradient(to right, #1f2937, #374151)",
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-400 font-mono">
                      <span>LOW</span>
                      <span>MEDIUM</span>
                      <span>HIGH</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

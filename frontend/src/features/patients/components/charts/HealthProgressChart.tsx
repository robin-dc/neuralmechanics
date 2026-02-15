"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Patient } from "../../types/patient"

const chartConfig = {
  systolic: {
    label: "Systolic",
    color: "#3b82f6", // Blue
  },
  diastolic: {
    label: "Diastolic",
    color: "#4169E1", // Light blue
  },
  heartRate: {
    label: "Heart Rate",
    color: "#3b82f6", // Blue
  },
  weight: {
    label: "Weight",
    color: "#3b82f6", // Blue
  },
  bmi: {
    label: "BMI",
    color: "#3b82f6", // Blue
  },
} satisfies ChartConfig

interface HealthProgressProps {
  patient: Patient;
}

export function HealthProgress({ patient }: HealthProgressProps) {
  const [timeRange, setTimeRange] = React.useState("all")
  const [metric, setMetric] = React.useState<"bloodPressure" | "heartRate" | "weight" | "bmi">("bloodPressure")

  const chartData = React.useMemo(() => {
    if (!patient.visits || patient.visits.length === 0) return []

    return patient.visits
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((visit) => ({
        date: new Date(visit.timestamp).toISOString().split('T')[0],
        timestamp: visit.timestamp,
        systolic: visit.systolic,
        diastolic: visit.diastolic,
        heartRate: visit.heartRate,
        weight: visit.weight,
        bmi: Number(visit.bmi.toFixed(2)),
      }))
  }, [patient.visits])

  const filteredData = React.useMemo(() => {
    if (timeRange === "all") return chartData

    const now = Date.now()
    let daysToSubtract = 90

    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }

    const startDate = now - (daysToSubtract * 24 * 60 * 60 * 1000)

    return chartData.filter((item) => item.timestamp >= startDate)
  }, [chartData, timeRange])

  // Get the metric-specific configuration
  const getMetricConfig = () => {
    switch (metric) {
      case "bloodPressure":
        return {
          title: "Blood Pressure Trends",
          description: "Tracking systolic and diastolic blood pressure over time",
          dataKeys: ["systolic", "diastolic"],
          yAxisLabel: "mmHg",
        }
      case "heartRate":
        return {
          title: "Heart Rate Trends",
          description: "Tracking heart rate over time",
          dataKeys: ["heartRate"],
          yAxisLabel: "bpm",
        }
      case "weight":
        return {
          title: "Weight Trends",
          description: "Tracking weight changes over time",
          dataKeys: ["weight"],
          yAxisLabel: "kg",
        }
      case "bmi":
        return {
          title: "BMI Trends",
          description: "Tracking Body Mass Index over time",
          dataKeys: ["bmi"],
          yAxisLabel: "BMI",
        }
    }
  }

  const metricConfig = getMetricConfig()

  if (!chartData.length) {
    return (
      <Card className="max-w-6xl overflow-x-hidden">
        <CardHeader>
          <CardTitle>Health Progress</CardTitle>
          <CardDescription>No visit data available yet</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[250px]">
          <p className="text-gray-500">Add visit vitals to see health trends</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="-w-6xl overflow-x-hidden">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>{metricConfig.title}</CardTitle>
          <CardDescription>
            {metricConfig.description}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Select value={metric} onValueChange={(value: any) => setMetric(value)}>
            <SelectTrigger
              className="w-[160px] rounded-lg"
              aria-label="Select metric"
            >
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="bloodPressure" className="rounded-lg">
                Blood Pressure
              </SelectItem>
              <SelectItem value="heartRate" className="rounded-lg">
                Heart Rate
              </SelectItem>
              <SelectItem value="weight" className="rounded-lg">
                Weight
              </SelectItem>
              <SelectItem value="bmi" className="rounded-lg">
                BMI
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="w-[140px] rounded-lg"
              aria-label="Select time range"
            >
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all" className="rounded-lg">
                All Time
              </SelectItem>
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 max-w-screen overflow-hidden">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillSystolic" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="#3b82f6"
                  stopOpacity={0.6}
                />
                <stop
                  offset="50%"
                  stopColor="#3b82f6"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="#3b82f6"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="fillDiastolic" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="#4169E1"
                  stopOpacity={0.6}
                />
                <stop
                  offset="50%"
                  stopColor="#4169E1"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="#4169E1"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="fillHeartRate" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="#3b82f6"
                  stopOpacity={0.6}
                />
                <stop
                  offset="50%"
                  stopColor="#3b82f6"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="#3b82f6"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="fillWeight" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="#3b82f6"
                  stopOpacity={0.6}
                />
                <stop
                  offset="50%"
                  stopColor="#3b82f6"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="#3b82f6"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="fillBmi" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="#3b82f6"
                  stopOpacity={0.6}
                />
                <stop
                  offset="50%"
                  stopColor="#3b82f6"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="#3b82f6"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            {metricConfig.dataKeys.map((key) => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill={`url(#fill${key.charAt(0).toUpperCase() + key.slice(1)})`}
                stroke={key === "systolic" ? "#3b82f6" : key === "diastolic" ? "#4169E1" : "#3b82f6"}
                strokeWidth={2}
                stackId={metric === "bloodPressure" ? undefined : "a"}
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
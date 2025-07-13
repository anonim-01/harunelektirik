"use client"

import * as React from "react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig as ChartConfigType,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartLegend, ChartLegendContent } from "@tremor/react"
import { cn } from "@/lib/utils"

// Helper to add type safety to chart config
function getChartConfig<T extends ChartConfigType>(config: T) {
  return config
}

type ChartProps = React.ComponentProps<typeof ChartContainer> & {
  config: ChartConfigType
  children: React.ReactNode
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(({ config, className, children, ...props }, ref) => {
  const uniqueId = React.useId()
  const [activeChartItem, setActiveChartItem] = React.useState<string | number>()

  return (
    <ChartContainer
      ref={ref}
      className={cn("flex h-[350px] w-full flex-col items-center justify-center", className)}
      config={config}
      id={uniqueId}
      onValueChange={setActiveChartItem}
      {...props}
    >
      {children}
      <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
      <ChartLegend content={<ChartLegendContent />} />
    </ChartContainer>
  )
})
Chart.displayName = "Chart"

type ChartCrosshairProps = React.ComponentProps<typeof ChartTooltip> & {
  x?: boolean
  y?: boolean
}

const ChartCrosshair = ({ x, y, ...props }: ChartCrosshairProps) => {
  return (
    <ChartTooltip
      cursor={false}
      content={
        <ChartTooltipContent
          className="grid min-w-[180px] grid-cols-[1fr_auto] items-center gap-2 px-2 py-1"
          hideLabel
        />
      }
      {...props}
    />
  )
}
ChartCrosshair.displayName = "ChartCrosshair"

type ChartSelectProps = React.ComponentProps<typeof Select> & {
  config: ChartConfigType
  defaultValue?: string
}

const ChartSelect = ({ config, defaultValue, ...props }: ChartSelectProps) => {
  const [value, setValue] = React.useState(defaultValue)

  return (
    <Select value={value} onValueChange={setValue} {...props}>
      <SelectTrigger className="relative z-50 h-8 w-fit shrink-0 text-xs [&_svg]:size-2.5" aria-label="Select a value">
        <SelectValue>
          {value ? (
            <span className="flex items-center gap-1">
              <span
                className="flex h-2 w-2 rounded-full"
                style={{
                  backgroundColor: `hsl(${config[value]?.color ?? "var(--chart-1)"})`,
                }}
              />
              <span>{config[value]?.label}</span>
            </span>
          ) : (
            "Select value"
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(config).map(([key, item]) => (
          <SelectItem key={key} value={key}>
            <span className="flex items-center gap-1">
              <span
                className="flex h-2 w-2 rounded-full"
                style={{
                  backgroundColor: `hsl(${item.color ?? "var(--chart-1)"})`,
                }}
              />
              <span>{item.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
ChartSelect.displayName = "ChartSelect"

export { Chart, ChartCrosshair, ChartSelect, getChartConfig }

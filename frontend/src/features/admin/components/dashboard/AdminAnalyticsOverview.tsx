import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

interface AnalyticsDataPoint {
  name: string;
  value: number;
}

interface AdminAnalyticsCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: {
    label: string;
    href: string;
  };
}

export function AdminAnalyticsCard({ title, subtitle, children, action }: AdminAnalyticsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
        </div>
        
        {action && (
          <a 
            href={action.href}
            className="flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-medium"
          >
            {action.label}
            <ArrowUpRight size={16} className="ml-1" />
          </a>
        )}
      </div>
      
      {children}
    </div>
  );
}

// Simple bar chart component
interface BarChartProps {
  data: AnalyticsDataPoint[];
  color?: string;
  height?: number;
}

function BarChart({ data, color = "#4f46e5", height = 200 }: BarChartProps) {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div style={{ height: `${height}px` }} className="w-full mt-6">
      <div className="flex items-end justify-between h-full">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1 mx-1">
              <div className="relative w-full group">
                <div 
                  className="w-full rounded-t-md transition-all duration-300 group-hover:opacity-80"
                  style={{ 
                    height: `${barHeight}%`, 
                    backgroundColor: color,
                    minHeight: '4px'
                  }}
                />
                
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {item.value}
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Simple donut chart component
interface DonutChartProps {
  data: AnalyticsDataPoint[];
  colors?: string[];
  size?: number;
}

function DonutChart({ data, colors = ["#4f46e5", "#a855f7", "#ec4899", "#f97316", "#14b8a6"], size = 200 }: DonutChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // This would be where we'd implement a real chart with a library in a production app
    // For now, we'll just show a placeholder
  }, [data]);
  
  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <div 
        ref={chartRef} 
        style={{ width: `${size}px`, height: `${size}px` }}
        className="relative"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const prevPercentages = data
              .slice(0, index)
              .reduce((sum, d) => sum + (d.value / total) * 100, 0);
            
            // For a real donut chart, we'd calculate precise SVG paths
            // This is a simplified version
            return (
              <circle
                key={index}
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke={colors[index % colors.length]}
                strokeWidth="20"
                strokeDasharray={`${percentage} 100`}
                strokeDashoffset={-prevPercentages}
                transform="rotate(-90) translate(-100, 0)"
              />
            );
          })}
          <circle cx="50" cy="50" r="30" fill="white" className="dark:fill-gray-800" />
        </svg>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: colors[index % colors.length] }}
            ></div>
            <div className="text-sm">
              <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
              <span className="ml-1 text-gray-500 dark:text-gray-400">({Math.round((item.value / total) * 100)}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Line chart component
interface LineChartProps {
  data: AnalyticsDataPoint[];
  compareData?: AnalyticsDataPoint[];
  color?: string;
  compareColor?: string;
  height?: number;
}

function LineChart({ 
  data, 
  compareData, 
  color = "#4f46e5", 
  compareColor = "#ec4899",
  height = 200 
}: LineChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const allValues = [...data.map(d => d.value), ...(compareData?.map(d => d.value) || [])];
  const maxValue = Math.max(...allValues);

  // This would be a placeholder for a real chart library implementation
  return (
    <div style={{ height: `${height}px` }} className="w-full mt-6">
      <div className="relative h-full">
        {/* This is a very simplified line chart visualization */}
        <svg className="w-full h-full">
          {/* Primary line */}
          <polyline
            points={data.map((point, index) => 
              `${(index / (data.length - 1)) * 100}% ${(1 - point.value / maxValue) * height}px`
            ).join(', ')}
            fill="none"
            stroke={color}
            strokeWidth="2"
            className="drop-shadow"
          />
          
          {/* Compare line if provided */}
          {compareData && (
            <polyline
              points={compareData.map((point, index) => 
                `${(index / (compareData.length - 1)) * 100}% ${(1 - point.value / maxValue) * height}px`
              ).join(', ')}
              fill="none"
              stroke={compareColor}
              strokeWidth="2"
              strokeDasharray="4"
              className="drop-shadow"
            />
          )}
          
          {/* Data points */}
          {data.map((point, index) => (
            <circle
              key={`point-${index}`}
              cx={`${(index / (data.length - 1)) * 100}%`}
              cy={`${(1 - point.value / maxValue) * height}px`}
              r="3"
              fill="white"
              stroke={color}
              strokeWidth="2"
              className="drop-shadow"
            />
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between">
          {data.map((point, index) => (
            <div key={`label-${index}`} className="text-xs text-gray-500 dark:text-gray-400">
              {point.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface AdminAnalyticsProps {
  eventsByMonth: AnalyticsDataPoint[];
  registrationsByMonth: AnalyticsDataPoint[];
  popularCategories: AnalyticsDataPoint[];
}

export function AdminAnalyticsOverview({
  eventsByMonth,
  registrationsByMonth,
  popularCategories
}: AdminAnalyticsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <AdminAnalyticsCard 
        title="Event Growth" 
        subtitle="Monthly event creation statistics"
        action={{ label: "View all", href: "/dashboard/admin/events/analytics" }}
      >
        <BarChart data={eventsByMonth} color="#4f46e5" />
      </AdminAnalyticsCard>
      
      <AdminAnalyticsCard 
        title="Registration Trends" 
        subtitle="Monthly registration statistics"
        action={{ label: "View all", href: "/dashboard/admin/registrations/analytics" }}
      >
        <LineChart data={registrationsByMonth} color="#14b8a6" />
      </AdminAnalyticsCard>
      
      <AdminAnalyticsCard 
        title="Popular Categories" 
        subtitle="Distribution of events by category"
      >
        <DonutChart data={popularCategories} />
      </AdminAnalyticsCard>
      
      <AdminAnalyticsCard 
        title="User Engagement"
        subtitle="Comparison of this month vs. last month"
      >
        <LineChart 
          data={[
            { name: "Week 1", value: 45 },
            { name: "Week 2", value: 52 },
            { name: "Week 3", value: 49 },
            { name: "Week 4", value: 62 }
          ]} 
          compareData={[
            { name: "Week 1", value: 38 },
            { name: "Week 2", value: 42 },
            { name: "Week 3", value: 35 },
            { name: "Week 4", value: 40 }
          ]}
          color="#ec4899"
          compareColor="#a855f7"
        />
      </AdminAnalyticsCard>
    </div>
  );
}

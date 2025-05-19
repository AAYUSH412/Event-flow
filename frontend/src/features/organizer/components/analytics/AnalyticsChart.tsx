"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsChartProps {
  title: string;
  description: string;
  data: any[];
  type: "bar" | "line" | "horizontal-bar";
  delay?: number;
  dataKey?: string;
  nameKey?: string;
  colors?: string[];
}

export const AnalyticsChart = ({ 
  title, 
  description, 
  data, 
  type,
  delay = 0,
  dataKey = "value",
  nameKey = "name",
  colors = ["#4f46e5", "#06b6d4", "#16a34a"]
}: AnalyticsChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
    >
      <div className="p-6 pb-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      
      <div className="p-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          {type === "bar" && (
            <BarChart data={data}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors[0]} stopOpacity={0.4}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey={nameKey} 
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={{ stroke: "#e2e8f0" }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={{ stroke: "#e2e8f0" }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }} 
                cursor={{ fill: "rgba(236, 239, 244, 0.4)" }}
              />
              <Legend iconType="circle" />
              <Bar 
                dataKey={dataKey} 
                name="Registrations" 
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]} 
                animationDuration={1500}
              />
            </BarChart>
          )}
          
          {type === "line" && (
            <LineChart data={data}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors[0]} stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey={nameKey} 
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={{ stroke: "#e2e8f0" }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={{ stroke: "#e2e8f0" }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }} 
              />
              <Legend iconType="circle" />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                name="Registrations" 
                stroke={colors[0]}
                strokeWidth={2}
                dot={{ fill: colors[0], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: colors[0], stroke: "white", strokeWidth: 2 }}
                animationDuration={1500}
              />
            </LineChart>
          )}
          
          {type === "horizontal-bar" && (
            <BarChart 
              data={data} 
              layout="vertical"
            >
              <defs>
                <linearGradient id="horizontalBarGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="5%" stopColor={colors[2]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors[2]} stopOpacity={0.4}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis 
                type="number"
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={{ stroke: "#e2e8f0" }}
              />
              <YAxis 
                dataKey={nameKey} 
                type="category" 
                width={120} 
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={{ stroke: "#e2e8f0" }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }} 
                cursor={{ fill: "rgba(236, 239, 244, 0.4)" }}
              />
              <Bar 
                dataKey={dataKey} 
                name="Registrations" 
                fill="url(#horizontalBarGradient)"
                radius={[0, 4, 4, 0]}
                animationDuration={1500}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default AnalyticsChart;

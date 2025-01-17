import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar } from '@/components/ui/calendar';
import { Activity, TrendingUp, Store, Pizza } from 'lucide-react';

// Sample data - replace with actual API calls
const sampleData = [
  { date: '2024-01-01', actual: 150, predicted: 145 },
  { date: '2024-01-02', actual: 165, predicted: 160 },
  { date: '2024-01-03', actual: 140, predicted: 145 },
  { date: '2024-01-04', actual: 180, predicted: 175 },
  { date: '2024-01-05', actual: 200, predicted: 190 },
];

const Dashboard = () => {
  const [selectedOutlet, setSelectedOutlet] = useState(1);
  const [date, setDate] = useState(new Date());

  const StatCard = ({ title, value, icon, trend }) => (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <p className={`text-sm mt-2 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last week
          </p>
        </div>
        <div className="p-3 bg-blue-100 rounded-full">
          {icon}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pizza Sales Dashboard</h1>
        <p className="text-gray-600">Predictive analytics for Farmhouse Pizza sales</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Today's Prediction"
          value="185 pizzas"
          icon={<TrendingUp size={24} className="text-blue-500" />}
          trend={5.2}
        />
        <StatCard 
          title="Yesterday's Sales"
          value="178 pizzas"
          icon={<Activity size={24} className="text-green-500" />}
          trend={-2.1}
        />
        <StatCard 
          title="Active Outlets"
          value="250"
          icon={<Store size={24} className="text-purple-500" />}
          trend={0}
        />
        <StatCard 
          title="Total Monthly Sales"
          value="5,420"
          icon={<Pizza size={24} className="text-orange-500" />}
          trend={3.8}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Prediction vs Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#8884d8" 
                    name="Actual Sales"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#82ca9d" 
                    name="Predicted Sales"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Outlet Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((outlet) => (
                <div 
                  key={outlet}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedOutlet(outlet)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">Outlet #{outlet}</h4>
                      <p className="text-sm text-gray-500">Mumbai, India</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">168</p>
                      <p className="text-sm text-gray-500">Daily Avg</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Date for Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prediction Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">Selected Date</span>
                <span>{date.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">Selected Outlet</span>
                <span>#{selectedOutlet}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="font-medium">Predicted Sales</span>
                <span className="text-xl font-bold">185 pizzas</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="font-medium">Confidence Level</span>
                <span>92%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
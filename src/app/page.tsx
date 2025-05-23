"use client";

import { faker } from '@faker-js/faker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpIcon, ArrowDownIcon, DollarSignIcon, TrendingUpIcon, WalletIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Generate fake crypto data
const generatePortfolioData = () => {
  return {
    totalBalance: faker.finance.amount({ min: 10000, max: 100000, dec: 2 }),
    totalTrades: faker.number.int({ min: 50, max: 500 }),
    portfolioChange: faker.finance.amount({ min: -15, max: 25, dec: 2 }),
    activePositions: faker.number.int({ min: 5, max: 15 }),
  };
};

const generateTransactions = (count: number) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(['buy', 'sell']),
    asset: faker.helpers.arrayElement(['BTC', 'ETH', 'ADA', 'SOL', 'MATIC', 'LINK', 'DOT']),
    amount: faker.finance.amount({ min: 0.001, max: 10, dec: 6 }),
    price: faker.finance.amount({ min: 100, max: 50000, dec: 2 }),
    timestamp: faker.date.recent({ days: 30 }),
    total: faker.finance.amount({ min: 50, max: 5000, dec: 2 }),
  }));
};

const generateChartData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.slice(0, 6).map(month => ({
    month,
    value: parseFloat(faker.finance.amount({ min: 5000, max: 15000, dec: 0 })),
  }));
};

export default function Dashboard() {
  const portfolioData = generatePortfolioData();
  const transactions = generateTransactions(10);
  const chartData = generateChartData();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Crypto Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your cryptocurrency portfolio and recent transactions</p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Balance Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio</CardTitle>
              <WalletIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${portfolioData.totalBalance}</div>
              <p className="text-xs text-muted-foreground">
                {parseFloat(portfolioData.portfolioChange) >= 0 ? '+' : ''}
                {portfolioData.portfolioChange}% from last month
              </p>
            </CardContent>
          </Card>

          {/* Total Trades Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
              <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioData.totalTrades}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          {/* Active Positions Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioData.activePositions}</div>
              <p className="text-xs text-muted-foreground">Across 8 cryptocurrencies</p>
            </CardContent>
          </Card>

          {/* Portfolio Change Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">24h Change</CardTitle>
              {parseFloat(portfolioData.portfolioChange) >= 0 ? (
                <ArrowUpIcon className="h-4 w-4 text-green-600" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${parseFloat(portfolioData.portfolioChange) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {parseFloat(portfolioData.portfolioChange) >= 0 ? '+' : ''}{portfolioData.portfolioChange}%
              </div>
              <p className="text-xs text-muted-foreground">Portfolio performance</p>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Monthly portfolio value over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                  />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest cryptocurrency trades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <Badge variant={transaction.type === 'buy' ? 'default' : 'destructive'} className="w-12 justify-center">
                      {transaction.type.toUpperCase()}
                    </Badge>
                    <div>
                      <p className="font-medium">{transaction.asset}</p>
                      <p className="text-sm text-gray-500">
                        {transaction.amount} {transaction.asset} @ ${transaction.price}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${transaction.total}</p>
                    <p className="text-sm text-gray-500">
                      {transaction.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
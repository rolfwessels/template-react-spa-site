import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface Character {
  id: string
  name: string
  status: string
  species: string
}

interface CharacterDashboardProps {
  characters: Character[]
}

const COLORS = ['#6366f1', '#22d3ee', '#a3e635', '#fbbf24', '#f472b6', '#818cf8']

export const CharacterDashboard = ({ characters }: CharacterDashboardProps) => {
  // Summary stats
  const total = characters.length
  const humans = characters.filter(c => c.species?.toLowerCase() === 'human').length
  const aliens = characters.filter(c => c.species?.toLowerCase() === 'alien').length
  const others = total - humans - aliens

  // Pie chart: species distribution
  const speciesCounts: Record<string, number> = {}
  characters.forEach(c => {
    const key = c.species || 'Unknown'
    speciesCounts[key] = (speciesCounts[key] || 0) + 1
  })
  const speciesData = Object.entries(speciesCounts).map(([name, value]) => ({ name, value }))

  // Bar chart: status distribution
  const statusCounts: Record<string, number> = {}
  characters.forEach(c => {
    const key = c.status || 'Unknown'
    statusCounts[key] = (statusCounts[key] || 0) + 1
  })
  const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }))

  return (
    <div className="mb-8 w-full">
      <Flex gap="4" className="mb-8 w-full" justify="start">
        <Card className="rounded-xl shadow p-4 min-w-[160px] bg-white">
          <Heading size="3">Total</Heading>
          <Text size="6" weight="bold">{total}</Text>
          <Text color="gray" size="2">Characters</Text>
        </Card>
        <Card className="rounded-xl shadow p-4 min-w-[160px] bg-white">
          <Heading size="3">Humans</Heading>
          <Text size="6" weight="bold">{humans}</Text>
        </Card>
        <Card className="rounded-xl shadow p-4 min-w-[160px] bg-white">
          <Heading size="3">Aliens</Heading>
          <Text size="6" weight="bold">{aliens}</Text>
        </Card>
        <Card className="rounded-xl shadow p-4 min-w-[160px] bg-white">
          <Heading size="3">Other</Heading>
          <Text size="6" weight="bold">{others}</Text>
        </Card>
      </Flex>
      <Flex gap="8" wrap="wrap" className="w-full">
        <Card className="rounded-xl shadow p-6 flex-1 min-w-[320px] bg-white">
          <Heading size="4" className="mb-4">Species Distribution</Heading>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={speciesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {speciesData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card className="rounded-xl shadow p-6 flex-1 min-w-[320px] bg-white">
          <Heading size="4" className="mb-4">Status Distribution</Heading>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={statusData} margin={{ left: 8, right: 8 }}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Flex>
    </div>
  )
}

export default CharacterDashboard 
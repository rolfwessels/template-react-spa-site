import { Card, Flex, Heading, Text, Box } from '@radix-ui/themes'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { CharacterBasicFragment } from '../graphql/generated/Characters.generated'

interface CharacterDashboardProps {
  characters: CharacterBasicFragment[]
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
    <Box mb="8" width="100%">
      <Flex gap="4" mb="8" width="100%" justify="start">
        <Card size="2" variant="surface" style={{ minWidth: '160px' }}>
          <Box p="4">
            <Heading size="3">Total</Heading>
            <Text size="6" weight="bold">{total}</Text>
            <Text color="gray" size="2">Characters</Text>
          </Box>
        </Card>
        <Card size="2" variant="surface" style={{ minWidth: '160px' }}>
          <Box p="4">
            <Heading size="3">Humans</Heading>
            <Text size="6" weight="bold">{humans}</Text>
          </Box>
        </Card>
        <Card size="2" variant="surface" style={{ minWidth: '160px' }}>
          <Box p="4">
            <Heading size="3">Aliens</Heading>
            <Text size="6" weight="bold">{aliens}</Text>
          </Box>
        </Card>
        <Card size="2" variant="surface" style={{ minWidth: '160px' }}>
          <Box p="4">
            <Heading size="3">Other</Heading>
            <Text size="6" weight="bold">{others}</Text>
          </Box>
        </Card>
      </Flex>
      <Flex gap="8" wrap="wrap" width="100%">
        <Card size="2" variant="surface" style={{ flex: 1, minWidth: '320px' }}>
          <Box p="6">
            <Heading size="4" mb="4">Species Distribution</Heading>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={speciesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {speciesData.map((_, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Card>
        <Card size="2" variant="surface" style={{ flex: 1, minWidth: '320px' }}>
          <Box p="6">
            <Heading size="4" mb="4">Status Distribution</Heading>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={statusData} margin={{ left: 8, right: 8 }}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </Flex>
    </Box>
  )
}

export default CharacterDashboard 
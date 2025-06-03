import { Card, Grid, Heading, Text, Flex } from '@radix-ui/themes'
import { VideoIcon } from '@radix-ui/react-icons'

interface Episode {
  id: string
  name: string
  episode: string
}

interface EpisodeListProps {
  episodes: Episode[]
}

export function EpisodeList({ episodes }: EpisodeListProps) {
  return (
    <Card className="rounded-2xl shadow p-6 mt-6 bg-white">
      <Flex align="center" gap="2" mb="4">
        
        <Heading size="4">Episodes</Heading>
      </Flex>
      <Grid columns={{ initial: '1', md: '2', lg: '3' }} gap="4">
        {episodes.map((episode) => (
          <div
            key={episode.id}
            className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col items-start"
          >
            <Text size="3" weight="bold" color="indigo">{episode.episode}: {episode.name}</Text>
          </div>
        ))}
      </Grid>
    </Card>
  )
} 
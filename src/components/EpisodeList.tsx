import { Card, Grid, Heading, Text } from '@radix-ui/themes'

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
    <Card>
      <Heading size="4" mb="4">Episodes</Heading>
      <Grid columns={{ initial: '1', md: '2', lg: '3' }} gap="4">
        {episodes.map((episode) => (
          <Card key={episode.id} variant="surface">
            <Heading size="3">{episode.name}</Heading>
            <Text color="gray">{episode.episode}</Text>
          </Card>
        ))}
      </Grid>
    </Card>
  )
} 
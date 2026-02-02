import { Card, Grid, Heading, Text, Flex, Box } from '@radix-ui/themes'
import { EpisodeInfoFragment } from '../graphql/generated/Characters.generated'

interface EpisodeListProps {
  episodes: EpisodeInfoFragment[]
}

export function EpisodeList({ episodes }: EpisodeListProps) {
  return (
    <Box mt="6">
      <Card>
        <Box p="6">
          <Flex align="center" gap="2" mb="4">
            
            <Heading size="4">Episodes</Heading>
          </Flex>
          <Grid columns={{ initial: '1', md: '2', lg: '3' }} gap="4">
            {episodes.map((episode) => (
              <Card
                key={episode.id}
                variant="surface"
                style={{ 
                  backgroundColor: '#eef2ff',
                  borderColor: '#c7d2fe',
                  cursor: 'pointer'
                }}
              >
                <Box p="4">
                  <Flex direction="column" align="start">
                    <Text size="3" weight="bold" color="indigo">{episode.episode}: {episode.name}</Text>
                  </Flex>
                </Box>
              </Card>
            ))}
          </Grid>
        </Box>
      </Card>
    </Box>
  )
} 
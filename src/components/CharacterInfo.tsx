import { Card, Flex, Avatar, Heading, Text, Grid, Box } from '@radix-ui/themes'
import { StatusDot, CharacterStatus } from './StatusDot'
import { CharacterInfoFragment } from '../graphql/generated/Characters.generated'

interface CharacterInfoProps {
  character: CharacterInfoFragment
}

export function CharacterInfo(props: CharacterInfoProps) {
  return (
    <Card style={{ background: 'linear-gradient(to bottom right, #eef2ff, white)' }}>
      <Box p="8">
        <Flex gap="6" align="center">
          <Flex justify="center" align="center" width="12" height="12">
            <Box style={{ width: '176px', height: '176px' }}>
              <Avatar
                size="9"
                src={props.character.image ?? ''}
                alt={props.character.name ?? ''}
                fallback={props.character.name?.[0] ?? ''}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  border: '4px solid white',
                  fontSize: '1.875rem'
                }}
              />
            </Box>
          </Flex>
          <Flex direction="column" gap="3" style={{ flexGrow: 1 }}>
            <Heading size="6" weight="bold" mb="2">{props.character.name}</Heading>
            <Grid columns="2" gapX="8" gapY="2">
              <Box>
                <Text as="span" weight="bold">Status:</Text>{' '}
                <StatusDot status={props.character.status as CharacterStatus} />{' '}
              </Box>
              <Box>
                <Text as="span" weight="bold">Origin:</Text>{' '}
                <Text as="span" color="gray">{props.character.origin?.name || 'Unknown'}</Text>
              </Box>
              <Box>
                <Text as="span" weight="bold">Species:</Text>{' '}
                <Text as="span" color="gray">{props.character.species}</Text>
              </Box>
              <Box>
                <Text as="span" weight="bold">Location:</Text>{' '}
                <Text as="span" color="gray">{props.character.location?.name || 'Unknown'}</Text>
              </Box>
              <Box>
                <Text as="span" weight="bold">Gender:</Text>{' '}
                <Text as="span" color="gray">{props.character.gender ?? 'Unknown'}</Text>
              </Box>
            </Grid>
          </Flex>
        </Flex>
      </Box>
    </Card>
  )
} 
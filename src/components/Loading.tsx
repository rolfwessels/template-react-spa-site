import { FC } from 'react'
import { Card, Flex, Text, Spinner, Box } from '@radix-ui/themes'

interface LoadingProps {
  message?: string
}

const Loading: FC<LoadingProps> = ({ message = 'Loading...' }) => (
  <Box width="100%">
    <Card size="2">
      <Box p="8">
        <Flex direction="column" align="center" justify="center" gap="4">
          <Spinner size="3" />
          <Text size="3" color="gray">{message}</Text>
        </Flex>
      </Box>
    </Card>
  </Box>
)

export default Loading 
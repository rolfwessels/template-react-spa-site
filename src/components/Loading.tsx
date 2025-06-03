import { FC } from 'react'
import { Card, Flex, Text, Spinner } from '@radix-ui/themes'

interface LoadingProps {
  message?: string
}

const Loading: FC<LoadingProps> = ({ message = 'Loading...' }) => (
  <Card size="2" className="w-full text-center p-8">
    <Flex direction="column" align="center" gap="4">
      <Spinner size="3" />
      <Text size="3" color="gray">{message}</Text>
    </Flex>
  </Card>
)

export default Loading 
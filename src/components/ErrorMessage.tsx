import { FC } from 'react'
import { Card, Flex, Text } from '@radix-ui/themes'
import { CrossCircledIcon } from '@radix-ui/react-icons'

interface ErrorMessageProps {
  message?: string
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message = 'An error occurred. Please try again later.' }) => (
  <Card size="2" style={{ width: '100%', textAlign: 'center', padding: '2rem' }}>
    <Flex direction="column" align="center" gap="2">
      <CrossCircledIcon width="24" height="24" color="red" />
      <Text size="3" color="red">{message}</Text>
    </Flex>
  </Card>
)

export default ErrorMessage 
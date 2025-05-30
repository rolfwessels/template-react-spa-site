import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Box, Flex, Text, Link } from '@radix-ui/themes'

const Navigation = () => (
  <Box asChild>
    <header>
      <Flex align="center" justify="between" px="4" py="3" >
        <NavigationMenu.Root>
          <NavigationMenu.List asChild>
            <Flex gap="4">
              <NavigationMenu.Item>
                <Link asChild>
                  <a href="/">
                    <Text weight="bold" size="3">Dashboard</Text>
                  </a>
                </Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <Link asChild>
                  <a href="/settings">
                    <Text weight="bold" size="3">Settings</Text>
                  </a>
                </Link>
              </NavigationMenu.Item>
            </Flex>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </Flex>
    </header>
  </Box>
)

export default Navigation; 
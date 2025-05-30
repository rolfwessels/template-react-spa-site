import * as NavigationMenu from '@radix-ui/react-navigation-menu'

const Navigation = () => (
  <header className="bg-primary text-primary-dark">
    <div className="container mx-auto px-4 py-4">
      <NavigationMenu.Root className="relative">
        <NavigationMenu.List className="flex space-x-4">
          <NavigationMenu.Item>
            <NavigationMenu.Link
              className="text-primary-dark hover:text-primary-dark/80"
              href="/"
            >
              Dashboard
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link
              className="text-primary-dark hover:text-primary-dark/80"
              href="/settings"
            >
              Settings
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </div>
  </header>
)

export default Navigation; 
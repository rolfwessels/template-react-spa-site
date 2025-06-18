import { createRouter, RouterProvider, createRootRoute, createRoute } from '@tanstack/react-router'
import App from './App'
import CharacterExplorer from '@pages/CharacterExplorer'
import CharacterDetail from '@pages/CharacterDetail'

const rootRoute = createRootRoute({
  component: App,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CharacterExplorer,
})

const characterDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/character/$id',
  component: CharacterDetail,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  characterDetailRoute,
])

export const router = createRouter({ routeTree })
export { RouterProvider } 
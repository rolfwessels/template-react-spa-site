import { createRouter, RouterProvider, createRootRoute, createRoute } from '@tanstack/react-router'
import App from './App'

const rootRoute = createRootRoute({
  component: App,
})

const characterDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/character/$id',
  component: () => <div>Character Detail Coming Soon</div>,
})

const routeTree = rootRoute.addChildren([
  characterDetailRoute,
])

export const router = createRouter({ routeTree })
export { RouterProvider } 
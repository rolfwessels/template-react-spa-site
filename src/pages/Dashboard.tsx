import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-primary">1,234</p>
        </div>
        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Active Projects</h3>
          <p className="text-3xl font-bold text-primary">42</p>
        </div>
        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-primary">$12,3451</p>
        </div>
      </div>
      {/* Action Button */}
      <div className="mt-8">
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger asChild>
            <button className="bg-primary hover:bg-primary/90 text-primary-dark px-4 py-2 rounded-lg">
              Open Dialog
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90vw] max-w-md">
              <Dialog.Title className="text-xl font-semibold mb-4">
                Example Dialog
              </Dialog.Title>
              <Dialog.Description className="text-gray-600 mb-4">
                This is an example dialog using Radix UI.
              </Dialog.Description>
              <div className="flex justify-end">
                <Dialog.Close asChild>
                  <button className="bg-primary hover:bg-primary/90 text-primary-dark px-4 py-2 rounded-lg">
                    Close
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </main>
  )
}

export default Dashboard; 
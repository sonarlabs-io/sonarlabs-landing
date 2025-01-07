import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

  const InfoModal = ({ isOpen, onClose }: InfoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>How Search Tags Work</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Our smart search recognizes specific keywords in your search query and highlights relevant categories:
          </p>
          <div className="space-y-3">
            <div>
              <h3 className="font-medium mb-1">Music genres</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Include music genres like "pop", "soul" or "hip-hop" to filter by musical style.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Audience</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Filter on top audience demographics like "Gen Z", "millennials", or age ranges like "18-24".
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Location</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add cities or countries like "NYC", "London", or "Japan" to find artists in specific areas.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Artist gender</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Whether you're looking for "men" or "women" artists.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Band or solo artist</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Use "band" to find groups or "solo" to find individual artists.
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tags light up automatically as you type to show which categories are included in your search.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InfoModal;
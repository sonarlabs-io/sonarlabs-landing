import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

interface SimilarityModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

const SimilarityInfoModal = ({ isOpen, onClose }: SimilarityModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>About Artist Similarity Search</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Alert className="border-amber-200 bg-amber-50 dark:bg-opacity-10">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-600 dark:text-amber-400">
              This feature is experimental and currently under development.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
            <p>
              Our similarity scoring system matches artists based on several factors:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Primary musical genres and subgenres</li>
              <li>Target audience demographics</li>
              <li>Engagement metrics and platform presence</li>
            </ul>
            
            <p className="pt-2">
              For this MVP, the matching algorithm primarily focuses on genre matching and works with a limited artist database. This may result in:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Fewer matches than expected</li>
              <li>Less diverse recommendations</li>
              <li>Potential missing connections between similar artists</li>
            </ul>
            
            <p className="pt-2">
              We're currently working to improve this feature by expanding our database and enhancing the matching algorithm.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SimilarityInfoModal;
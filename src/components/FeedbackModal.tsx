import { useState } from 'react';
import { PencilLine, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { submitFeedback } from '@/utils/api';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [step, setStep] = useState(1);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) return;
    
    setIsSubmitting(true);
    try {
      await submitFeedback(feedback);
      setStep(2);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setFeedback('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
            {step === 1 ? (
              <>
                <PencilLine className="h-5 w-5" />
                Share your feedback
              </>
            ) : (
              <>
                <Calendar className="h-5 w-5" />
                Book a Call
              </>
            )}
          </DialogTitle>
        </DialogHeader>
        
        {step === 1 ? (
          <>
            <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
            Your thoughts about SONAR. What would you use the most and what could be better?
            </p>
            <Textarea
            placeholder="Type your feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={5}
            className="resize-none"
            />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                // onClick={() => setStep(2)} 
                onClick={handleSubmit}
                disabled={!feedback.trim() || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Next'}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="mt-4 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Book a call with our founders to discuss more:
              </p>
              <div className="flex justify-center">
                <a href="https://cal.com/maxime-laharrague-x1ypf3/sonar" target="_blank" className="w-full">
                  <Button className="w-full" variant="outline">
                    Schedule now
                  </Button>
                </a>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button onClick={handleClose}>
                Done
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
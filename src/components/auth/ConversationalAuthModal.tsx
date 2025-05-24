
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "../../context/SessionContext";
import { authenticateWithSalesforce } from "../../services/api";
import { SalesforceAuthRequest } from "../../types/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

interface ConversationalAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthStep = 'instance' | 'username' | 'password' | 'clientId' | 'clientSecret';

const stepMessages = {
  instance: "Let's connect to your Salesforce! First, what's your organization's home base? (your instance URL)",
  username: "Perfect! Now, what's your username? The one you use to log into Salesforce 🚀",
  password: "Great! Time for your password. Don't worry, we keep this super secure 🔐",
  clientId: "Almost there! We'll need your Connected App's Client ID. Think of it as your app's passport 🎫",
  clientSecret: "Last step! Your Client Secret - the final key to unlock the magic ✨"
};

const stepPlaceholders = {
  instance: "https://yourcompany.my.salesforce.com",
  username: "your.email@company.com",
  password: "Your password + security token",
  clientId: "3MVG9...",
  clientSecret: "Enter your client secret"
};

const ConversationalAuthModal = ({ isOpen, onClose }: ConversationalAuthModalProps) => {
  const { toast } = useToast();
  const { addSession } = useSession();
  
  const [currentStep, setCurrentStep] = useState<AuthStep>('instance');
  const [isLoading, setIsLoading] = useState(false);
  const [authData, setAuthData] = useState<SalesforceAuthRequest>({
    instance_url: "",
    username: "",
    password: "",
    client_id: "",
    client_secret: "",
    grant_type: "password",
  });

  const stepOrder: AuthStep[] = ['instance', 'username', 'password', 'clientId', 'clientSecret'];
  const currentStepIndex = stepOrder.indexOf(currentStep);

  const handleInputChange = (value: string) => {
    const fieldMap = {
      instance: 'instance_url',
      username: 'username',
      password: 'password',
      clientId: 'client_id',
      clientSecret: 'client_secret'
    };
    
    setAuthData(prev => ({
      ...prev,
      [fieldMap[currentStep]]: value
    }));
  };

  const getCurrentValue = () => {
    const fieldMap = {
      instance: authData.instance_url,
      username: authData.username,
      password: authData.password,
      clientId: authData.client_id,
      clientSecret: authData.client_secret
    };
    return fieldMap[currentStep] || '';
  };

  const canProceed = () => {
    return getCurrentValue().trim() !== '';
  };

  const handleNext = () => {
    if (currentStepIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentStepIndex + 1]);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(stepOrder[currentStepIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (!authData.instance_url || !authData.username || !authData.password || !authData.client_id || !authData.client_secret) {
        throw new Error("All fields are required");
      }

      const response = await authenticateWithSalesforce(authData);

      const organizationName = authData.instance_url.replace(/https?:\/\//, '').split('.')[0] || 
                              authData.username.split('@')[1]?.split('.')[0] || 
                              'Organization';

      addSession({
        session_id: response.session_id,
        instance_url: response.instance_url,
        organization_name: organizationName,
        created_at: new Date().toISOString()
      });

      toast({
        title: "🎉 Connection successful!",
        description: `Welcome to your new ${organizationName} session!`,
      });

      handleClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCurrentStep('instance');
    setAuthData({
      instance_url: "",
      username: "",
      password: "",
      client_id: "",
      client_secret: "",
      grant_type: "password",
    });
    onClose();
  };

  const isLastStep = currentStepIndex === stepOrder.length - 1;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-5 h-5 text-primary" />
            Let's Connect Your Salesforce
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex justify-center">
            <div className="flex space-x-2">
              {stepOrder.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index <= currentStepIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Current step message */}
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {stepMessages[currentStep]}
            </p>
            
            <div className="space-y-3">
              <Input
                value={getCurrentValue()}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={stepPlaceholders[currentStep]}
                type={currentStep === 'password' || currentStep === 'clientSecret' ? 'password' : 'text'}
                className="text-center text-lg py-3"
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && canProceed()) {
                    handleNext();
                  }
                }}
              />
              
              {currentStep === 'password' && (
                <p className="text-xs text-muted-foreground">
                  💡 Pro tip: For most orgs, append your security token to your password
                </p>
              )}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed() || isLoading}
              className="flex items-center gap-2 min-w-[120px]"
            >
              {isLoading ? (
                "Connecting..."
              ) : isLastStep ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  Connect!
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConversationalAuthModal;

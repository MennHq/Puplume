import React, { useEffect, useState } from 'react';
import { Download, X, Smartphone, Share } from 'lucide-react';
import { PupLumeLogo } from '../common/PupLumeLogo';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPWABanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Check if running in standalone PWA mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;

    if (isStandalone) return;

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(iosDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Show prompt after 4 seconds on mobile if not already dismissed
    const dismissed = localStorage.getItem('puplume_pwa_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 4000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      setShowBanner(false);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('puplume_pwa_dismissed', 'true');
  };

  if (!showBanner) return null;

  return (
    <>
      <div
        id="pwa-install-banner"
        className="fixed top-3 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white border border-[#E8DDD3] shadow-lg rounded-2xl p-3.5 flex items-center justify-between gap-3 animate-fade-in"
      >
        <div className="flex items-center gap-2.5">
          <PupLumeLogo variant="icon" size="sm" />
          <div>
            <h4 className="text-xs font-bold text-[#2C211B] flex items-center gap-1.5">
              Install PupLume
              <span className="text-[10px] font-semibold bg-[#8B5E3C]/10 text-[#5F3E29] px-1.5 py-0.2 rounded-md">
                PWA
              </span>
            </h4>
            <p className="text-[11px] text-[#766A63] leading-tight mt-0.5">
              Add to Home Screen for fast offline puppy tracking
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            id="pwa-install-action-button"
            onClick={handleInstallClick}
            className="text-xs font-bold bg-[#8B5E3C] hover:bg-[#5F3E29] text-white px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Install
          </button>
          <button
            id="pwa-dismiss-button"
            onClick={handleDismiss}
            className="p-1.5 text-[#766A63] hover:text-[#2C211B] rounded-lg hover:bg-[#F3E7DA]/50 transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* iOS Manual Install Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 bg-[#2C211B]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 border border-[#E8DDD3] shadow-xl text-center">
            <PupLumeLogo variant="icon" size="md" className="mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#2C211B]">Install on iPhone / iPad</h3>
            <p className="text-xs text-[#766A63] mt-1 mb-4">
              Apple Safari does not allow silent one-tap installs, but you can add PupLume in 2 taps:
            </p>

            <div className="text-left space-y-2.5 text-xs bg-[#FFF9F2] p-3.5 rounded-xl border border-[#E8DDD3] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#8B5E3C] text-white flex items-center justify-center font-bold text-[10px]">1</span>
                <span>Tap the <strong>Share</strong> button <Share className="inline w-3.5 h-3.5 text-[#8B5E3C]" /> at bottom of Safari.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#8B5E3C] text-white flex items-center justify-center font-bold text-[10px]">2</span>
                <span>Scroll down and select <strong>"Add to Home Screen"</strong>.</span>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 bg-[#8B5E3C] text-white font-bold rounded-xl text-xs hover:bg-[#5F3E29] transition-colors cursor-pointer"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

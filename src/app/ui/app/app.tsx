import { useEffect, type FC } from 'react';
import { TrackerPage } from '@pages/tracker-page';
import { usePollLoop, useTrackerStore } from '@features/poll-control';
import { checkIsFileProtocol } from '@shared/lib/cors';

const AppContent: FC = () => {
  usePollLoop();

  return <TrackerPage />;
};

export const App: FC = () => {
  const setCorsBlocked = useTrackerStore((store) => store.setCorsBlocked);
  const setStatus = useTrackerStore((store) => store.setStatus);
  const setRunning = useTrackerStore((store) => store.setRunning);

  useEffect(() => {
    if (checkIsFileProtocol()) {
      setCorsBlocked(true);
      setRunning(false);
      setStatus('Опрос выключен - откройте через npm run dev', true);
    }
  }, [setCorsBlocked, setRunning, setStatus]);

  return <AppContent />;
};

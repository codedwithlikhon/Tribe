import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { WorkspaceApp } from './components/WorkspaceApp';

export default function App() {
  const [isWorkspaceVisible, setIsWorkspaceVisible] = useState(false);

  if (isWorkspaceVisible) {
    return <WorkspaceApp onExit={() => setIsWorkspaceVisible(false)} />;
  }

  return <LandingPage onLaunch={() => setIsWorkspaceVisible(true)} />;
}

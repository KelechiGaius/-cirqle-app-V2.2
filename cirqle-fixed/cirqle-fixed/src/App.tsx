
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AuthScreen from './components/AuthScreen';
import ProfileSetup from './components/ProfileSetup';
import InterestSelection from './components/InterestSelection';
import MatchingLoader from './components/MatchingLoader';
import ActivityVoting from './components/ActivityVoting';
import Dashboard from './components/Dashboard';
import CircleView from './components/CircleView';
import Profile from './components/Profile';
import BottomNav from './components/BottomNav';
import { User, ViewState, AppTab, ActivitySuggestion } from './types';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('auth');
  const [activeTab, setActiveTab] = useState<AppTab>('circle'); // Default to circle after flow
  const [user, setUser] = useState<User | null>(null);
  const [winningActivity, setWinningActivity] = useState<ActivitySuggestion | null>(null);

  // Step 1: Auth
  const handleAuthSuccess = (email: string) => {
    setUser({
      id: 'u1',
      name: '',
      email: email,
      avatar: '',
      location: '',
      interests: []
    });
    setViewState('profile-setup');
  };

  // Step 2: Profile Setup (Photo, Name, Age, City)
  const handleProfileComplete = (updatedUser: User) => {
    setUser(updatedUser);
    setViewState('interests');
  };

  // Step 3: Interests
  const handleInterestsComplete = (interests: string[]) => {
    if (user) {
      setUser({ ...user, interests });
      setViewState('matching');
    }
  };

  // Step 4: Matching (Animation)
  const handleMatchComplete = () => {
    setViewState('voting');
  };

  // Step 5: Activity Voting
  const handleVotingComplete = (winner: ActivitySuggestion) => {
    setWinningActivity(winner);
    setViewState('app');
    setActiveTab('circle'); // Go directly to chat
  };

  const handleLogout = () => {
    setUser(null);
    setViewState('auth');
    setWinningActivity(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        {viewState === 'auth' && (
          <AuthScreen 
            key="auth"
            onLogin={handleAuthSuccess} 
            onRegister={handleAuthSuccess} 
          />
        )}

        {viewState === 'profile-setup' && user && (
          <ProfileSetup 
            key="profile"
            user={user} 
            onComplete={handleProfileComplete} 
          />
        )}

        {viewState === 'interests' && (
          <InterestSelection 
            key="interests"
            onComplete={handleInterestsComplete} 
          />
        )}

        {viewState === 'matching' && (
          <MatchingLoader 
            key="matching"
            onComplete={handleMatchComplete} 
          />
        )}

        {viewState === 'voting' && user && (
          <ActivityVoting 
            key="voting"
            user={user}
            onComplete={handleVotingComplete} 
          />
        )}

        {viewState === 'app' && user && (
          <div key="app" className="flex-grow flex flex-col h-full overflow-hidden relative">
            <main className="flex-grow overflow-y-auto pb-20 no-scrollbar">
              {activeTab === 'home' && <Dashboard user={user} onChangeTab={setActiveTab} />}
              {activeTab === 'circle' && <CircleView user={user} winningActivity={winningActivity} />}
              {activeTab === 'profile' && <Profile user={user} onLogout={handleLogout} />}
            </main>
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

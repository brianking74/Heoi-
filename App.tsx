
import React, { useState } from 'react';
import { PERSONAS, VIBES, MOCK_EXPERIENCES, MOCK_USERS, LanternIcon } from './constants.tsx';
import { UserProfile, ItineraryResponse, MicroExperience } from './types.ts';
import Navigation from './components/Navigation.tsx';
import { generateItinerary } from './services/geminiService.ts';

// --- SUB-COMPONENTS (Defined outside App to prevent re-mounting) ---

const Paywall: React.FC<{ onClose: () => void; onUpgrade: () => void }> = ({ onClose, onUpgrade }) => (
  <div className="fixed inset-0 z-[100] bg-white flex flex-col p-10 animate-fade-in">
    <button onClick={onClose} className="absolute top-8 right-8 text-2xl font-black">✕</button>
    <div className="mt-20 space-y-8 flex-1">
      <div className="flex items-center space-x-3 text-[#de2810]">
        <LanternIcon className="w-10 h-10" />
        <span className="text-xl font-black uppercase tracking-widest italic">Elite 852</span>
      </div>
      <h2 className="text-5xl font-black tracking-tighter uppercase leading-[0.9]">Unlock the <span className="text-[#de2810]">Full City</span></h2>
      
      <ul className="space-y-6 pt-4">
        {[
          { icon: '💬', text: 'Chat with any explorer' },
          { icon: '🗺️', text: 'Unlimited AI Routes' },
          { icon: '🏮', text: 'Early Access Micro-Events' },
          { icon: '🚫', text: 'Zero Sponsored Distractions' }
        ].map((feature, i) => (
          <li key={i} className="flex items-start space-x-4">
            <span className="text-2xl">{feature.icon}</span>
            <p className="font-bold text-gray-900">{feature.text}</p>
          </li>
        ))}
      </ul>
    </div>

    <div className="space-y-4">
      <p className="text-[10px] font-black text-gray-400 uppercase text-center tracking-widest">Pricing Options</p>
      <button 
        onClick={onUpgrade}
        className="w-full bg-[#de2810] text-white py-6 rounded-3xl font-black uppercase tracking-[0.3em] shadow-2xl"
      >
        Visitor Pass - HK$78 / Week
      </button>
      <button 
        onClick={onUpgrade}
        className="w-full bg-black text-white py-6 rounded-3xl font-black uppercase tracking-[0.3em] shadow-xl"
      >
        Annual Legend - HK$488 / Year
      </button>
    </div>
  </div>
);

const ExperienceDetailView: React.FC<{ exp: MicroExperience; onClose: () => void; onStart: (exp: MicroExperience) => void; pathActive: boolean }> = ({ exp, onClose, onStart, pathActive }) => (
  <div className="fixed inset-0 z-[60] bg-white overflow-y-auto animate-fade-in pb-20">
    <div className="relative h-[60vh]">
      <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      <button 
        onClick={onClose}
        className="absolute top-12 left-8 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-xl text-black font-black"
      >
        ←
      </button>
    </div>
    
    <div className="px-8 -mt-20 relative z-10 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-[#de2810] text-[10px] font-black uppercase tracking-[0.3em]">
           <span>{exp.district}</span>
           <span>•</span>
           <span>{exp.location}</span>
        </div>
        <h2 className="text-5xl font-black text-gray-900 tracking-tighter uppercase leading-[0.9]">{exp.title}</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-8">
         <div className="space-y-1">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Effort</p>
           <p className="font-bold">{exp.difficulty}</p>
         </div>
         <div className="space-y-1">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Investment</p>
           <p className="font-bold text-[#de2810]">{exp.cost}</p>
         </div>
         <div className="space-y-1">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Time Window</p>
           <p className="font-bold">{exp.duration}</p>
         </div>
         <div className="space-y-1">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Curator</p>
           <p className="font-bold">@{exp.author}</p>
         </div>
      </div>

      {exp.address && (
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Exact Spot</h3>
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-start space-x-4">
             <span className="text-xl">📍</span>
             <p className="font-bold text-gray-900 leading-snug">{exp.address}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Exhibition Notes</h3>
        <p className="text-lg font-medium leading-relaxed text-gray-700">{exp.description}</p>
      </div>

      <div className="space-y-4">
         <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Experience Tags</h3>
         <div className="flex flex-wrap gap-2">
           {exp.vibe.map(v => (
             <span key={v} className="px-4 py-2 bg-gray-50 rounded-full text-[9px] font-black uppercase tracking-widest border border-gray-100">
               {v}
             </span>
           ))}
         </div>
      </div>

      <button 
        onClick={() => onStart(exp)}
        disabled={pathActive}
        className={`w-full text-white py-6 rounded-3xl font-black uppercase tracking-[0.3em] shadow-2xl flex items-center justify-center space-x-3 transition-all ${pathActive ? 'bg-black' : 'bg-[#de2810]'}`}
      >
         <span>{pathActive ? 'Connecting...' : 'Start Path'}</span>
         <LanternIcon className={`w-5 h-5 ${pathActive ? 'animate-pulse' : ''}`} fill="white" />
      </button>
    </div>
  </div>
);

const OnboardingView: React.FC<{ profile: UserProfile; setProfile: React.Dispatch<React.SetStateAction<UserProfile>>; onComplete: (e: React.FormEvent) => void; toggleInterest: (interest: string) => void }> = ({ profile, setProfile, onComplete, toggleInterest }) => (
  <div className="min-h-screen bg-white p-10 flex flex-col justify-between animate-fade-in overflow-hidden relative">
    <div className="absolute top-[-5%] right-[-10%] opacity-10 rotate-12">
      <LanternIcon className="w-96 h-96" />
    </div>
    
    <div className="mt-16">
      <LanternIcon className="w-20 h-20 mb-10" />
      <h1 className="text-7xl font-black text-[#de2810] tracking-tighter leading-[0.9] mb-4 uppercase">
        Heoi! <br/>
        <span className="text-gray-900">去</span>
      </h1>
      <p className="text-gray-400 font-black max-w-xs uppercase tracking-[0.2em] text-[10px]">
        Light the path to Hong Kong's most curated secrets.
      </p>
    </div>

    <form onSubmit={onComplete} className="space-y-10 mb-8 z-10">
      <div className="space-y-6">
        <input
          type="text"
          placeholder="Explorer Name"
          className="w-full text-4xl font-black border-b-4 border-gray-100 focus:border-[#de2810] outline-none py-3 transition-all placeholder:text-gray-200"
          value={profile.name}
          onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          {PERSONAS.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => setProfile(prev => ({ ...prev, persona: p.id as any }))}
              className={`p-5 rounded-2xl border-2 text-left transition-all ${
                profile.persona === p.id ? 'border-[#de2810] bg-[#de2810] text-white shadow-xl' : 'border-gray-100 text-gray-400 bg-gray-50'
              }`}
            >
              <div className="text-2xl mb-2">{p.icon}</div>
              <div className="text-[10px] font-black uppercase tracking-widest">{p.label}</div>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {VIBES.map(v => (
            <button
              key={v}
              type="button"
              onClick={() => toggleInterest(v)}
              className={`px-4 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                profile.interests.includes(v) ? 'bg-[#de2810] text-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#de2810] text-white font-black py-6 rounded-3xl shadow-2xl hover:bg-black active:scale-[0.98] transition-all uppercase tracking-[0.3em] text-sm"
      >
        Begin Journey
      </button>
    </form>
  </div>
);

const DiscoverView: React.FC<{ onSelectExperience: (exp: MicroExperience) => void }> = ({ onSelectExperience }) => (
  <div className="pb-32 pt-24 px-6 max-w-md mx-auto space-y-12">
    <header className="space-y-2">
      <div className="flex items-center space-x-2 text-[#de2810]">
        <LanternIcon className="w-5 h-5" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Heoi Lanterns</span>
      </div>
      <h2 className="text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">Discovery</h2>
    </header>

    <div className="space-y-12">
      {MOCK_EXPERIENCES.map(exp => (
        <div key={exp.id} className="group space-y-5 animate-fade-in">
          <div 
            onClick={() => onSelectExperience(exp as any)}
            className="relative aspect-[3/4] overflow-hidden rounded-[40px] shadow-2xl bg-gray-100 cursor-pointer"
          >
            <img 
              src={exp.image} 
              alt={exp.title} 
              className="w-full h-full object-cover grayscale-[0.1] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-1000" 
            />
            <div className="absolute top-8 left-8">
              <span className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                {exp.vibe[0]}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black via-black/40 to-transparent text-white">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-[#de2810]">Location: {exp.location}</p>
              <h3 className="text-3xl font-black leading-tight tracking-tight uppercase">{exp.title}</h3>
            </div>
          </div>
          <div className="flex justify-between items-center px-4">
             <div className="space-y-1">
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Duration • {exp.duration}</p>
               <p className="text-[10px] font-black uppercase tracking-widest text-[#de2810]">Price • {exp.cost}</p>
             </div>
             <button 
               onClick={() => onSelectExperience(exp as any)}
               className="bg-[#de2810] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:bg-black transition-all group-hover:scale-110"
             >
               <span className="text-2xl">↗</span>
             </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AiView: React.FC<{ prompt: string; setPrompt: (s: string) => void; onPlan: () => void; isGenerating: boolean; itinerary: ItineraryResponse | null }> = ({ prompt, setPrompt, onPlan, isGenerating, itinerary }) => (
  <div className="pb-32 pt-24 px-6 max-w-md mx-auto space-y-10">
    <header className="space-y-4">
      <h2 className="text-5xl font-black text-gray-900 leading-none uppercase tracking-tighter">AI <span className="text-[#de2810]">Light</span></h2>
      <div className="h-1 w-16 bg-[#de2810]" />
    </header>

    <div className="space-y-8 bg-gray-50 p-8 rounded-[40px] border-2 border-gray-100">
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">What's the vibe today?</p>
      <textarea
        placeholder="Describe your perfect HK afternoon..."
        className="w-full h-48 bg-transparent border-none outline-none text-lg font-bold leading-relaxed resize-none placeholder:text-gray-200"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={onPlan}
        disabled={isGenerating || !prompt}
        className="w-full bg-[#de2810] text-white font-black py-6 rounded-3xl flex items-center justify-center space-x-4 shadow-xl active:scale-95 disabled:opacity-50 transition-all uppercase tracking-[0.2em] text-xs"
      >
        {isGenerating ? <span>Illuminating Path...</span> : <><span>Plan Path</span> <LanternIcon className="w-5 h-5" fill="white" /></>}
      </button>
    </div>

    {itinerary && (
      <div className="space-y-12 animate-fade-in pt-12 border-t-2 border-gray-100">
        <div className="space-y-3">
          <span className="text-[10px] font-black text-[#de2810] uppercase tracking-[0.4em]">Guided Plan</span>
          <p className="text-2xl font-black uppercase leading-tight">{itinerary.summary}</p>
        </div>
        
        <div className="space-y-16 relative">
          <div className="absolute left-[3px] top-0 bottom-0 w-1 bg-gray-100" />
          {itinerary.items.map((item, idx) => (
            <div key={idx} className="relative pl-12">
              <div className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full bg-[#de2810] shadow-[0_0_10px_#de2810]" />
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{item.time} • {item.location}</div>
              <h4 className="font-black text-2xl mb-3 uppercase tracking-tight">{item.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const SocialView: React.FC<{ onChatRequest: (user: any) => void }> = ({ onChatRequest }) => (
  <div className="pb-32 pt-24 px-6 max-w-md mx-auto space-y-10">
    <header className="space-y-2">
      <div className="flex items-center space-x-2 text-[#de2810]">
        <span className="text-xl">🤝</span>
        <span className="text-[10px] font-black uppercase tracking-[0.4em]">852 Connection</span>
      </div>
      <h2 className="text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">Fellow <br/><span className="text-[#de2810]">Explorers</span></h2>
    </header>

    <div className="space-y-10">
      {MOCK_USERS.map(user => (
        <div key={user.id} className="group relative space-y-5 animate-fade-in">
          <div className="relative aspect-square overflow-hidden rounded-[40px] shadow-2xl bg-gray-100">
            <img src={user.photo} alt={user.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-[#de2810] text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest">{user.persona}</span>
              </div>
              <h3 className="text-4xl font-black uppercase tracking-tighter">{user.name}</h3>
              <p className="text-xs font-medium text-gray-300 mt-2 line-clamp-2 italic">"{user.bio}"</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {user.interests.map(i => (
                  <span key={i} className="text-[8px] font-black uppercase border border-white/30 px-2 py-0.5 rounded-full">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex space-x-4 px-2">
            <button 
              onClick={() => alert(`Connection request sent to ${user.name}!`)}
              className="flex-1 bg-gray-100 text-black py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all"
            >
              Connect
            </button>
            <button 
              onClick={() => onChatRequest(user)}
              className="flex-1 bg-[#de2810] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-black transition-all"
            >
              Chat
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [profile, setProfile] = useState<UserProfile>({
    id: 'me',
    name: '',
    persona: 'traveler',
    interests: [],
    budget: 'medium',
    isOpenToMeet: false,
    onboarded: false,
    bio: '',
    isPremium: false
  });

  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<MicroExperience | null>(null);
  const [pathActive, setPathActive] = useState(false);

  const handleOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.name && profile.interests.length > 0) {
      setProfile(prev => ({ ...prev, onboarded: true }));
    }
  };

  const toggleInterest = (interest: string) => {
    setProfile(prev => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const handleAiPlan = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    try {
      const result = await generateItinerary(aiPrompt, {
        persona: profile.persona,
        interests: profile.interests,
        budget: profile.budget
      });
      setItinerary(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleChatRequest = (user: any) => {
    if (!profile.isPremium) {
      setShowPaywall(true);
    } else {
      alert(`Chat with ${user.name} starting...`);
    }
  };

  const upgradeToPremium = () => {
    setProfile(p => ({ ...p, isPremium: true }));
    setShowPaywall(false);
    alert("Welcome to the Elite 852! You are now Premium.");
  };

  const handleStartPath = (exp: MicroExperience) => {
    setPathActive(true);
    setTimeout(() => {
      setPathActive(false);
      alert(`Path to ${exp.title} initiated! Opening local map guide...`);
    }, 1500);
  };

  if (!profile.onboarded) {
    return (
      <OnboardingView 
        profile={profile} 
        setProfile={setProfile} 
        onComplete={handleOnboarding} 
        toggleInterest={toggleInterest} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {showPaywall && <Paywall onClose={() => setShowPaywall(false)} onUpgrade={upgradeToPremium} />}
      {selectedExperience && (
        <ExperienceDetailView 
          exp={selectedExperience} 
          onClose={() => setSelectedExperience(null)} 
          onStart={handleStartPath} 
          pathActive={pathActive} 
        />
      )}
      
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-xl border-b-2 border-gray-50 flex items-center justify-between px-8 z-40 max-w-md mx-auto">
        <div className="flex items-center space-x-3">
          <LanternIcon className="w-6 h-6" />
          <span className="text-2xl font-black italic text-[#de2810] tracking-tighter uppercase">Heoi!</span>
          {profile.isPremium && <span className="text-[8px] font-black bg-[#de2810] text-white px-2 py-0.5 rounded-full tracking-tighter">ELITE</span>}
        </div>
        <button onClick={() => setActiveTab('profile')} className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden border-4 border-white shadow-xl">
           <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${profile.name}`} alt="Avatar" className="w-full h-full" />
        </button>
      </header>

      <main>
        {activeTab === 'discover' && <DiscoverView onSelectExperience={(exp) => setSelectedExperience(exp)} />}
        {activeTab === 'ai' && (
          <AiView 
            prompt={aiPrompt} 
            setPrompt={setAiPrompt} 
            onPlan={handleAiPlan} 
            isGenerating={isGenerating} 
            itinerary={itinerary} 
          />
        )}
        {activeTab === 'meetups' && <SocialView onChatRequest={handleChatRequest} />}
        {activeTab === 'profile' && (
          <div className="pb-32 pt-24 px-8 max-w-md mx-auto space-y-16">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-8 border-gray-50 p-2 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-gray-100 overflow-hidden">
                     <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${profile.name}`} className="w-full h-full" alt="Me" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-[#de2810] p-3 rounded-full shadow-xl">
                  <LanternIcon className="w-5 h-5" fill="white" />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-4xl font-black uppercase tracking-tighter">{profile.name || 'Anonymous'}</h2>
                <div className="flex items-center justify-center space-x-2 mt-2">
                   <p className="text-[10px] font-black text-[#de2810] uppercase tracking-[0.4em]">{profile.persona} Explorer</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {!profile.isPremium && (
                <div className="bg-gray-900 rounded-[40px] p-8 text-white space-y-4">
                  <h4 className="text-2xl font-black uppercase leading-tight tracking-tighter">Join the Elite</h4>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed">Unlock chat, unlimited AI planning, and priority matching with fellow explorers.</p>
                  <button 
                    onClick={() => setShowPaywall(true)}
                    className="w-full bg-[#de2810] py-4 rounded-2xl font-black uppercase tracking-widest text-[10px]"
                  >
                    Go Premium
                  </button>
                </div>
              )}

              <div className="space-y-4">
                <button 
                  className="w-full bg-black text-white font-black py-6 rounded-3xl uppercase tracking-[0.3em] text-[10px] shadow-xl"
                  onClick={() => setProfile(p => ({ ...p, onboarded: false }))}
                >
                  Edit Profile
                </button>
                <button className="w-full border-4 border-gray-50 text-gray-300 font-black py-6 rounded-3xl uppercase tracking-[0.3em] text-[10px]">
                  Safety & Privacy
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;

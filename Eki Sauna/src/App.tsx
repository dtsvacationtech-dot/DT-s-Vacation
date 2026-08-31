import { MemberCardPage } from './components/CustomerPages/MemberCardPage';
import { INITIAL_MEMBER } from './mockData';

export function App() {
  return (
    <main className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col items-center justify-start">
      <MemberCardPage member={INITIAL_MEMBER} />
    </main>
  );
}

export default App;

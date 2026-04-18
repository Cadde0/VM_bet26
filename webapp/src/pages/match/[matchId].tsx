import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from '@/context/SessionContext';

interface Match {
    id: number;
    home_team: string;
    away_team: string;
    home_team_flag?: string;
    away_team_flag?: string;
    start_time: string;
    result: string | null;
    status: 'scheduled' | 'in_progress' | 'finished';
}

interface Guess {
    id: string;
    user_id: string;
    match_id: number;
    predicted_result: string;
    timestamp: string;
}

export default function MatchDetail() {
    const router = useRouter();
    const { matchId } = router.query;
    const { user } = useSession();
    const [match, setMatch] = useState<Match | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [guess, setGuess] = useState<Guess | null>(null);
    const [homeGoals, setHomeGoals] = useState('');
    const [awayGoals, setAwayGoals] = useState('');
    const [guessLoading, setGuessLoading] = useState(false);
    const [guessMsg, setGuessMsg] = useState('');

    // Fetch match details
    useEffect(() => {
        if (!matchId) return;
        async function fetchMatch() {
            setLoading(true);
            setError('');
            try {
                const res = await fetch(`/api/matches/${matchId}`);
                if (!res.ok) throw new Error('Failed to fetch match');
                const data = await res.json();
                setMatch(data.match || data.data || null);
            } catch (e: any) {
                setError(e.message || 'Error loading match');
            }
            setLoading(false);
        }
        fetchMatch();
    }, [matchId]);

    // Fetch user's guess for this match
    useEffect(() => {
        if (!matchId || !user) return;
        async function fetchGuess() {
            try {
                const res = await fetch(`/api/guesses?me=1`);
                if (!res.ok) return;
                const data = await res.json();
                const found = (data.data || []).find((g: Guess) => String(g.match_id) === String(matchId));
                setGuess(found || null);
                if (found?.predicted_result) {
                    const [h, a] = found.predicted_result.split('-');
                    setHomeGoals(h ?? '');
                    setAwayGoals(a ?? '');
                } else {
                    setHomeGoals('');
                    setAwayGoals('');
                }
            } catch { }
        }
        fetchGuess();
    }, [matchId, user]);

    async function handleGuessSubmit(e: React.FormEvent) {
        e.preventDefault();
        setGuessMsg('');
        setGuessLoading(true);
        const predicted_result = `${homeGoals}-${awayGoals}`;
        try {
            const res = await fetch('/api/guesses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ match_id: matchId, predicted_result })
            });
            if (res.ok) {
                setGuessMsg('Guess saved!');
            } else {
                const data = await res.json();
                setGuessMsg(data.error || 'Failed to save guess');
            }
        } catch (e: any) {
            setGuessMsg('Error saving guess');
        }
        setGuessLoading(false);
    }

    if (loading) return <div className="flex justify-center items-center min-h-screen">Loading match...</div>;
    if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;
    if (!match) return <div className="text-center mt-8">Match not found.</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center py-8">
            <div className="w-full max-w-lg bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    {match.home_team_flag && (
                        <img src={match.home_team_flag} alt="" className="inline w-8 h-8 rounded-sm bg-white" />
                    )}
                    {match.home_team}
                    <span className="mx-2 text-gray-400">vs</span>
                    {match.away_team_flag && (
                        <img src={match.away_team_flag} alt="" className="inline w-8 h-8 rounded-sm bg-white" />
                    )}
                    {match.away_team}
                </h1>
                <div className="mb-2"><span className="font-semibold">Start Time:</span> {new Date(match.start_time).toLocaleString()}</div>
                <div className="mb-2"><span className="font-semibold">Status:</span> <span className="capitalize">{match.status.replace('_', ' ')}</span></div>
                <div className="mb-2"><span className="font-semibold">Result:</span> {match.result || '-'}</div>

                {user && (
                    <form onSubmit={handleGuessSubmit} className="mt-6 flex flex-col items-center gap-2">
                        <label className="font-semibold mb-1">Your Guess:</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                min="0"
                                value={homeGoals}
                                onChange={e => setHomeGoals(e.target.value.replace(/[^0-9]/g, ''))}
                                className="border rounded px-3 py-1 text-center w-16"
                                required
                                disabled={guessLoading}
                                aria-label={`Goals for ${match.home_team}`}
                            />
                            <span className="text-gray-400">-</span>
                            <input
                                type="number"
                                min="0"
                                value={awayGoals}
                                onChange={e => setAwayGoals(e.target.value.replace(/[^0-9]/g, ''))}
                                className="border rounded px-3 py-1 text-center w-16"
                                required
                                disabled={guessLoading}
                                aria-label={`Goals for ${match.away_team}`}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-50 cursor-pointer"
                            disabled={guessLoading || homeGoals === '' || awayGoals === ''}
                        >
                            {guessLoading ? 'Saving...' : (guess ? 'Update Guess' : 'Submit Guess')}
                        </button>
                        {guessMsg && <div className="text-green-600 text-sm mt-1">{guessMsg}</div>}
                    </form>
                )}

                <Link href="/matches" className="inline-block mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer">Back to Matches</Link>
            </div>
        </div>
    );
}

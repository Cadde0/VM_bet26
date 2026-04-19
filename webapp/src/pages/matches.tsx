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


export default function MatchList() {
    const { user } = useSession();
    const [matches, setMatches] = useState<Match[]>([]);
    const [guesses, setGuesses] = useState<Record<number, string>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editMatchId, setEditMatchId] = useState<number | null>(null);
    const [editHomeGoals, setEditHomeGoals] = useState('');
    const [editAwayGoals, setEditAwayGoals] = useState('');
    const [editLoading, setEditLoading] = useState(false);
    const [editMsg, setEditMsg] = useState('');

    useEffect(() => {
        async function fetchMatchesAndGuesses() {
            setLoading(true);
            setError('');
            try {
                const res = await fetch('/api/matches/list');
                if (!res.ok) throw new Error('Failed to fetch matches');
                const data = await res.json();
                setMatches(data.matches || data.data || []);

                if (user) {
                    const guessRes = await fetch('/api/guesses?me=1');
                    if (guessRes.ok) {
                        const guessData = await guessRes.json();
                        // Map guesses by match_id for quick lookup
                        const guessMap: Record<number, string> = {};
                        (guessData.data || []).forEach((g: any) => {
                            guessMap[g.match_id] = g.predicted_result;
                        });
                        setGuesses(guessMap);
                    }
                }
            } catch (e: any) {
                setError(e.message || 'Error loading matches');
            }
            setLoading(false);
        }
        fetchMatchesAndGuesses();
    }, [user]);

    if (loading) return <div className="flex justify-center items-center min-h-screen">Loading matches...</div>;
    if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center py-8">
            <h1 className="text-3xl font-bold mb-6">World Cup Matches</h1>
            <div className="w-full max-w-2xl bg-white rounded-lg shadow p-4">
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="py-2">Match</th>
                            <th className="py-2">Start Time</th>
                            <th className="py-2">Status</th>
                            <th className="py-2">Result</th>
                            <th className="py-2">Your Guess</th>
                            <th className="py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map(match => {
                            const isEditing = editMatchId === match.id;
                            const guessValue = guesses[match.id] || '';
                            return (
                                <tr key={match.id} className="border-t hover:bg-indigo-50 transition-colors">
                                    <td className="py-2 font-semibold flex items-center gap-2">
                                        {match.home_team_flag && (
                                            <img src={match.home_team_flag} alt="" className="inline w-6 h-6 rounded-sm bg-white" />
                                        )}
                                        {match.home_team}
                                        <span className="mx-1 text-gray-400">vs</span>
                                        {match.away_team_flag && (
                                            <img src={match.away_team_flag} alt="" className="inline w-6 h-6 rounded-sm bg-white" />
                                        )}
                                        {match.away_team}
                                    </td>
                                    <td className="py-2">{new Date(match.start_time).toLocaleString()}</td>
                                    <td className="py-2 capitalize">{match.status.replace('_', ' ')}</td>
                                    <td className="py-2">{match.result || '-'}</td>
                                    <td className="py-2 font-mono text-blue-700">
                                        {isEditing ? (
                                            <form
                                                className="flex items-center gap-1"
                                                onSubmit={async e => {
                                                    e.preventDefault();
                                                    setEditLoading(true);
                                                    setEditMsg('');
                                                    const predicted_result = `${editHomeGoals}-${editAwayGoals}`;
                                                    try {
                                                        const res = await fetch('/api/guesses', {
                                                            method: 'POST',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ match_id: match.id, predicted_result })
                                                        });
                                                        if (res.ok) {
                                                            setEditMsg('Saved!');
                                                            setGuesses(g => ({ ...g, [match.id]: predicted_result }));
                                                            setEditMatchId(null);
                                                        } else {
                                                            const data = await res.json();
                                                            setEditMsg(data.error || 'Failed to save');
                                                        }
                                                    } catch {
                                                        setEditMsg('Error saving');
                                                    }
                                                    setEditLoading(false);
                                                }}
                                            >
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className="w-10 px-1 py-0.5 border rounded text-center"
                                                    value={editHomeGoals}
                                                    onChange={e => setEditHomeGoals(e.target.value)}
                                                    required
                                                />
                                                <span>-</span>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className="w-10 px-1 py-0.5 border rounded text-center"
                                                    value={editAwayGoals}
                                                    onChange={e => setEditAwayGoals(e.target.value)}
                                                    required
                                                />
                                                <button
                                                    type="submit"
                                                    className="ml-2 bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs font-medium"
                                                    disabled={editLoading}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    className="ml-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded text-xs font-medium"
                                                    onClick={() => setEditMatchId(null)}
                                                >
                                                    Cancel
                                                </button>
                                                {editMsg && <span className="ml-2 text-xs text-green-700">{editMsg}</span>}
                                            </form>
                                        ) : (
                                            <>
                                                {guessValue ? (
                                                    <span>{guessValue}</span>
                                                ) : (
                                                    <span className="text-gray-400">-</span>
                                                )}
                                                {user && (
                                                    <button
                                                        className="ml-2 text-xs text-blue-600 underline hover:text-blue-800"
                                                        onClick={() => {
                                                            setEditMatchId(match.id);
                                                            const [h, a] = (guessValue || '').split('-');
                                                            setEditHomeGoals(h || '');
                                                            setEditAwayGoals(a || '');
                                                            setEditMsg('');
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </td>
                                    <td className="py-2">
                                        <Link href={`/match/${match.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded cursor-pointer text-sm font-medium">View</Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

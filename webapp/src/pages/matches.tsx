import { useEffect, useState } from 'react';
import Link from 'next/link';

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
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchMatches() {
            setLoading(true);
            setError('');
            try {
                const res = await fetch('/api/matches');
                if (!res.ok) throw new Error('Failed to fetch matches');
                const data = await res.json();
                setMatches(data.matches || data.data || []);
            } catch (e: any) {
                setError(e.message || 'Error loading matches');
            }
            setLoading(false);
        }
        fetchMatches();
    }, []);

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
                            <th className="py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map(match => (
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
                                <td className="py-2">
                                    <Link href={`/match/${match.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded cursor-pointer text-sm font-medium">View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

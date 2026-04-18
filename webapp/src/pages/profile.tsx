import { useRouter } from 'next/router';
import { useSession } from '@/context/SessionContext';

export default function Profile() {
    const { user, loading, logout } = useSession();
    const router = useRouter();

    if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    if (!user) {
        if (typeof window !== 'undefined') router.push('/login');
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Profile</h2>
                <div className="mb-4">
                    <span className="font-semibold">Name:</span> {user.name}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Points:</span> {user.points}
                </div>
                <button
                    className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    onClick={async () => {
                        await logout();
                        router.push('/login');
                    }}
                >
                    Log out
                </button>
            </div>
        </div>
    );
}

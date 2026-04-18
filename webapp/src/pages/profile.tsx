import { useRouter } from 'next/router';
import { useSession } from '@/context/SessionContext';
import { useRef, useState } from 'react';

export default function Profile() {
    const { user, loading, logout, refresh } = useSession();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    if (!user) {
        if (typeof window !== 'undefined') router.push('/login');
        return null;
    }

    async function handleUpload(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        if (!selectedFile) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('userId', user.id);
        const res = await fetch('/api/profile-picture', {
            method: 'POST',
            body: formData,
        });
        setUploading(false);
        if (res.ok) {
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            await refresh();
        } else {
            const data = await res.json();
            setError(data.error || 'Upload failed');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Profile</h2>
                {user.profilePictureUrl && (
                    <img
                        src={user.profilePictureUrl}
                        alt="Profile"
                        className="mx-auto mb-4 w-24 h-24 rounded-full object-cover border"
                    />
                )}
                <form onSubmit={handleUpload} className="mb-4 flex flex-col items-center gap-2 w-full">
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            id="profile-upload"
                            className="hidden"
                            onChange={e => {
                                const file = e.target.files?.[0] || null;
                                setSelectedFile(file);
                            }}
                        />
                        <label
                            htmlFor="profile-upload"
                            className="cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded shadow transition-colors duration-150 text-sm font-medium"
                        >
                            {selectedFile ? 'Change Image' : 'Choose Image'}
                        </label>
                        <span className="text-gray-600 text-xs truncate max-w-[120px]">
                            {selectedFile ? selectedFile.name : ''}
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow disabled:opacity-50 transition-colors duration-150 text-base font-semibold mt-2 cursor-pointer disabled:cursor-not-allowed"
                        disabled={uploading || !selectedFile}
                    >
                        {uploading ? 'Uploading...' : 'Upload Picture'}
                    </button>
                </form>
                {error && <div className="text-red-600 mb-2">{error}</div>}
                <div className="mb-4">
                    <span className="font-semibold">Name:</span> {user.name}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Points:</span> {user.points}
                </div>
                <button
                    className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 cursor-pointer"
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

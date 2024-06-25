interface Stats{
    followers: number;
    public_repos: number;
    organization: number;
    public_gists: number;
    pull_requests: number;
    issues: number;
    commits: number;
    stars:number
}

const StatsCard: React.FC<{ stats: Stats }> = ({ stats }) => {
    return (
        <div className="rounded-lg shadow-lg text-white mt-8 p-6 border border-gray-600 w-full sm:w-4/5 lg:w-2/3">
            <h2 className="text-2xl font-semibold mb-4">GitHub Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-700">
                <div className="py-4 border-b border-gray-700">
                    <p className="text-2xl font-bold">{stats.followers}</p>
                    <p className="text-gray-400">Followers</p>
                </div>
                <div className="py-4 border-b border-gray-700">
                    <p className="text-2xl font-bold">{stats.public_repos}</p>
                    <p className="text-gray-400">Repositories</p>
                </div>
                <div className="py-4 border-b border-gray-700">
                    <p className="text-2xl font-bold">{stats.organization}</p>
                    <p className="text-gray-400">Organizations</p>
                </div>
                <div className="py-4 border-b border-gray-700">
                    <p className="text-2xl font-bold">{stats.public_gists}</p>
                    <p className="text-gray-400">Gists</p>
                </div>
                <div className="py-4 border-b border-gray-700">
                    <p className="text-2xl font-bold">{stats.pull_requests}</p>
                    <p className="text-gray-400">Pull Requests</p>
                </div>
                <div className="py-4 border-b border-gray-700">
                    <p className="text-2xl font-bold">{stats.issues}</p>
                    <p className="text-gray-400">Issues</p>
                </div>
                <div className="py-4 border-b border-gray-700">
                    <p className="text-2xl font-bold">{stats.commits}</p>
                    <p className="text-gray-400">Commits</p>
                </div>
                <div className="py-4 border-b border-gray-700">
                    <p className="text-2xl font-bold">{stats.stars}</p>
                    <p className="text-gray-400">Stars Earned</p>
                </div>
            </div>
        </div>
    );
}

export default StatsCard;

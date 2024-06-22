function RepoList({ repos }: { repos: any[] }) {
    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold mb-4">Repositories : {repos.length}</h2>
            <ul className="space-y-4">
                {repos.map((repo) => (
                    <li key={repo.id} className="p-4">
                        <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl font-semibold"
                        >
                            {repo.name}
                        </a>
                        <p className="text-gray-400">{repo.description}</p>
                        <div className="mt-2">
                            <span className="inline-block bg-blue-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">
                                Stars: {repo.stargazers_count}
                            </span>
                            <span className="inline-block bg-green-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">
                                Forks: {repo.forks_count}
                            </span>
                            <span className="inline-block bg-yellow-600 rounded-full px-3 py-1 text-sm font-semibold text-white">
                                Issues: {repo.open_issues_count}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RepoList;

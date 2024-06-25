import axios from "axios";
import { useEffect, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import StatsCard from './StatsCard';

function UserProfile() {
    const { userName } = useParams();
    const location = useLocation();
    const [user, setUser] = useState(location.state?.user || null);
    const [repos, setRepos] = useState<{ id: number; html_url: string; name: string; description: string }[]>([]);
    const [stats, setStats] = useState({
        followers: 0,
        public_repos: 0,
        public_gists: 0,
        organization: 0,
        pull_requests: 0,
        issues: 0,
        commits: 0,
        stars: 0
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(`https://api.github.com/users/${userName}`);
                setUser(userResponse.data);

                const reposResponse = await axios.get(`https://api.github.com/users/${userName}/repos`);
                setRepos(reposResponse.data);

                const eventsResponse = await axios.get(`https://api.github.com/users/${userName}/events`);
                const events = eventsResponse.data;

                let pullRequests = 0;
                let issues = 0;
                let commits = 0;
                let stars = 0;

                events.forEach((event: { type: any; payload: { commits: string | any[]; }; }) => {
                    switch (event.type) {
                        case "PullRequestEvent":
                            pullRequests += 1;
                            break;
                        case "IssuesEvent":
                            issues += 1;
                            break;
                        case "PushEvent":
                            commits += event.payload.commits.length;
                            break;
                        case "WatchEvent":
                            stars += 1;
                            break;
                        default:
                            break;
                    }
                });

                setStats({
                    followers: userResponse.data.followers,
                    public_repos: userResponse.data.public_repos,
                    public_gists: userResponse.data.public_gists,
                    organization: userResponse.data.company ? 1 : 0,
                    pull_requests: pullRequests,
                    issues: issues,
                    commits: commits,
                    stars: stars
                });

            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, [userName]);

    return (
        <div className="flex flex-col items-center min-h-screen text-white px-4 sm:px-0">
            {user && (
                <>
                    <div className="flex flex-col sm:flex-row items-center max-w-screen-lg">
                        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                            <img
                                className="rounded-full border-4 border-gray-600 w-32 h-32 sm:w-48 sm:h-48 mb-4 sm:mb-0 sm:mr-8"
                                src={user.avatar_url}
                                alt={user.name}                            
                            />
                        </a>

                        <div className="text-center sm:text-left">
                            <h2 className="text-white font-bold text-4xl sm:text-6xl">{user.name}</h2>
                            <h3 className="text-gray-400 text-xl sm:text-2xl">@{user.login.toLowerCase()}</h3>

                            <p className="py-2 font-semibold">
                                <FaCalendar className="inline-block ml-0 mr-3" />
                                <span className="ml-0 align-middle text-md">
                                    Joined on{" "}
                                    {new Date(user.created_at).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </span>
                            </p>

                            <p className="text-gray-300 text-lg sm:md:max-w-lg sm:line-clamp-2">
                                {user.bio}
                            </p>
                        </div>
                    </div>

                    <StatsCard stats={{ ...stats }} />

                    <div className="w-full mx-auto mt-8 sm:w-4/5 lg:w-2/3">
                        <h2 className="text-2xl font-semibold mb-4">Repositories</h2>
                        <ul>
                            {repos.map((repo) => (
                                <li key={repo.id} className="border-b border-gray-700 py-4">
                                    <a href={repo.html_url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                                        {repo.name}
                                    </a>
                                    <p className="text-gray-400">{repo.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}

export default UserProfile;

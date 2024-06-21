import axios from "axios";
import { useEffect, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom"

function UserProfile() {

    const { userName } = useParams();
    const location = useLocation();
    const [user, setUser] = useState(location.state.user || null);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        if(!user){
            const fetchUser = async (userName : string) => {
                try{
                    setLoading(true);
                    const response = await axios.get(`https://api.github.com/users/${userName}`);
                    setUser(response.data);
                }
                catch(error){
                    console.log(error);
                }
                finally{
                    setLoading(false);
                }
            }
        }
    }, [userName, user])

  return (
    <div className="flex flex-col items-center p-8 min-h-screen text-white">
      {loading && <p>Loading...</p>}
      {user && (
        <div className="flex items-center max-w-screen-lg">
          <img
            className="rounded-full border-4 border-gray-600 w-48 h-48 mr-8"
            src={user.avatar_url}
            alt={user.name}
          />

          <div>
            <h2 className="text-white font-semibold text-3xl">{user.name}</h2>
            <h3 className="text-white">@{user.login}</h3>

            <p>
              <FaCalendar className="inline-block ml-0 mr-3" />
              <span className="ml-0 align-middle">
                Joined on{" "}
                {new Date(user.created_at).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </p>

            <p className="text-white md:max-w-lg md:line-clamp-2">
              {user.bio}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile
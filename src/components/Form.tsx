import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUserName(event.target.value);
    }

    const fetchUser = async (userName: string) => {
        try {
            setLoading(true);
            const response = await axios.get('https://api.github.com/users/' + userName);
            const repos = await axios.get('https://api.github.com/users/' + userName + '/repos');
            response.data.repos = repos.data;
            navigate(`/${userName}`, { state: { user: response.data } });
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (userName) {
            fetchUser(userName);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-2">
            <input 
                type='text' 
                value={userName} 
                onChange={handleUserNameChange} 
                className='text-white border rounded-full w-3/4 xl:w-96 h-12 align-middle border-l-slate-100 pl-4' 
                placeholder='Enter GitHub Username'>
            </input>
            <button
                type='submit'
                className='text-black font-semibold bg-slate-300 rounded-full w-1/2 xl:w-24 h-12 hover:bg-slate-200'
            >
                {loading ? 'Loading...' : 'Search'}
            </button>
        </form>
    )
}

export default Form;

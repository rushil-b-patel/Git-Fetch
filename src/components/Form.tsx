import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>):void =>{
        setUserName(event.target.value);
    }

    const fetchUser = async (userName : string) => {
        try{
            setLoading(true);
            const response = await axios.get('https://api.github.com/users/'+userName);
            navigate(`/${userName}`, {state: {user: response.data}});
            console.log(response.data);
        }
        catch(error){
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    }
    
    const handleSubmit = (event: React.FormEvent) =>{
        event.preventDefault();
        if(userName){
            fetchUser(userName);
        }
    }

    return (
    <form onSubmit={handleSubmit} className="flex justify-center">
            <input 
                type='text' value={userName} onChange={handleUserNameChange} 
                className='text-white border rounded-full w-96 h-12 align-middle  border-l-slate-100 pl-4' 
                placeholder='Enter github Username'>
            </input>
            <button
                type='submit'
                className='text-black bg-slate-300 rounded-full w-24 h-12 ml-2'
            >
                {loading ? 'Loading...' : 'Search'}
            </button>
    </form>
  )
}

export default Form
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation.js"
import useGetConversation from "../../hooks/useGetConversation.js"
import toast from "react-hot-toast";
const SearchInput = () => {
	const [search,setSearch]=useState("");
    const {setSelectedConversation}=useConversation();
	const {conversations}=useGetConversation();
	const handleSubmit=(e)=>{
		e.preventDefault();
		if(!search){return}
		if(search.length<3){return toast.error("search keyword must be atleast 3 character long");}

		const conversation=conversations.find((c)=>c.fullname.toLowerCase().includes(search.toLowerCase()));

		if(conversation){
			setSelectedConversation(conversation)
			setSearch("");

		}else{
			toast.error("no such user found!");
			
		}
	}
	return (
		<form className='flex items-center gap-2' onSubmit={handleSubmit}>
			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' value={search} onChange={(e)=>{setSearch(e.target.value)}} />
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;

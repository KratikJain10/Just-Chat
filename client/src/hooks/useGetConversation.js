import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useGetConversation = () => {
      const [loading,setLoading]=useState(false);
      const [conversations,setConversations]=useState([]);
      
      useEffect(()=>{

        const getConversations=async()=>{
            setLoading(true);
            try {
                const res=await fetch("/api/users"); //no need to put any options as its a get request
                const data=await res.json(); 
                if(data.error){
                    throw new Error(data.error);
                }        
                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        }


           getConversations();
      },[]);


      return {loading,conversations};
}

export default useGetConversation
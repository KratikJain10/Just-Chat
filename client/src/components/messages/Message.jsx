import { useAuthContext } from "../../context/AuthContext.jsx";
import { extractTime } from "../../utils/extractTime.js";
import useConversation from "../../zustand/useConversation.js";
const Message = ({message}) => {
	const {authUser}=useAuthContext();
    const {selectedConversation}=useConversation();
	const fromme=message.senderId===authUser._id;
	const formattedTime=extractTime(message.createdAt);
    const chatClassName=fromme?'chat-end':'chat-start';
	const profilePic=fromme?authUser.profilePic:selectedConversation?.profilePic;
	const bbgcol=fromme?'bg-blue-500':'bg-gray-400';
	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bbgcol}`}>{message.message}</div>
			<div className={'chat-footer opacity-50 text-xs flex gap-1 items-center'}>{formattedTime}</div>
		</div>
	);
};
export default Message;
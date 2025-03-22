import { useLocation } from "react-router-dom";
import { get_user_profile, toggleLike, get_username, get_legoset_comments, toggleSave, post_legoset_comment } from "../api/endpoints";
import { useContext, useState, useEffect } from "react";
import { useAuth } from "../context";
import { FaHeart, FaRegHeart } from "react-icons/fa6";


function SetPage(props){
    const location = useLocation();
    const receivedObject = location.state;
    console.log(receivedObject)
    const set_num = receivedObject['set'].num
    const name = receivedObject['set'].name
    const pieces = receivedObject['set'].pieces
    const img_url = receivedObject['set'].img

    console.log(set_num, name, pieces, img_url)

    const [liked, setLiked] = useState(false)
    const [saved, setSaved] = useState(false)


    // TOGGLE LIKE
    const handleToggleLike = async () => {
        const data = await toggleLike(set_num, name, pieces, img_url)
        if (data.liked){
            setLiked(true)
        }else {
            setLiked(false)
        }
    }

    //TOGGLE SAVE
    const handleToggleSave = async () => {
        const data = await toggleSave(set_num, name, pieces, img_url)
        if (data.saved){
            setSaved(true)
        }else {
            setSaved(false)
        }
    }

    // GET USERNAME
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const data = await get_username();
                setUsername(data.username);
            } catch (error) {
                console.error("Error fetching username:", error);
            }
        };

        fetchUsername();
    }, []); 

    // GET USER DATA
    useEffect(() => {
        const fetchUserData = async () => {
            if(!username) {
                return
            }

            try {
                const userData = await get_user_profile(username);  // Fetch the user profile
                const likedSets = userData.likes.map(set => set.set_num);
                const savedSets = userData.saves.map(set => set.set_num);
                setLiked(likedSets.includes(set_num));
                setSaved(savedSets.includes(set_num))
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserData();
    }, [username, set_num]);  // Only runs when the set changes

 

    return (
        <div className="flex flex-col items-center m-10 space-y-5 w-full max-w-full m-0">
            {receivedObject && (
                <>
                <div className="flex flex-col align-start w-3/5 m-0">
                    <img className="aspect-9/6 rounded-lg object-cover" src={receivedObject['set'].img} alt="" />
                    <p className="flex justify-between mt-1 text-lg font-medium text-gray-900 w-full ">{receivedObject['set'].name} 
                        <span className="flex gap-3">
                            <button onClick={handleToggleLike} className="border flex py-2 w-10 justify-center align-center rounded-md text-sm cursor-pointer hover:bg-gray-300">{liked ?  <FaHeart /> : <FaRegHeart /> }</button>
                            <button onClick={handleToggleSave} className="border p-1 w-16 rounded-md text-sm cursor-pointer hover:bg-gray-300">{saved ? 'Unsave' : 'Save'}</button>
                        </span>
                    </p>
                    <p className="mb-3 text-lg text-gray-700">{receivedObject['set'].pieces} pieces</p>
                </div>
                <div className="flex justify-center align-center">
                    <CommentSection set_num={set_num} name={name} img_url={img_url} pieces={pieces} />
                </div>   
                </>
            )}
      
        </div>
    )
}


export default SetPage

export function CommentSection({ set_num, name, pieces, img_url }){

    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState("")

    // GET SET COMMENTS
    useEffect(() => {

        const fetchComments = async () => {
            try{
               const comments = await get_legoset_comments(set_num)
               setComments(comments)
            }catch (error){
                console.error(error)
            }finally{
                setLoading(false)
            }
        }

        fetchComments()
    }, [set_num])

    // POST SET COMMENTS
    const handlePostComment = async (e) => {
        e.preventDefault()

        try{
            const newComment = await post_legoset_comment(content, set_num, name, pieces, img_url)
            setComments(prevComments => [...prevComments, newComment]);
            // Clear input field
            setContent("");
            console.log('New comment from backend:', newComment);
        }catch (error){
            console.error(error)
        }finally {
            console.log('done')
        }
        
    }

    // {
    //     "id": 14,
    //     "username": "christina",
    //     "lego_set": "Imperial Star Destroyer",
    //     "content": "10",
    //     "formatted_date": "Mar 21 25"
    // }

    return (
        <div className="flex flex-col items-start space-y-2 py-15 w-full">
            <h1 className="text-lg font-medium">Comments</h1>
            <form action="" className="">
                <input onChange={(e) => setContent(e.target.value)} value={content} className="border p-2 rounded-md mr-2 w-150" type="text" placeholder="comment here"/>
                <button  onClick={(e) => handlePostComment(e)} className="border p-2 rounded-md text-sm cursor-pointer hover:bg-gray-300">Comment</button>
            </form>
            <div className="flex flex-col space-y-5 mt-6">
            {/* {!comments.some(c => c.content === content) && content && (
                <div className="border rounded-md p-3 w-100">
                    <h1 className="flex mb-2 font-medium justify-between">@you <span className="font-light text-xs text-gray-500">Just now</span></h1>
                    <p className="font-light">{content}</p>
                </div>
            )} */}
                {loading ? <div>loading</div> : 
                    comments.map((comment) => {
                    return (
                        <div key={comment.id} className="border rounded-md p-3 w-150">
                            <h1 className="flex mb-2  font-medium justify-between">@{comment.username} <span className="font-light text-xs text-gray-500">{comment.formatted_date}</span></h1> 
                            <p className="font-light">{comment.content}</p>
                        </div>
                    )
                }) }
                
            </div>
        </div>
    )
}
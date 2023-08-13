import { Post as iPost } from "./main";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  post: iPost;
}

export const Post = (props: Props) => {
  const [user] = useAuthState(auth);
  const { post } = props;
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));
  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    console.log(data);
  };

  const addLike = async () => {
    await addDoc(likesRef, { userId: user?.uid, postId: post.id });
  };
  return (
    <>
      <main className="justify-center border-orange-900 rounded p-5 bg-pink-500 m-5 text-center w-1/2 ">
        <h3 className="text-xl">{post.title}</h3>
        <p>{post.description}</p>
        <p className="text-purple-800">@{post.username}</p>
        <button onClick={addLike}>&#128077;</button>
        <p>Likes: {}</p>
      </main>
    </>
  );
};

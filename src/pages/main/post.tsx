import { Post as iPost } from "./main";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
  post: iPost;
}

interface Likes {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const [user] = useAuthState(auth);
  const { post } = props;

  const [likes, setLikes] = useState<number | null>(null);

  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));
  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const addLike = async () => {
    try {
      await addDoc(likesRef, { userId: user?.uid, postId: post.id });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (error) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likesToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likesToDeleteData = await getDocs(likesToDeleteQuery);
      const likeId = likesToDeleteData.docs[0].id;
      const likesToDelete = doc(db, "likes", likeId);

      await deleteDoc(likesToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (error) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like: any) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);
  return (
    <>
      <main className="justify-center border-orange-900 rounded p-5 bg-pink-500 m-5 text-center w-1/2 ">
        <h3 className="text-xl">{post.title}</h3>
        <p>{post.description}</p>
        <p className="text-purple-800">@{post.username}</p>
        <button onClick={hasUserLiked ? removeLike : addLike}>
          {hasUserLiked ? <span>&#128078;</span> : <span>&#128077;</span>}
        </button>
        {likes && <p>Likes: {likes?.length}</p>}
      </main>
    </>
  );
};

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
interface CreateFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const navigate = useNavigate();
  const postsRef = collection(db, "posts");
  const [user] = useAuthState(auth);
  const schema = yup.object().shape({
    title: yup.string().required("You must add to title"),
    description: yup.string().required("You must add to description"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });
  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      //   title: data.title,
      //   description: data.description,
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onCreatePost)}>
        <h2>Title</h2>
        <input
          className="bg-pink-400 focus:bg-pink-800 outline-none"
          placeholder="Title..."
          {...register("title")}
        />
        <p className="text-red-500">{errors.title?.message}</p>
        <h2>Description</h2>
        <textarea
          className="bg-pink-400 focus:bg-pink-800 outline-none"
          placeholder="Description..."
          {...register("description")}
        />
        <p className="text-red-500">{errors.description?.message}</p>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

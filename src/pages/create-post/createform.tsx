import { yupResolver } from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import { addDoc,collection } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface CreateFormData{
    title:string,
    description:string
}

export const CreateForm = ()=>{
    const postsRef = collection(db,'posts')
    const schema = yup.object().shape({
        title: yup.string().required("You must add to title"),
        description: yup.string().required("You must add to description"),
    });
    const {register,handleSubmit,formState:{errors}}= useForm<CreateFormData>({
        resolver:yupResolver(schema),
    })
    const onCreatePost=async(data:CreateFormData)=>{
        await addDoc(postsRef,{
            title: data.title,
            description:data.description,

        })
    }
return <>
<form onSubmit={handleSubmit(onCreatePost)}>
    <h2>Title</h2>
    <input  placeholder='Title...' {...register('title')}/>
    <p className='text-red-500'>{errors.title?.message}</p>
    <h2>Description</h2>
    <textarea placeholder='Description...'{...register('description')}/>
    <p className='text-red-500'>{errors.description?.message}</p>
    <button type="submit">Submit</button>
</form>
</>

}
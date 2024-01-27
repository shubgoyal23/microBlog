import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import AppwriteUploadService from "../../appwrite/uploadConfig";
import AppwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
   const { register, handleSubmit, watch, setValue, control, getValues } =
      useForm({
         defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
         },
      });

   const navigate = useNavigate();
   const userData = useSelector((state) => state.auth.userData);
      
   const submit = async (data) => {
      if (post) {
         const file = await data.image[0]
            ? AppwriteUploadService.uploadFile(data.image[0])
            : null;

         if (file) {
            AppwriteUploadService.deleteFile(post.featuredImage);
         }

         const dbPost = await AppwriteService.updatePost(post.$id, {
            ...data,
            featuredImage: file ? file.$id : undefined,
         });

         if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
         }
      } else {
         const file = await data.image[0]
         ? await AppwriteUploadService.uploadFile(data.image[0])
         : null;
         if (file) {
            const feildId = file.$id;
            data.featuredImage = feildId;
            const dbPost = await AppwriteService.createPost({
               ...data,
               userId: userData.$id,
            });
            if (dbPost) navigate(`/post/${dbPost.$id}`);
         }
      }
   };

   const slugtransform = useCallback((value) => {
      if (value && typeof value === "string") {
         return value
            .trim()
            .replace(/[^a-zA-Z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .toLowerCase();
      }
      return "";
   }, []);

   React.useEffect(() => {
    const subscription = watch((value, { name }) => {
        if(name === "title") setValue("slug", slugtransform(value.title, {sholdvalidate: true}))
    })
    return () => {
        subscription.unsubscribe()
    }
   }, [watch, slugtransform, setValue]);

   return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugtransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={AppwriteUploadService.filePrev(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
   );
}

export default PostForm;

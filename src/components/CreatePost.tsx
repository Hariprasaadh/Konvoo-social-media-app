"use client"

import { useUser } from "@clerk/nextjs"
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SendIcon,Loader2Icon,ImageIcon } from "lucide-react";
import { createPost } from "@/actions/post.action";
import toast from "react-hot-toast";


const CreatePost = () => {

  const { user } = useUser();
  const [content,setContent] = useState("");
  const [imageUrl,setImageUrl] = useState("");
  const [isPosting,setIsPosting] = useState(false);  // to show a spinner while posting
  const [showImageUpload, setShowImageUpload] = useState(false); // show image upload if uploading 

  const handleSubmit = async () => {
    if(!content.trim() && !imageUrl) return
    setIsPosting(true);

    try{
        const result = await createPost(content, imageUrl); // server action
        if(result.success){
            //reset the form
            setContent("");
            setImageUrl("");
            setShowImageUpload(false);
            toast.success("Post created successfully");
        }
    }catch (error) {
        console.error("Failed to create post:",error);
        toast.error("Failed to create post");
    }finally{
        setIsPosting(false);
    }
  }
    
  return (
    <Card className="mb-6">
        <CardContent className="pt-6">
            <div className="space-y-4">
                
                {/* Show avatar and textarea to type the post content */}
                <div className="flex space-x-4">  

                    <Avatar className="w-10 h-10">
                    <AvatarImage src={user?.imageUrl || "/avatar.png"} />
                    </Avatar>

                    <Textarea
                    placeholder="What's on your mind?"
                    className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={isPosting}
                    />

                </div>

                <div className="flex items-center justify-between border-t pt-4">

                    {/* Image Upload Button */}
                    <div className="flex space-x-2">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-primary"
                            onClick={() => setShowImageUpload(!showImageUpload)}
                            disabled={isPosting}
                        >
                        <ImageIcon className="size-4 mr-2" />
                        Photo
                        </Button>
                    </div>

                    {/* Post Button */}
                    {/* Button disabled if no post or image content */}
                    <Button
                        className="flex items-center"
                        onClick={handleSubmit} 
                        disabled={(!content.trim() && !imageUrl) || isPosting}
                    >
                    {isPosting ? (
                        <>
                        <Loader2Icon className="size-4 mr-2 animate-spin" />
                        Posting...
                        </>
                    ) : (
                        <>
                        <SendIcon className="size-4 mr-2" />
                        Post
                        </>
                    )}
                    </Button>

                </div>

            </div>

        </CardContent>

    </Card>
  )
}

export default CreatePost

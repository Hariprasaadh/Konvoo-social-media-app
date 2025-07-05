import CreatePost from "@/components/CreatePost"
import { currentUser } from "@clerk/nextjs/server"
import WhoToFollow from "@/components/WhoToFollow";
import { getPosts } from "@/actions/post.action";
import PostCard from "@/components/PostCard";
import { getDBUserId } from "@/actions/user.action";

const page = async () => {

  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = await getDBUserId();
  
  return (
    <div className='grid grid-cols-1 lg:grid-cols-10 gap-6'>  {/*Parent 10 cols */}

      <div className="lg:col-span-6">   {/* 6 part for create post */ } 
          {user ? <CreatePost /> : null}

          <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} dbUserId={dbUserId} />
          ))}
        </div>

      </div>

      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <WhoToFollow />
      </div>

    </div>
  )
}

export default page

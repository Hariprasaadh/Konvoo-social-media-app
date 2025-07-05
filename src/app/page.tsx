import CreatePost from "@/components/CreatePost"
import { currentUser } from "@clerk/nextjs/server"

const page = async () => {

  const user = await currentUser();
  return (
    <div className='grid grid-cols-1 lg:grid-cols-10 gap-6'>  {/*Parent 10 cols */}

      <div className="lg:col-span-6">   {/* 6 part for create post */ } 
          {user ? <CreatePost /> : null}
      </div>

      <div className="hidden lg:block lg:col-span-4 sticky top-20">  {/* 4 parts for follow suggestions */}
          WhoToFollow
      </div>

    </div>
  )
}

export default page

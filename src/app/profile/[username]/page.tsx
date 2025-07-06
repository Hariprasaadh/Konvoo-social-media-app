// when we visit user profile, that username should be display in the search tab bar

import { getProfileByUsername, getUserLikedPosts, getUserPosts, isFollowing } from "@/actions/profile.action"
import { notFound } from "next/navigation";
import ProfilePageClient from "@/components/ProfilePageClient";

// generateMetadata is a special function
// dyanmic metadata
export async function generateMetadata({params}: {params : {username: string}}){
    const user = await getProfileByUsername(params.username);
    if(!user)   return;

    return{
      title: `${user.name ?? user.username}`,
      description: user.bio || `Check out ${user.username}'s profile`,
    }
}

const page = async ({params} :{params: {username: string }}) => {

  const { username } = await params;
  const user = await getProfileByUsername(username);
  if(!user) notFound(); // not found page

  // Parallel fetching which is much faster
  const [posts,likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ])

  return (
    <ProfilePageClient user={user} posts={posts} likedPosts={likedPosts} isFollowing={isCurrentUserFollowing}/>
  )
}

export default page

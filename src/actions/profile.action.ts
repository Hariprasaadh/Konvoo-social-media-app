"use server"

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { getDBUserId } from "./user.action";


// fetch the profile details using the username 
export async function getProfileByUsername(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        image: true,
        location: true,
        website: true,
        createdAt: true,
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
    });

    return user;

  } catch (error) {

    console.error("Error fetching profile:", error);
    throw new Error("Failed to fetch profile");

  }
}


// fetch all the posts of the user
export async function getUserPosts(userId: string) {

  try {

    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      // author information of that post
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        // comments by the user
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        // likes by the user
        likes: {
          select: {
            userId: true,
          },
        },
        // count the number of likes and comments by the user
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;

  } catch (error) {

    console.error("Error fetching user posts:", error);
    throw new Error("Failed to fetch user posts");

  }
}


//  posts that have been liked by the user
export async function getUserLikedPosts(userId: string) {
  try {
    const likedPosts = await prisma.post.findMany({
      where: {
        likes: {
          some: {
            userId,
          },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return likedPosts;

  } catch (error) {

    console.error("Error fetching liked posts:", error);
    throw new Error("Failed to fetch liked posts");

  }
}

// To update user profile using formData
export async function updateProfile(formData: FormData) {
  try {

    // Check if user is authenticated to modify his profile
    const { userId: clerkId } = await auth();
    if (!clerkId) throw new Error("Unauthorized");

    // fetch these details from the form data
    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    const location = formData.get("location") as string;
    const website = formData.get("website") as string;


    // update the details in the database
    const user = await prisma.user.update({
      where: { clerkId },
      data: {
        name,
        bio,
        location,
        website,
      },
    });

    revalidatePath("/profile");
    return { success: true, user };

  } catch (error) {

    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };

  }
}


// Used when you visit other user profiles. Show Follow or Unfollow button
export async function isFollowing(userId: string) {

  try {

    // check if the user is authenticated
    const currentUserId = await getDBUserId();  // database user id
    if (!currentUserId) return false;

    const follow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: userId,
        },
      },
    });

     return !!follow;  // !! Converts object to boolean value

  } catch (error) {

    console.error("Error checking follow status:", error);
    return false;

  }
}
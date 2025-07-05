"use server"

import { prisma } from "@/lib/prisma";
import { getDBUserId } from "./user.action";

// fetch all the notifications
export async function getNotifications() {
  try {
    const userId = await getDBUserId();
    if (!userId) return [];

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        post: {
          select: {
            id: true,
            content: true,
            image: true,
          },
        },
        comment: {
          select: {
            id: true,
            content: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",  // show the latest notifications first
      },
    });

    return notifications;

  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications");
  }
}

// mark notifications as read when we open the notification page
export async function markNotificationsAsRead(notificationIds: string[]) {
  try {
    await prisma.notification.updateMany({
      where: {
        id: {
          in: notificationIds,
        },
      },
      data: {
        read: true,  // mark the notifications as read
      },
    });

    return { success: true };

  } catch (error) {

    console.error("Error marking notifications as read:", error);
    return { success: false };

  }
}
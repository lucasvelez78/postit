import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Please sign in" });
    }

    //Get user

    const prismaUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    //Add comment
    try {
      const { message, postId } = req.body.data;

      if (!message.length) {
        return res.status(403).json({ message: "Please write something" });
      }

      const result = await prisma.comment.create({
        data: {
          message,
          userId: prismaUser?.id as string,
          postId,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ error: "Error adding the comment." });
    }
  }
}

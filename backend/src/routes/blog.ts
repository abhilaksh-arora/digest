import {
  createPostInput,
  updatePostInput,
} from "@abhilaksharora/common-medium";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany({
    select: {
      content: true,
      img: true,
      title: true,
      tags: true,
      hastags: true,
      publishedDate: true,
      authorId: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({
    posts,
  });
});

blogRouter.use("/user", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in",
      });
    }
  } catch (e) {
    return c.json({
      message: "You are not logged in",
    });
  }
});

blogRouter.get("/user", async (c) => {
  const userId = c.get("userId");
  if (!userId) {
    c.status(400);
    return c.json({ message: "User ID is required" });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      select: {
        id: true,
        title: true,
        img: true,
        content: true,
        authorId: true,
        tags: true,
        hastags: true,
        publishedDate: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    console.log(posts);
    return c.json({
      posts,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      message: "no posts",
    });
  }
});

blogRouter.get("/:id", async (c) => {
  const id = await c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        authorId: true,
        img: true,
        tags: true,
        hastags: true,
        publishedDate: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      post,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      message: "Error while fetching the post",
    });
  }
});

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in",
      });
    }
  } catch (e) {
    return c.json({
      message: "You are not logged in",
    });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const { success } = createPostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }
  const post = await prisma.post.create({
    data: {
      title: body.title,
      img: body.img,
      content: body.content,
      authorId: userId,
      tags: body.tags,
      hastags: body.hashtags,
      publishedDate: Date.now().toString(),
    },
  });

  return c.json({
    id: post.id,
  });
});

blogRouter.put("/:id", async (c) => {
  const body = await c.req.json();
  const id = await c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const { success } = updatePostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }

  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title: body.title,
      img: body.img,
      content: body.content,
      tags: body.tags,
      hastags: body.hashtags,
      publishedDate: Date.now().toString(),
    },
  });

  return c.json({
    id: post.id,
  });
});

blogRouter.delete("/:id", async (c) => {
  const id = await c.req.param("id");
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findUnique({
      where: { id: id },
    });
    if (!post || post.authorId !== userId) {
      c.status(403);
      return c.json({ message: "You can only delete your own posts" });
    }
    await prisma.post.delete({
      where: { id: id },
    });

    return c.json({
      message: "Post deleted successfully",
    });
  } catch (e) {
    c.status(411);
    return c.json({
      message: "Error while deleting the post",
    });
  }
});

blogRouter.get("/user/:authorid", async (c) => {
  const authorid = await c.req.param("authorid");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: authorid,
      },
      select: {
        id: true,
        title: true,
        img: true,
        authorId: true,
        content: true,
        tags: true,
        hastags: true,
        publishedDate: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      posts,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      message: "Error while fetching the user",
    });
  }
});

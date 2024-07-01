import { v } from "convex/values";
import {mutation, query} from "./_generated/server";
import {Doc, Id} from "./_generated/dataModel";

export const archive = mutation({
    args: {
        id: v.id('documents'),
    },
    handler: async (ctx, args)=> {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("User not authenticated");
        }
        const userId = identity.subject;

        const existingDocument = await ctx.db.get(args.id);

        if (!existingDocument) {
            throw new Error("Document not found");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }


        const recursiveArchive = async (documentId: Id<"documents">) => {
            const children = await ctx.db.query("documents")
                .withIndex("by_user_parent", (q) =>
                (
                    q
                    .eq("userId", userId)
                    .eq("parentDocument", documentId)
                )).collect();

            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchive: true,
                });
                await recursiveArchive(child._id);
            }
        }

        const document = await ctx.db.patch(args.id, {
            isArchive: true,
        });

        await recursiveArchive(args.id);


    }
})

export const getSideBar = query({
    args: {
        parentDocument: v.optional(v.id('documents')),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("User not authenticated");
        }

        const userId = identity.subject;

        return await ctx.db
            .query("documents")
            .withIndex("by_user_parent", (q) =>
            q.eq('userId', userId)
                .eq("parentDocument", args.parentDocument)
            )
            .filter((q) =>
                q.eq(q.field("isArchive"), false)
            )
            .order('desc')
            .collect()

    }
});

export const create = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id('documents')),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("User not authenticated");
        }

        const userId = identity.subject;

        return await ctx.db.insert("documents", {
            title: args.title,
            parentDocument: args.parentDocument,
            userId,
            isArchive: false,
            isPublished: false,
        });
    }
});

export const getTrash = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("User not authenticated");
        }

        const userId = identity.subject;

        return await ctx.db
            .query("documents")
            .withIndex("by_user_parent", (q) =>
            q.eq('userId', userId)
            ).filter((q) =>
                q.eq(q.field("isArchive"), true))
            .order('desc')
            .collect()
    }
});

export const restore = mutation({
    args: {
        id: v.id('documents'),
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("User not authenticated");
        }

        const userId = identity.subject;

        const existingDocument = await ctx.db.get(args.id);

        if (!existingDocument) {
            throw new Error("Document not found");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }

        const recursiveRestore = async (documentId: Id<"documents">) => {
            const children = await ctx.db.query("documents")
                .withIndex("by_user_parent", (q) =>
                (
                    q
                    .eq("userId", userId)
                    .eq("parentDocument", documentId)
                )).collect();

            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchive: false,
                });
                await recursiveRestore(child._id);
            }
        }
        
        const options: Partial<Doc<"documents">> = {
            isArchive: false,
        }

        if (existingDocument.parentDocument) {
            const parent = await ctx.db.get(existingDocument.parentDocument);
            if (parent?.isArchive) {
                options.parentDocument = undefined;
            }
        }

         const documents = await ctx.db.patch(args.id, options);

        await recursiveRestore(args.id);

        return documents;
    }
});

export const remove = mutation({
    args: {
        id: v.id('documents'),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("User not authenticated");
        }

        const userId = identity.subject;

        const existingDocument = await ctx.db.get(args.id);

        if (!existingDocument) {
            throw new Error("Document not found");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }

        return  await ctx.db.delete(args.id);
    }
});

export const getSearch = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("User not authenticated");
        }

        const userId = identity.subject;

        return await ctx.db
            .query("documents")
            .withIndex("by_user_parent", (q) =>
            q.eq('userId', userId))
            .filter((q) =>
                q.eq(q.field("isArchive"), false)
            )
            .order('desc')
            .collect()
    }
});

export const getById = query({
    args: {
        documentId: v.id('documents'),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        const document = await ctx.db.get(args.documentId);

        if (!document) {
            throw new Error("Document not found");
        }

        if (document?.isPublished && !document.isArchive) {
            return document;
        }

        if (!identity) {
            throw new Error("User not authenticated");
        }

        const userId = identity.subject;


        if (document.userId !== userId) {
            throw new Error("Unauthorized");
        }

        return document;
    }
});

export const update = mutation({
    args: {
        id: v.id('documents'),
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("User not authenticated");
        }

        const userId = identity.subject;

        const { id, ...rest } = args;

        const existingDocument = await ctx.db.get(id);

        if (!existingDocument) {
            throw new Error("Document not found");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }

        return await ctx.db.patch(id, {
            ...rest,
        });


    }
})

export const removeIcon = mutation({
    args: {
        id: v.id('documents'),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("User not authenticated");
        }

        const userId = identity.subject;

        const existingDocument = await ctx.db.get(args.id);

        if (!existingDocument) {
            throw new Error("Document not found");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }

        return await ctx.db.patch(args.id, {
            coverImage: undefined,
        });
    }
})

export const removeCoverImage = mutation({
    args: {
        id: v.id('documents'),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("User not authenticated");
        }

        const userId = identity.subject;

        const existingDocument = await ctx.db.get(args.id);

        if (!existingDocument) {
            throw new Error("Document not found");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }

        return await ctx.db.patch(args.id, {
            coverImage: undefined,
        });
    }
});
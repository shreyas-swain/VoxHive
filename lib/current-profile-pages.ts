import { getAuth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { NextApiRequest } from '@/node_modules/next/dist/shared/lib/utils';

export const currentProfilePages = async(req: NextApiRequest) => {
    const { userId } = getAuth(req);
    if (!userId) return null;

    const profile = await db.profile.findUnique({
        where: {
            userId
        }
    });

    return profile;
}
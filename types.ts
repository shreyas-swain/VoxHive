import { Server, Member, Profile } from "./node_modules/.prisma/client/index"

export type ServerWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })
};
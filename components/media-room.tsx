"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import "@livekit/components-styles";
import { Channel } from '@prisma/client';
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

interface MediaRoomProps {
    chatId: string;
    video: boolean;
    audio: boolean;
};

export const MediaRoom = ({
    chatId,
    video,
    audio
} : MediaRoomProps) => {

}
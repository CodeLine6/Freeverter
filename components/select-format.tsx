"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import type { Action } from "@/types";
import { useState } from "react";

const extensions = {
    image: [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "bmp",
        "webp",
        "ico",
        "tif",
        "tiff",
        "svg",
        "raw",
        "tga",
    ],
    video: [
        "mp4",
        "m4v",
        "mp4v",
        "3gp",
        "3g2",
        "avi",
        "mov",
        "wmv",
        "mkv",
        "flv",
        "ogv",
        "webm",
        "h264",
        "264",
        "hevc",
        "265",
    ],
    audio: ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"],
};

const Selectformat = ({ action, updateAction } : {action : Action, updateAction : Function}) => {
    const [defaultValue, setDefaultValue] = useState <string>("video");
    const [selected, setSelected] = useState <string>("...");
    return (
        <Select
            onValueChange={(value) => {
                if (extensions.audio.includes(value)) {
                    setDefaultValue("audio");
                } else if (extensions.video.includes(value)) {
                    setDefaultValue("video");
                }
                setSelected(value);
                updateAction(action.file_name, value);
            }}
            value={selected}
        >
            <SelectTrigger className="w-32 outline-none focus:outline-none focus:ring-0 text-center text-muted-foreground bg-background text-md font-medium">
                <SelectValue placeholder="..." />
            </SelectTrigger>
            <SelectContent className="h-fit">
                {action.file_type.includes("image") && (
                    <div className="grid grid-cols-2 gap-2 w-fit">
                        {extensions.image.map((elt, i) => (
                            <div key={i} className="col-span-1 text-center">
                                <SelectItem value={elt} className="mx-auto">
                                    {elt}
                                </SelectItem>
                            </div>
                        ))}
                    </div>
                )}
                {action.file_type.includes("video") && (
                    <Tabs defaultValue={defaultValue} className="w-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="video" className="w-full">
                                Video
                            </TabsTrigger>
                            <TabsTrigger value="audio" className="w-full">
                                Audio
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="video">
                            <div className="grid grid-cols-3 gap-2 w-fit">
                                {extensions.video.map((elt, i) => (
                                    <div key={i} className="col-span-1 text-center">
                                        <SelectItem value={elt} className="mx-auto">
                                            {elt}
                                        </SelectItem>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="audio">
                            <div className="grid grid-cols-3 gap-2 w-fit">
                                {extensions.audio.map((elt, i) => (
                                    <div key={i} className="col-span-1 text-center">
                                        <SelectItem value={elt} className="mx-auto">
                                            {elt}
                                        </SelectItem>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                )}
                {action.file_type.includes("audio") && (
                    <div className="grid grid-cols-2 gap-2 w-fit">
                        {extensions.audio.map((elt, i) => (
                            <div key={i} className="col-span-1 text-center">
                                <SelectItem value={elt} className="mx-auto">
                                    {elt}
                                </SelectItem>
                            </div>
                        ))}
                    </div>
                )}
            </SelectContent>
        </Select>
    )
}

export default Selectformat
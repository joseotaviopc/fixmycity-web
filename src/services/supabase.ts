// import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import { generateUUID } from "../utils/uuid";

const supabase = createClient<Database>(
    "https://xbqtwuldniqzdquaelyx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhicXR3dWxkbmlxemRxdWFlbHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4OTI3NDQsImV4cCI6MjA1MDQ2ODc0NH0.a5F1ZptljUxC3DSI7uXPhxMV3hozE7mBdpCcO-t2ERY",
);

interface CreateIssuedata {
    title: string;
    description: string;
    category: string;
    image: string | null;
}

export async function CreateIssue(data: CreateIssuedata) {
    const { data: result, error } = await supabase.from("Issue").insert({
        id: generateUUID(),
        title: data.title,
        description: data.description,
        category: data.category,
        image: data.image || null,
    });

    if (error) {
        throw error;
    }
    console.log("result", result, error);
    return result;
}

export async function GetIssues() {
    const { data, error } = await supabase.from("Issue").select("*");
    if (error) {
        throw error;
    }
    console.log("data", data);
    return data;
}

export async function UploadIssueImage(issueImage: string | null) {
    if (!issueImage) {
        return null;
    }
    const { data, error } = await supabase.storage.from("issues-data").upload(`issue-${generateUUID()}`, issueImage);
    if (error) {
        throw error;
    }
    console.log("data", data);
    const { data: issueData } = supabase.storage.from("issues-dat").getPublicUrl(data.path);

    console.log(issueData.publicUrl);

    return issueData.publicUrl;
}

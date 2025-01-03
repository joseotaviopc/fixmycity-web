import { useEffect, useState } from "react";
import { GetIssues } from "../services/supabase";
import { Issue } from "../db/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export function Reports() {
  const [issues, setIssues] = useState<Issue[]>([]);
    const [reload, setReload] = useState(true);

    async function fetchIssues() {
        const result = await GetIssues();
        setIssues(result);
    }
    useEffect(() => {
        if (reload) {
            fetchIssues();
            setReload(false);
        }
    }, [reload]);
  return (
    <div className="px-4 py-8 w-full">
      {issues.length > 0 ? (
                <>
                    {issues.map((issue) => (
                        <Accordion type="single" collapsible >
                            {/* key={`${issue.id}-${Math.random()}`}
                            style={{
                                gap: 4,
                                boxShadow: "0 0 4 0 rgba(163, 163, 163, 0.5)",
                                padding: 20,
                                // borderRadius: 8,
                                marginBottom: 12,
                                borderRadius: 12,
                                paddingHorizontal: 10,
                                paddingVertical: 12,
                                marginHorizontal: 16,
                                borderWidth: StyleSheet.hairlineWidth,
                                backgroundColor: "#EEE",
                                shadowColor: "#333",
                                shadowOffset: {
                                    height: 5,
                                    width: 5,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 5,
                            }}> */}
                            <AccordionItem value="item-1" className="w-3/4">
                              <AccordionTrigger className="hover:no-underline">📌 Issue: {issue.title}</AccordionTrigger>
                              <AccordionContent>
                                <div className="flex flex-col gap-2 mt-3">
                                <p style={{ fontSize: 13, color: "#999" }}>
                                        <span style={{ fontWeight: "600" }}>Id: </span>
                                        {issue.id}
                                    </p>
                                    <p style={{ fontSize: 13, color: "#999" }}>
                                        <span style={{ fontWeight: "600" }}>Reportedat: </span>
                                        {new Date(issue.reportedAt).toLocaleDateString()}
                                    </p>
                                    <p style={{ fontSize: 13, color: "#999" }}>
                                        <span style={{ fontWeight: "600" }}>Reported by: </span>
                                        {issue.reportedBy}
                                    </p>
                                    <p style={{ fontSize: 13, color: "#999" }}>
                                        <span style={{ fontWeight: "600" }}>Priority: </span>
                                        {issue.priority}
                                    </p>
                                    <p style={{ fontSize: 13, color: "#999" }}>
                                        <span style={{ fontWeight: "600" }}>Category: </span>
                                        {issue.category}
                                    </p>
                                    <p style={{ fontSize: 13, color: "#999" }}>
                                        <span style={{ fontWeight: "600" }}>Status: </span>
                                        {issue.status}
                                    </p>
                                    <p style={{ fontSize: 13, color: "#999" }}>
                                        <span style={{ fontWeight: "600" }}>Location: </span>
                                        {issue.location}
                                    </p>
                                    <p style={{ fontSize: 13, color: "#999" }}>
                                        <span style={{ fontWeight: "600" }}>Description: </span>
                                        {issue.description}
                                    </p>
                                    <p style={{ fontSize: 13, color: "#999" }}>
                                        <span style={{ fontWeight: "600" }}>Resolution notes: </span>
                                        {issue.resolutionNotes}
                                    </p>
                                    <p style={{ fontSize: 13, color: "#999" }}>
                                        <span style={{ fontWeight: "600" }}>Resolvedat: </span>
                                        {issue.resolvedAt ? new Date(issue.resolvedAt).toLocaleDateString() : "-"}
                                    </p>
                                    <p style={{ fontSize: 13, color: "#999" }}>
                                        <span style={{ fontWeight: "600" }}>Resolved by: </span>
                                        {issue.resolvedBy}
                                    </p>
                                    </div>
                              </AccordionContent>
                            </AccordionItem>


                            {/* <Accordion.Header>
                                <div
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        backgroundColor: "rgba(205, 250, 196, 0.0)",
                                    }}>
                                    <p></p>
                                    <Accordion.HeaderIcon>
                                        <MaterialIcons name="keyboard-arrow-down" size={23} color="#666" />
                                    </Accordion.HeaderIcon>
                                </div>
                            </Accordion.Header> */}
                                
                            {/* <Accordion.Expanded>
                                    <MaterialIcons
                                        name="delete-outline"
                                        size={23}
                                        color="#a23838"
                                        style={{ position: "absolute", top: 10, right: 0 }}
                                        onPress={() =>
                                            Alert.alert("Delete issue", "Are you sure you want to delete this issue?", [
                                                { text: "Cancel" },
                                                { text: "Delete", onPress: () => setIssues(issues.filter((i) => i.id !== issue.id)) },
                                            ])
                                        }
                                    />
                                    
                                </div>
                            </Accordion.Expanded> */}
                        </Accordion>
                    ))}
                </>
            ) : (
                <div>
                    <p style={{ fontSize: 13, color: "#999" }}>No issues found</p>
                </div>
            )}
            <div style={{ height: 20, width: "100%", backgroundColor: "rgba(205, 250, 196, 0.0)" }} />
            <button
                onClick={() => setReload(true)}
                disabled={reload}
                className="flex items-center justify-center bg-[#165c0f] p-4 rounded-2xl mb-8"
            >
                <div className={`animate-spin border-4 border-t-4 border-t-white border-gray-300 rounded-full absolute h-4 w-4 ${reload ? "flex" : "hidden"}`} /> 
                <p className={`text-white text-xl text-center ${reload ? "opacity-0" : "opacity-100"}`}>Reload</p>
            </button>
    </div>
  );
};

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

function DashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#FFC55A", height: "200vh", padding: "20px" }}>
      <div style={{ display: "flex", width: "100%", maxWidth: "3000px", textAlign: "center" }}>
        <div style={{ flex: 2, justifyContent: "center",  marginRight: "20px" }}>
          <span className="text-white font-bold text-3xl">This Week’s Recommendations</span>
            <div style = {{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "20px", borderRadius: "50px", marginTop: "200px", marginLeft: "300px", marginRight: "300px" }}>
              <ButtonDemo />
              <ButtonDemo2 />
            </div>
            <div style = {{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "20px", borderRadius: "10px", marginTop: "200px", marginLeft: "300px", marginRight: "300px" }}>
              <ButtonDemo />
              <ButtonDemo2 />
            </div>
        </div>
        <div style={{ flex: 1 }}>
          <ScrollAreaDemo />
        </div>
      </div>
    </div>
  );
}

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="rounded-md border" style={{ height: "600px", width: "500px" }}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <div key={tag} className="text-sm">
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export function ButtonDemo() {
  return <Button>Courses</Button>
}

export function ButtonDemo2() {
  return <Button>Books</Button>
}


export default DashboardPage;

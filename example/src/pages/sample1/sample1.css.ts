import type { CSSProperties } from "react";

export const rowStyle: CSSProperties = {
    backgroundColor: "#f9f9f9",
    position: "sticky",
    top: 0,
};

export const cellStyle: CSSProperties = {
    padding: "4px",
    borderBottom: "1px solid #ddd",
    width: "100px",
};

export const bodyRowStyle = (id: number): CSSProperties => ({
    backgroundColor: id % 2 === 0 ? "#f9f9f9" : "#ffffff",
});

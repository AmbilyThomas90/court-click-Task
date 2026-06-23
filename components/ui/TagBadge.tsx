"use client";
import React from "react";
import { Tag as AntTag } from "antd";
import { Tag } from "@/types";

interface Props {
  tag: Tag;
  closable?: boolean;
  onClose?: (tag: Tag) => void;
}

export default function TagBadge({ tag, closable, onClose }: Props) {
  return (
    <AntTag
      closable={closable}
      onClose={() => onClose?.(tag)}
      style={{
        background: tag.color + "22",
        borderColor: tag.color,
        color: tag.color,
        borderRadius: 12,
        fontSize: 10,
        marginBottom: 2,
        padding: "0 6px",
      }}
    >
      {tag.name}
    </AntTag>
  );
}

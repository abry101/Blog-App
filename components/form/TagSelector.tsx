"use client";
import React, { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";

const TagSelector = ({
  options,
  selected = [],
  onAdd,
}: {
  options: { label: string; value: number }[];
  selected?: string[];
  onAdd: (args: string[]) => void;
}) => {
  const [selectedTags, setSelectedTags] = useState(selected);
  const [suggestedTags, setSuggestedTags] = useState<
    {
      label: string;
      value: number;
    }[]
  >([]);
  const [newTags, setNewTags] = useState<string[]>([]);
  const [tag, setTag] = useState("");

  const handleAddNewTag = (tag: string) => {
    setNewTags(Array.from(new Set([...newTags, tag])));
    setTag("");
  };

  const handleNewTagRemove = (tag: string) => {
    setNewTags(newTags.filter((t) => t !== tag));
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      const st = options.filter(
        (t) => tag && t.label?.toLowerCase().includes(tag.toLowerCase())
      );
      setSuggestedTags([...st]);
    }, 300);
    return () => clearTimeout(timeOutId);
  }, [options, tag]);

  const handleAddTag = () => {
    if (newTags) {
      const tagsToAdd = newTags.map((tag) => tag.trim());
      const uniqueTags = Array.from(new Set([...selectedTags, ...tagsToAdd]));
      setSelectedTags(uniqueTags);
      onAdd(selectedTags);
      setNewTags([]);
      setTag("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ",") {
      if (tag.trim()) handleAddNewTag(tag);
    } else if (event.key === "Enter") {
      handleAddTag();
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <h3 className="text-lg">Tags:</h3>
      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex rounded-full py-1 px-3 bg-accent text-white items-center"
          >
            {tag}
            <HiX
              onClick={() => handleTagRemove(tag)}
              className="ml-2 cursor-pointer"
            />
          </span>
        ))}
      </div>

      <div>
        <div className="flex flex-wrap bg-base-content/20 rounded-md px-6 min-h-16 gap-2 py-2 items-center">
          {newTags &&
            newTags.map((tg) => {
              const tag = tg.trim();
              return (
                <span
                  key={tag}
                  className="inline-flex rounded-full py-2 px-4 text-sm bg-base-content/25 items-center"
                >
                  {tag}
                  <HiX
                    className="ml-2 cursor-pointer"
                    onClick={() => handleNewTagRemove(tag)}
                  />
                </span>
              );
            })}
          <input
            type="text"
            value={tag}
            onChange={(e) => {
              const v = e.target.value;
              if (v === ",") setTag("");
              else if (v.startsWith(",") && v.length > 1)
                setTag(v.slice(1, v.length));
              else if (v.endsWith(",") && v.length > 1)
                setTag(v.slice(0, v.length - 1));
              else setTag(v);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type and press Enter to add tags..."
            className="outline-none border-0 focus:outline-none bg-transparent flex-1"
          />
        </div>
      </div>
      {suggestedTags.length > 0 && (
        <>
          <h4 className="text-sm">suggestions:</h4>
          <div className="flex flex-wrap gap-2">
            {suggestedTags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex rounded-full py-2 px-4 text-sm bg-base-content/25 cursor-pointer"
                onClick={() => handleAddNewTag(tag.label)}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TagSelector;

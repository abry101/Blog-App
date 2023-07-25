"use client";
import DropdownField from "@/components/form/DropdownField";
import TextField from "@/components/form/TextField";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { MdCloudUpload, MdSave } from "react-icons/md";
import data from "@/public/data/data.json";
import TagSelector from "@/components/form/TagSelector";
import CheckBox from "@/components/form/CheckBox";
import TextEditor from "@/components/form/TextEditor";
export default function AddBlog() {
  const [photoUrl, setPhotoUrl] = useState("https://fakeimg.pl/1920x1080");
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const _categories = data.categories.map((c) => {
    return { label: c.name, value: c.id };
  });

  const _tags = data.tags.map((t) => {
    return { label: t.name, value: t.id };
  });

  type FormInputType = {
    title: string;
    body: string;
    categoryId: string;
    isFeatured: boolean;
    photoUrl: string;
    file: FileList | null;
  };
  const defaultValues: FormInputType = {
    title: "",
    body: "",
    categoryId: "",
    isFeatured: false,
    photoUrl: "https://fakeimg.pl/1920x1080",
    file: null,
  };

  const {
    register,
    formState: { errors, touchedFields, isValid },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm<FormInputType>({
    defaultValues,
  });

  const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setValue("photoUrl", URL.createObjectURL(file));
      setPhotoUrl(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const submitPost = (post: FormInputType) => {
    // Reset form state
    console.log("post :>> ", post);
    reset();
  };

  return (
    <div className="flex flex-col w-full mx-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Add New</h2>
        <div className="space-x-2">
          <button className="btn-bg-gradient py-3 px-6">
            <MdSave size={20} /> Save Draft
          </button>
          <button className="btn-bg-gradient py-3 px-6">
            <MdCloudUpload size={20} /> Publish
          </button>
        </div>
      </div>
      <div
        className="flex max-md:flex-col gap-x-4"
        onSubmit={handleSubmit(submitPost)}
      >
        <div className="flex flex-col w-full md:w-2/3 gap-4">
          <div className="w-full relative" style={{ aspectRatio: 1.78 }}>
            <Image
              fill
              src={photoUrl}
              alt="preview"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
          <input
            type="file"
            className="file-input file-input-bordered file-input-primary w-full max-w-md"
            onChange={onFileInputChange}
          />
          <TextField
            error={errors.title?.message}
            isTouched={touchedFields.title}
            type="text"
            placeholder="Post Title . . ."
            props={{
              ...register("title"),
            }}
          />
          <div className="w-full my-4">
            <TextEditor
              value={getValues("body")}
              onChange={(v) => setValue("body", v)}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 bg-base-200 p-4 shadow-md">
          <div className="my-4">
            <TagSelector
              options={_tags}
              onAdd={(args: string[]) => setTags(args)}
            />
          </div>
          <div className="my-4">
            <DropdownField
              label="Select Category:"
              inputClass="capitalize"
              options={_categories}
            />
          </div>
          <div className="my-4">
            <CheckBox
              leadingLabel="Featured Post"
              {...register("isFeatured")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

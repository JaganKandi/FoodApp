import React from "react";
import Image from "next/image";
import toast from "react-hot-toast";

function EditableImage({ link, setLink }) {
  async function handleFileChange(e) {
    const files = e.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const promise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setLink(link);
          });
        }
        throw new Error("Something went wrong");
      });

      await toast.promise(promise, {
        loading: "Uploading...",
        success: "Uploaded",
        error: "Error Uploading",
      });
    }
  }
  return <>
                  {link && (
                <Image
                  className="rounded-full  w-full h-full mb-1 aspect-square object-contain"
                  src={link}
                  width={200}
                  height={200}
                  alt={"avatar"}
                />
              )}

              {!link && (
                <div className="bg-gray-200 p-4 text-gray-500 rounded-full w-[104px] h-[104px] aspect-square object-cover mb-1 flex justify-center text-center items-center">
    No image<br/> 😟
</div>

              )}

              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="block border border-gray-300 cursor-pointer rounded-lg px-6 p-1 text-center">
                  Edit
                </span>
              </label>
  </>;
}

export default EditableImage;

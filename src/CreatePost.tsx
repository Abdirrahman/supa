import { Session } from "@supabase/supabase-js";
import { useContext, useRef, useState } from "react";
import { UserContext } from "./App";
import { supaClient } from "./supa-client";

export interface CreatePostProps {
  newPostCreated?: () => void;
}

function createNewPost({
  session,
  title,
  content,
  picture,
}: {
  session: Session | null;
  title: string;
  content: string;
  picture: any;
}) {
  return supaClient.rpc("create_new_post", {
    userId: session?.user.id || "",
    title,
    content,
    picture,
  });
}

export function CreatePost({ newPostCreated = () => {} }: CreatePostProps) {
  const { session } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const [picture, setPicture] = useState<any>();

  // Add Images func.

  // function handlePic(e: any) {
  //   console.log(e.target.files);
  //   setPicture(URL.createObjectURL(e.target.files[0]));
  // }
  return (
    <>
      <form
        className="flex flex-col justify-start gap-4 p-4 mb-8 ml-4 border-2 rounded"
        data-e2e="create-post-form"
        onSubmit={(event) => {
          event.preventDefault();
          createNewPost({ session, title, content, picture }).then(
            ({ error }) => {
              if (error) {
                console.log(error);
              } else {
                setTitle("");
                setContent("");
                if (titleInputRef.current) {
                  titleInputRef.current.value = "";
                }
                if (contentInputRef.current) {
                  contentInputRef.current.value = "";
                }
                newPostCreated();
              }
            }
          );
        }}
      >
        <h3>Create A New Post</h3>

        <input
          type="text"
          name="title"
          ref={titleInputRef}
          className="text-gray-800 p-2 rounded text-xl;"
          placeholder="Your Title Here"
          onChange={({ target: { value } }) => {
            setTitle(value);
          }}
        />
        <textarea
          name="contents"
          ref={contentInputRef}
          placeholder="Your content here"
          className="h-24 p-4 text-gray-800 rounded"
          onChange={({ target: { value } }) => {
            setContent(value);
          }}
        />
        {/* <input type="file" onChange={handlePic} />
        <img src={picture} /> */}

        <div>
          <button
            type="submit"
            className="p-2 text-lg bg-green-400 rounded font-display"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

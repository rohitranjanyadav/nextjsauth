"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data,setData] = React.useState("")
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      alert("Logout successful");
      router.push("/login");
    } catch (error: unknown) {
      console.log(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  const getUserDetails = async()=>{
    const res =  await axios.get("/api/users/me")
    console.log(res.data)
    setData(res.data.data._id)


  }

  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2>{data===""?"No user":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button className="px-5 py-2 bg-blue-400" onClick={logout}>
        Logout
      </button>
      <button className="px-5 py-2 bg-pink-400" onClick={getUserDetails}>
        Get User Details
      </button>
    </div>
  );
}

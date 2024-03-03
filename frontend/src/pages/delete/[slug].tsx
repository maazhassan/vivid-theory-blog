import React from "react";
import DeleteConfirmation from "@/components/DeleteConfirmation";

const DeleteBlogPage: React.FC = () => {
  return (
    <DeleteConfirmation redirect="/" className="mt-8"/>
  );
};

export default DeleteBlogPage;
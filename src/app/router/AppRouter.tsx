import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import BlogDetails from "@/pages/BlogDetails";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element = {<BlogDetails />} />
      </Routes>
    </BrowserRouter>
  );
};
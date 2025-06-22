import { Route, Routes } from "react-router";
import PrivateRoute from "./PrivateRoute";
import HydrogenLayout from "../layouts/hydrogen/components/MainLayout";
import NotFound from "../shared/NotFound";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <>
            <h1>Hello</h1>
          </>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HydrogenLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<>Dashboard</>} />
        <Route path="/studymaterial" element={<>Study Material</>} />
        <Route path="/smartlearning" element={<>Smart Learning</>} />
        <Route path="/selecttopictest" element={<>Topic Test</>} />
        <Route path="/selectmocktest" element={<>Exam Test</>} />
        <Route path="/selectclasstest" element={<>Class Test</>} />
        <Route path="/report" element={<>Reports & Analytics</>} />
        <Route path="/settings" element={<>Settings</>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;

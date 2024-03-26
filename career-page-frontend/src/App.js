import React, { Suspense, useEffect, useRef } from "react";
import LoginModel from "./pages/applicant/login-model";
import SignUpModel from "./pages/applicant/signup-model";
import PageNotFound from "./pages/404-not-found";
import { Routes, Route, Navigate } from "react-router-dom";
import HrLoginModel from "./pages/hr/hr-login-model";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/home-page";
import MainForm from "./pages/applicant/main-form";
import MyApplication from "./pages/applicant/my-application";
import Layout from "./pages/Layout/Layout";
import ProtectedRoute from "./utils/protectedRoute";
import ProtectedRoute2 from "./utils/protectedRoute2";
import HrDashHomePage from "./pages/hr/hr-dash-home-page";
import JdCards from "./pages/hr/Jd-render-page/JdCard";
import { useLoadUserQuery } from "./redux/api/userApi";
import Loader from "./components/loader";
import "./globle.css";
import JobDetails from "./pages/hr/Jd-render-page/job-detail-page";
import JdInputFields from "./pages/hr/jd-input-fields";
import AppliedJobs from "./pages/hr/applied-job";

// const JdInputFields = React.lazy(() => import("./pages/hr/jd-input-fields"));
// const JobDetails = React.lazy(() =>
//   import("./pages/hr/Jd-render-page/job-detail-page")
// );
// const AppliedJobs = React.lazy(() => import("./pages/hr/applied-job"));
// const PageNotFound = React.lazy(() => import("./pages/404-not-found"));

function App() {
  const { isLoading, isFetching } = useLoadUserQuery();

  let allowedRoles = [];
  let loading = isLoading || isFetching;
  if (loading) {
    return <Loader />;
  }

  // console.log(isError);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <React.Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Homepage />
              </Layout>
            }
          />
          <Route exact path="user/signup/*" element={<SignUpModel />} />
          <Route exact path="user/login/*" element={<LoginModel />} />
          <Route exact path="/hr-login/*" element={<HrLoginModel />} />

          <Route path="/:id" element={<JobDetails />} />
          <Route
            element={
              <ProtectedRoute
                allowedRoles={allowedRoles.concat(["Applicant"])}
              />
            }
          >
            <Route path=":id?/profile" element={<MainForm />} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                allowedRoles={allowedRoles.concat(["Applicant"])}
              />
            }
          >
            <Route path="application" element={<MyApplication />} />
          </Route>
          <Route
            element={
              <ProtectedRoute2
                allowedRoles={allowedRoles.concat(["Recruiter"])}
              />
            }
          >
            <Route path="dashboard" element={<HrDashHomePage />} />
          </Route>

          <Route
            element={
              <ProtectedRoute2
                allowedRoles={allowedRoles.concat(["Recruiter"])}
              />
            }
          >
            <Route path="applicant/*" element={<AppliedJobs />} />
          </Route>

          <Route
            element={
              <ProtectedRoute2
                allowedRoles={allowedRoles.concat(["Recruiter"])}
              />
            }
          >
            <Route path="create-job" element={<JdInputFields />} />
          </Route>

          <Route path="jobs">
            <Route
              element={
                <ProtectedRoute2
                  allowedRoles={allowedRoles.concat(["Recruiter"])}
                />
              }
            >
              <Route index element={<JdCards />} />
            </Route>
            <Route
              element={
                <ProtectedRoute2
                  allowedRoles={allowedRoles.concat(["Recruiter"])}
                />
              }
            >
              <Route path=":id" element={<JobDetails />} />
            </Route>
            <Route
              element={
                <ProtectedRoute2
                  allowedRoles={allowedRoles.concat(["Recruiter"])}
                />
              }
            >
              <Route path="edit-job/:id" element={<JdInputFields />} />
            </Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </React.Suspense>
    </>
  );
}
export default App;

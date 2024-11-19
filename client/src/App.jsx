import "./App.css";
import Intro from "./pages/Intro";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ManageEvent from "./pages/ManageEvents.jsx";
import ViewStartups from "./pages/ViewStartups.jsx";
import Setting from "./pages/Setting.jsx";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import GuestSpeaker from "./pages/GuestSpeaker.jsx";
import MyStartup from "./pages/MyStartup.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import PastEvents from "./pages/PastEvents.jsx";
import EventGallery from "./pages/EventGallery.jsx";
import ManageTeam from "./pages/ManageTeam.jsx";
import EcellFormBuilder from "./pages/EcellFormBuilder.jsx";
import EcellForms from "./pages/EcellForms.jsx"
import PostEcellForm from "./pages/PostEcellForm.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<SignUp />}></Route>
      <Route
        path="/user/*"
        element={
          <ProtectedRoute allowedRoles={["User"]}>
            <Sidebar />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="upcoming-events" element={<ManageEvent />} />
        <Route path="event-gallary/:id" element={<EventGallery />} />
        <Route path="past-events" element={<PastEvents />} />
        <Route path="my-startup" element={<MyStartup />} />
      </Route>

      <Route
        path="admin"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Sidebar />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="manage-events" element={<ManageEvent />} />
        <Route path="event-gallary/:id" element={<EventGallery />} />
        <Route path="past-events" element={<PastEvents />} />
        <Route path="ecell-forms" element={<EcellForms />} />
        <Route path="ecell-forms/create" element={<EcellFormBuilder/>}/>
        <Route path="ecell-forms/post/:formId" element={<PostEcellForm/>}/>
        <Route path="manage-startups" element={<ViewStartups />} />
        <Route path="manage-teams" element={<ManageTeam/>}/>
        <Route path="guest-speaker" element={<GuestSpeaker />} />
        <Route path="Setting" element={<Setting />} />
      </Route>
    </Routes>
  );
}

export default App;

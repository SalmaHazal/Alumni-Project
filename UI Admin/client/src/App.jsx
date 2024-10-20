import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import Improve from "./scenes/feedback/Improve";
import Problem from "./scenes/feedback/Problem";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import LoginPage from "./scenes/loginPage/LoginPage";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PlanCall from "./scenes/contactUs/PlanCall";
import Contact from "./scenes/contactUs/Contact";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const isAuth = Boolean(useSelector((state) => state.token));
  const location = useLocation();
  const isSidebarVisible = location.pathname !== "/";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isSidebarVisible && <Sidebar isSidebar={true} />}
          <main className="content">
            {isSidebarVisible && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/improve" element={<Improve />} />
              <Route path="/problem" element={<Problem />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/planCall" element={<PlanCall />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

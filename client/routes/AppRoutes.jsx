import {
    BrowserRouter,
    Routes,
    Route
    }
    from "react-router-dom";
    
    
    import Login from "../pages/Login";
    import Signup from "../pages/Signup";
    
    import Dashboard from "../pages/Dashboard";
    import Products from "../pages/Products";
    import Settings from "../pages/Settings";
    
    import ProtectedRoute from "../../components/ProtectedRoute";
    
    
    
    export default function AppRoutes(){
    
    
    return(
    
    <BrowserRouter>
    
    <Routes>
    
    
    <Route
    path="/login"
    element={<Login/>}
    />
    
    
    <Route
    path="/signup"
    element={<Signup/>}
    />
    
    
    
    <Route
    
    element={
    <ProtectedRoute/>
    }
    
    >
    
    
    <Route
    path="/dashboard"
    element={<Dashboard/>}
    />
    
    
    <Route
    path="/products"
    element={<Products/>}
    />
    
    
    <Route
    path="/settings"
    element={<Settings/>}
    />
    
    
    </Route>
    
    
    
    </Routes>
    
    
    </BrowserRouter>
    
    
    );
    
    
    }
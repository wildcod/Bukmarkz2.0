import React, { useState } from 'react';
import Login from "./Login";
import Register from "./Register";

const Index = ({ onClose}) => {
    const [openLogin, setOpenLogin] = useState(false)

    const onToggle = () => {
        setOpenLogin(!openLogin)
    }

    return !openLogin ?
               <Login
                   onToggle={onToggle}
                   onClose={onClose}
               /> :
              <Register
                  onToggle={onToggle}
                  onClose={onClose}
              />

};

export default Index;
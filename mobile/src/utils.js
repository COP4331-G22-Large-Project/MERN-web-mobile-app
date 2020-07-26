import * as React from "react";

export const AuthContext = React.createContext();

export const apiURL = process.env.production ? 'https://largeproject.herokuapp.com/api' : 'http://localhost:8000/api';
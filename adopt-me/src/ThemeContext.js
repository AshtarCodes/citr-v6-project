import { createContext } from "react";

// we're providing a hook. we want typescript to automatically read the provider as a function, so setting default to that
const ThemeContext = createContext(["green", function () {}]);

export default ThemeContext;

import ReactDOM from "react-dom/client"

import App from "./App"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./toolkit/store"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
  typography: {
    fontFamily: ["Gill Sans", "sans-serif"].join(",")
  }
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
)

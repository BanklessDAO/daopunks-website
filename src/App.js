import "./App.css";
import Home from "./pages/home";
import Wallet from "./pages/wallet";
import NftGallery from "./pages/nft-gallery";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

function App() {
  console.log('Made with ❤️ by OverAchiever');
  return (
    <Router>
      <Route path="/gallery" component={NftGallery} />
      <Route path="/my-dao-punks" component={Wallet} exact />
      <Route path="/" component={Home} exact />
    </Router>
  );
}

export default App;

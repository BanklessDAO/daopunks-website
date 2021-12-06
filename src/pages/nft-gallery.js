import Header from "../components/global/header";
import BackgroundImage from "../assets/images/backgrounds/team-background.png";
import Gallery from "../components/nft-gallery/gallery";
import NFT from "../components/nft-gallery/nft";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function NftGallery() {
  return (
    <div className="h-screen flex flex-col">
      <div
        className="pb-8 sm:pb-0"
        style={{
          background: `url('${BackgroundImage}')`,
          backgroundSize: "cover",
        }}
      >
        <Header />
      </div>
      <div className="h-full">
        <Router>
          <Route path="/gallery/*" component={NFT} />
          <Route path="/gallery" component={Gallery} exact />
        </Router>
      </div>
    </div>
  );
}

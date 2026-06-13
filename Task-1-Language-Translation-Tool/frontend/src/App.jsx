import HeroSection from "./components/hero/HeroSection";
import { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import DestinationGrid from "./components/translation/DestinationGrid";
import TranslationCabinet from "./components/translation/TranslationCabinet";
import ProfileModal from "./components/profile/ProfileModal";

function AppContent() {

  const [selectedDestination,
    setSelectedDestination] =
    useState(null);

  const [messages,
    setMessages] =
    useState([]);

  const [profileOpen,
    setProfileOpen] =
    useState(false);

  // Create default traveller profile
  useEffect(() => {

    if (
      !localStorage.getItem(
        "travellerName"
      )
    ) {

      localStorage.setItem(
        "travellerName",
        "Traveller"
      );

    }

  }, []);

  return (

<div
className="
relative
min-h-screen
overflow-hidden
bg-gradient-to-br
from-[#050816]
via-[#08101f]
to-[#020617]
"
>

{/* Stars Background */}

<div className="absolute inset-0 pointer-events-none overflow-hidden">

  <div className="star" style={{ top:"8%", left:"12%", animationDelay:"0s" }} />
  <div className="star" style={{ top:"20%", left:"70%", animationDelay:"1s" }} />
  <div className="star" style={{ top:"35%", left:"45%", animationDelay:"2s" }} />
  <div className="star" style={{ top:"50%", left:"90%", animationDelay:"0.5s" }} />
  <div className="star" style={{ top:"70%", left:"25%", animationDelay:"1.5s" }} />
  <div className="star" style={{ top:"85%", left:"80%", animationDelay:"2.5s" }} />
  <div className="star" style={{ top:"15%", left:"50%", animationDelay:"3s" }} />
  <div className="star" style={{ top:"65%", left:"60%", animationDelay:"1.8s" }} />
  <div className="star" style={{ top:"90%", left:"15%", animationDelay:"0.8s" }} />

</div>

{/* Shooting Star */}

<div
className="shooting-star"
style={{
top:"18%",
left:"-120px",
animationDelay:"4s"
}}
/>

<div className="absolute inset-0 pointer-events-none">

  <div className="star" style={{ top:"8%", left:"12%", animationDelay:"0s" }} />
  <div className="star" style={{ top:"15%", left:"35%", animationDelay:"1s" }} />
  <div className="star" style={{ top:"22%", left:"62%", animationDelay:"2s" }} />
  <div className="star" style={{ top:"12%", left:"82%", animationDelay:"3s" }} />
  <div className="star" style={{ top:"28%", left:"18%", animationDelay:"1.5s" }} />
  <div className="star" style={{ top:"35%", left:"45%", animationDelay:"2.5s" }} />
  <div className="star" style={{ top:"40%", left:"72%", animationDelay:"4s" }} />
  <div className="star" style={{ top:"48%", left:"10%", animationDelay:"3.5s" }} />
  <div className="star" style={{ top:"52%", left:"30%", animationDelay:"5s" }} />
  <div className="star" style={{ top:"58%", left:"55%", animationDelay:"1.2s" }} />
  <div className="star" style={{ top:"62%", left:"80%", animationDelay:"2.8s" }} />
  <div className="star" style={{ top:"68%", left:"15%", animationDelay:"4.5s" }} />
  <div className="star" style={{ top:"72%", left:"38%", animationDelay:"0.8s" }} />
  <div className="star" style={{ top:"76%", left:"65%", animationDelay:"3.2s" }} />
  <div className="star" style={{ top:"82%", left:"88%", animationDelay:"2.1s" }} />
  <div className="star" style={{ top:"88%", left:"22%", animationDelay:"5.5s" }} />
  <div className="star" style={{ top:"90%", left:"50%", animationDelay:"1.8s" }} />
  <div className="star" style={{ top:"18%", left:"5%", animationDelay:"2.3s" }} />
  <div className="star" style={{ top:"45%", left:"90%", animationDelay:"4.2s" }} />
  <div className="star" style={{ top:"70%", left:"95%", animationDelay:"0.5s" }} />
  <div className="star" style={{ top:"30%", left:"75%", animationDelay:"3.7s" }} />
  <div className="star" style={{ top:"55%", left:"60%", animationDelay:"1.4s" }} />
  <div className="star" style={{ top:"24%", left:"50%", animationDelay:"4.8s" }} />
  <div className="star" style={{ top:"65%", left:"5%", animationDelay:"2.6s" }} />
  <div className="star" style={{ top:"80%", left:"72%", animationDelay:"3.9s" }} />

</div>

<Navbar
onProfileClick={() =>
setProfileOpen(true)
}
/>

<main
className="
w-full
max-w-7xl
mx-auto
px-6
py-8
space-y-20
"
>

<HeroSection />

<section
id="destinations"
className="
flex
flex-col
items-center
justify-center
"
>

<DestinationGrid
selectedDestination={
selectedDestination
}
onSelectDestination={
(destination) => {

setSelectedDestination(
destination
);

localStorage.setItem(
"favoriteDestination",
JSON.stringify(
destination
)
);

}
}
/>

</section>

<section
id="translate"
className="space-y-6"
>

<div
className="
flex
justify-center
py-8
"
>

<TranslationCabinet
selectedDestination={
selectedDestination
}
messages={messages}
setMessages={setMessages}
/>

</div>

</section>

</main>

<Footer />

<ProfileModal
open={profileOpen}
onClose={() =>
setProfileOpen(false)
}
/>

</div>

  );
}

function App() {
  return <AppContent />;
}

export default App;
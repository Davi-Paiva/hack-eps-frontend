// src/pages/ImportFarmPage.tsx
import NavBar from "../components/NavBar/NavBar";

import ImportSlaughterHouse from "../components/ImportSlaughterHouse/ImportSlaughterHouse";

export default function ImportSlaughterHousePage() {
  // Replace with your backend endpoint URL
  const backendEndpoint = "http://localhost:8000/api/slaughterhouses/init-slaughterhouse"; 

  return (
    <>
      <NavBar />
      <ImportSlaughterHouse endpoint={backendEndpoint} />
    </>
  );
}

import { useState } from "react";
import Modal from "../Modal";
import VoidPermission from "./VoidPermission";
import VoidMain from "./VoidMain";

function Void() {
  const [activeVoid, setActiveVoid] = useState("permission");
  return (
    <Modal>
      {activeVoid === "permission" && (
        <VoidPermission setActiveVoid={setActiveVoid} />
      )}
      {activeVoid === "voidMain" && <VoidMain />}
    </Modal>
  );
}

export default Void;

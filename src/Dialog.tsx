import { useEffect, useRef, useState } from "react";

export interface DialogProps {
  allowClose?: boolean;
  contents: React.ReactNode;
  open: boolean;
  dialogStateChange?: (open: boolean) => void;
}

export default function Dialog({
  allowClose = true,
  contents,
  open,
  dialogStateChange = () => {},
}: DialogProps) {
  const [showModal, setShowModal] = useState(open);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open !== showModal) {
      setShowModal(open);
    }
  }, [open]);

  function updateDialogState(open: boolean) {
    setShowModal(open);
    dialogStateChange(open);
  }

  return showModal ? (
    <>
      <div className="fixed inset-0 z-40 bg-black opacity-75"></div>
      <div
        onClick={({ target }) => {
          if (!allowClose || dialog.current?.contains(target as any)) {
            return;
          }
          updateDialogState(false);
        }}
        onKeyDown={({ key }) => {
          if (!allowClose || key !== "Escape") {
            return;
          }
          updateDialogState(false);
        }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
      >
        <div className="relative w-auto mx-auto my-6 w-128">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-200 to-green-600 rounded-lg blur-lg opacity-25 transition duration-1000 group-hover:opacity-100 group-hover:duration-2000"></div>
            <div
              ref={dialog}
              className="relative grid p-6 bg-black rounded-lg place-content-center"
            >
              {contents}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

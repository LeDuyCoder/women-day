import { useEffect, useRef } from "react";
import { LockKeyhole } from "lucide-react";

export default function SecretGiftDialog({ open, onClose }) {
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      triggerRef.current = document.activeElement;
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function handleClose() {
    onClose();
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  return (
    <dialog
      className="secret-dialog"
      ref={dialogRef}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-message"
      onClose={handleClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
    >
      <div className="dialog-content">
        <span className="dialog-lock" aria-hidden="true"><LockKeyhole size={24} /></span>
        <p className="eyebrow">Thông báo từ hệ thống</p>
        <h2 id="dialog-title">Khoan đã bạn ơi!</h2>
        <p id="dialog-message">Cảnh báo: Bạn không đủ đặc quyền để nhận quà này, hãy nâng cấp quyền hạn để được chọn món quà này! 😅</p>
        <form method="dialog">
          <button className="dialog-close" type="submit">Để xem xét lại</button>
        </form>
      </div>
    </dialog>
  );
}

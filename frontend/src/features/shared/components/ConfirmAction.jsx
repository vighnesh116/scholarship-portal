import Swal from "sweetalert2";

export const confirmAction = async ({
  title,
  text,
  successTitle,
  successText,
  onConfirm,
}) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });

  if (result.isConfirmed) {
    if (onConfirm) await onConfirm();

    await Swal.fire({
      icon: "success",
      title: successTitle,
      text: successText,
      timer: 1500,
      showConfirmButton: false,
    });

    return true;
  }

  return false;
};
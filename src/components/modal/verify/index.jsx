import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { auth } from "../../../service";
import Notification from "../../../utils/notification";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: 1.3,
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 3,
  outline: "none",
};

export default function BasicModal({ open, setOpen, email, closeModal }) {
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(60);
  useEffect(() => {
    let timer = null;
    if (open) {
      timer = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [open]);
  useEffect(() => {
    if (secondsLeft === 0) {
      handleClose();
    }
  }, [secondsLeft, handleClose]);
  useEffect(() => {
    setSecondsLeft(60);
  }, [closeModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { code, email };
    try {
      const response = await auth.auth_verify(payload);
      console.log(response);
      if (response.status === 201) {
        Notification({
          title: "Successfully created",
          type: "success",
        });
        handleClose();
        localStorage.setItem("access_token", response.data.acceess_token);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      Notification({
        title: "Error",
        type: "error",
      });
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            className="text-center"
            variant="h6"
            component="h2"
          >
            Parolni kiriting
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="fullWidth"
              label="Parol"
              sx={{ marginY: "20px" }}
              onChange={(e) => setCode(e.target.value)}
              name="code"
            />
            <Typography>{`Time left: ${secondsLeft} seconds`}</Typography>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Tasdiqlash
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

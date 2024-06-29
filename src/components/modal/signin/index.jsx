import { Typography, TextField, Box, Modal, Button } from "@mui/material"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { verifyPassValidationSchema } from "../../../utils/validation"
import ChildModal from './child-modal'
import { auth } from "@service"
import { useState } from "react"
import Notification from "../../../utils/notification"
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 450,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  borderRadius: 1.3,
  pt: 2,
  pb: 3,
  px: 4,
}
export default function NestedModal({open, handleClose}) {
  const [modal, setModal] = useState(false)
  const [email, setEmail] = useState("")
  const initialValues = {
    email: "",
  }
  const handleSubmit = async(values) => {
    setEmail(values.email)
    try {
      const response = await auth.forgot_password(values)
      console.log(response);
      if (response.status === 200) {
        setModal(true)
        Notification({
          title: response.data.message,
          type: "success",
        })
      }
    }catch (error) {
    Notification({
      title: "Something went wrong",
      type: "error",
    })
    }
  }
  return (
    <>
      <ChildModal open={modal} handleClose={() => setModal(false)} email={email}/>
      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-deskription"
      >
        <Box sx={{...style, width: 400}}>
          <Typography
          id="keep-mounted-modal-title"
          className="text-center"
          variant="h6"
          component="h2"
          >
            Email kiriting
          </Typography>
          <Formik
          initialValues={initialValues}
          validationSchema={verifyPassValidationSchema}
          onSubmit={handleSubmit}
          >
            <Form>
              <Field
              name="email"
              type="email"
              as={TextField}
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              helperText={
                <ErrorMessage name="email" component='span' className="text-[red] text-[15px]" />
              }
              />
              <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  )
} 

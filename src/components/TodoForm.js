import { forwardRef, useEffect, useImperativeHandle } from "react";
import { Stack, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const TodoForm = forwardRef(
  ({ showAdd = true, editData = null, onSubmit }, ref) => {
    const initialValues = editData
      ? editData
      : {
          title: "",
          content: "",
        };

    const validationSchema = Yup.object({
      title: Yup.string()
        .required("Title is Required")
        .min(3, "Title should contain atleast 3 characters")
        .max(32, "Title should contain atmost 32 characters"),
      content: Yup.string()
        .required("Content is Required")
        .min(3, "Content should contain atleast 3 characters")
        .max(32, "Content should contain atmost 32 characters"),
    });

    const formik = useFormik({
      initialValues: initialValues,
      validateOnChange: false,
      validateOnBlur: true,
      validationSchema,
      onSubmit,
    });

    useImperativeHandle(ref, () => {
      return {
        resetForm() {
          formik.resetForm();
        },
        submitForm() {
          formik.handleSubmit();
        },
      };
    });

    return (
      <div className=" container">
        <Stack direction="horizontal" gap={2}>
          <Form.Control
            placeholder="Enter Title here..."
            className=" custom-standard"
            name="title"
            aria-describedby="titleBlock"
            value={formik.values.title}
            onChange={(e) => {
              formik.setFieldValue("title", e.target.value);
            }}
            id={`${showAdd ? "add" : "edit"}-title`}
          />
          {showAdd && (
            <Button
              variant="primary"
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              Add
            </Button>
          )}
        </Stack>

        {formik.errors.title && (
          <Form.Text id="titleBlock" className="custom-error">
            {formik.errors.title}
          </Form.Text>
        )}

        <div className="space-top-10">
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Enter Todo eg:car wash..."
            value={formik.values.content}
            name="content"
            id={`${showAdd ? "add" : "edit"}-content`}
            onChange={(e) => {
              formik.setFieldValue("content", e.target.value);
            }}
          />
          {formik.errors.content && (
            <Form.Text id="contentBlock" className="custom-error">
              {formik.errors.content}
            </Form.Text>
          )}
        </div>
      </div>
    );
  }
);

export default TodoForm;

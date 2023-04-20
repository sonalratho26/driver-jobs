export default function validate(values) {
    let errors = {};
    if (!values.name) {
      errors.name = "jobname is required";
    }
   
    if (!values.driver_id) {
      errors.driver_id = "select driver ";
    }
    if (!values.assign_status) {
      errors.assign_status = "select status";
    }
    if (!values.description) {
      errors.description = "description is required";
    } else if (values.description.length < 8) {
      errors.description = "description must be 8 or more characters";
    }
    if (!values.files) {
      errors.files = "select files ";
    }
    if (!values.job_location) {
      errors.job_location = "select Location ";
    }
    return errors;
  }
  
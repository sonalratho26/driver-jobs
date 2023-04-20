export default function editvalidate(values) {
    let errors = {};
    if (!values.name) {
      errors.name = "name is required";
    }
    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Email address is invalid";
    }
    if (!values.mobile) {
      errors.mobile = "mobile number is required";
    } else if (
      !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(values.mobile)
    ) {
      errors.mobile = "mobile number is invalid";
    }
    if (!values.role_id) {
      errors.role_id = "select your supervisor or worker ";
    }
    if (!values.job_id) {
      errors.job_id = "select Jobs";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be 8 or more characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Confirm password is Not Matched with password";
    }
    if (!values.address) {
      errors.address = "address is required";
    } 
    return errors;
  }
  
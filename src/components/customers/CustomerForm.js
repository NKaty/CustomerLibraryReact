import { Field, ErrorMessage } from 'formik';

const CustomerForm = ({ errors, touched }) => {
  return (
    <>
      <Field name="customerId" type="text" hidden />
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">
          First Name
        </label>
        <Field
          name="firstName"
          type="text"
          id="firstName"
          className={
            'form-control' +
            (errors.firstName && touched.firstName ? ' is-invalid' : '')
          }
        />
        <ErrorMessage
          name="firstName"
          component="div"
          className="invalid-feedback d-block"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Last Name
        </label>
        <Field
          name="lastName"
          type="text"
          id="lastName"
          className={
            'form-control' +
            (errors.lastName && touched.lastName ? ' is-invalid' : '')
          }
        />
        <ErrorMessage
          name="lastName"
          component="div"
          className="invalid-feedback d-block"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phoneNumber" className="form-label">
          Phone number
        </label>
        <Field
          name="phoneNumber"
          type="text"
          id="phoneNumber"
          className={
            'form-control' +
            (errors.phoneNumber && touched.phoneNumber ? ' is-invalid' : '')
          }
        />
        <ErrorMessage
          name="phoneNumber"
          component="div"
          className="invalid-feedback d-block"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <Field
          name="email"
          type="text"
          id="email"
          className={
            'form-control' +
            (errors.email && touched.email ? ' is-invalid' : '')
          }
        />
        <ErrorMessage
          name="email"
          component="div"
          className="invalid-feedback d-block"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="totalPurchasesAmount" className="form-label">
          Total Purchases Amount
        </label>
        <Field
          name="totalPurchasesAmount"
          type="text"
          id="totalPurchasesAmount"
          className={
            'form-control' +
            (errors.totalPurchasesAmount && touched.totalPurchasesAmount
              ? ' is-invalid'
              : '')
          }
        />
        <ErrorMessage
          name="totalPurchasesAmount"
          component="div"
          className="invalid-feedback d-block"
        />
      </div>
    </>
  );
};

export default CustomerForm;

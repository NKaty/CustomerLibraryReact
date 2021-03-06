import { convertEmptyStringToNull } from '../../utils/convertNullableFields';
import { convertLettersToLowCase } from '../../utils/convertToLowCase';

const withCreateEditForm = OriginalComponent =>
  function WithCreateEditForm(props) {
    const onSubmit =
      (id, service) =>
      (fields, { setStatus, setSubmitting, setFieldError }) => {
        const preparedFields = convertEmptyStringToNull(fields);
        setStatus();

        if (!id) {
          create(service, preparedFields, setSubmitting, setFieldError);
        } else {
          update(service, preparedFields, id, setSubmitting, setFieldError);
        }
      };

    const showError = (error, setFieldError) => {
      if (error.validationErrors) {
        if (error.validationErrors['']) {
          props.showAlert(error.validationErrors[''][0], 'error');
        } else {
          Object.keys(error.validationErrors).forEach(field => {
            setFieldError(
              convertLettersToLowCase(field),
              error.validationErrors[field].join(' ')
            );
          });
        }
      } else {
        props.showAlert(error.errorTitle, 'error');
      }
    };

    const create = (service, fields, setSubmitting, setFieldError) => {
      service.create(fields).then(data => {
        if (data && data.error) {
          setSubmitting(false);
          showError(data, setFieldError);
        } else {
          props.history.goBack();
        }
      });
    };

    const update = (service, fields, id, setSubmitting, setFieldError) => {
      service.update(id, fields).then(data => {
        if (data && data.error) {
          setSubmitting(false);
          showError(data, setFieldError);
        } else {
          props.history.goBack();
        }
      });
    };

    const onClickCancelButton = event => {
      event.preventDefault();
      props.history.goBack();
    };

    return (
      <OriginalComponent
        {...props}
        onSubmit={onSubmit}
        onClickCancelButton={onClickCancelButton}
      />
    );
  };

export default withCreateEditForm;

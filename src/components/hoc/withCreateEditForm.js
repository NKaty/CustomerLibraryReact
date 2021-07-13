const withCreateEditForm = (OriginalComponent, service) =>
  function WithCreateEditForm(props) {
    const onSubmit =
      id =>
      (fields, { setStatus, setSubmitting, setFieldError }) => {
        setStatus();
        if (!id) {
          create(fields, setSubmitting, setFieldError);
        } else {
          update(fields, id, setSubmitting, setFieldError);
        }
      };

    const showError = (error, setFieldError) => {
      if (error.validationErrors) {
        if (error.validationErrors['']) {
          props.showAlert(error.validationErrors[''][0], 'error');
        } else {
          Object.keys(error.validationErrors).forEach(field =>
            setFieldError(
              `${field[0].toLowerCase()}${field.slice(1)}`,
              error.validationErrors[field].join(' ')
            )
          );
        }
      } else {
        props.showAlert(error.errorTitle, 'error');
      }
    };

    const create = (fields, setSubmitting, setFieldError) => {
      service.create(fields).then(data => {
        if (data.error) {
          setSubmitting(false);
          showError(data, setFieldError);
        } else {
          props.history.goBack();
        }
      });
    };

    const update = (fields, id, setSubmitting, setFieldError) => {
      service.update(id, fields).then(data => {
        if (data.error) {
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

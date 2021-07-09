const NoteForm = ({ isCreateMode, data }) => {
  return (
    <form>
      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          Note
        </label>
        <div className="col-sm-10">
          <input type="email" className="form-control" id="inputEmail3" />
        </div>
      </div>
    </form>
  );
};

export default NoteForm;

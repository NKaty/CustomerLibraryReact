import handleResponse from '../handleResponse';

describe('handleResponse', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should return data', async () => {
    fetch.mockResponseOnce(
      JSON.stringify([
        { noteText: 'note1', customerId: 1, noteId: 2 },
        {
          noteText: 'note2',
          customerId: 1,
          noteId: 3,
        },
      ])
    );
    const data = await handleResponse('notes', {});

    expect(data).toStrictEqual([
      { noteText: 'note1', customerId: 1, noteId: 2 },
      {
        noteText: 'note2',
        customerId: 1,
        noteId: 3,
      },
    ]);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should return null', async () => {
    fetch.mockResponseOnce();
    const data = await handleResponse('notes', {});

    expect(data).toBe(null);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should return error from server', async () => {
    fetch.mockResponseOnce(JSON.stringify({ title: 'error' }), {
      status: 404,
      headers: { 'content-type': 'application/json' },
    });
    const data = await handleResponse('notes', {});

    expect(data).toStrictEqual({
      error: true,
      errorTitle: 'error',
      validationErrors: null,
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should return error from server with default error title', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), {
      status: 404,
      headers: { 'content-type': 'application/json' },
    });
    const data = await handleResponse('notes', {});

    expect(data).toStrictEqual({
      error: true,
      errorTitle: 'Something went wrong.',
      validationErrors: null,
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should return validation errors from server', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        title: 'error',
        errors: {
          NoteText: ['Note is required.'],
        },
      }),
      {
        status: 400,
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await handleResponse('notes', {});

    expect(data).toStrictEqual({
      error: true,
      errorTitle: 'error',
      validationErrors: {
        NoteText: ['Note is required.'],
      },
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should return error from catch', async () => {
    fetch.mockReject(new Error('error'));
    const data = await handleResponse('notes', {});

    expect(data).toStrictEqual({
      error: true,
      errorTitle: 'Something went wrong.',
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

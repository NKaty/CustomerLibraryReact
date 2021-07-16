import {
  convertLetterToLowCase,
  convertLettersToLowCase,
} from '../convertToLowCase';

describe('convertLetterToLowCase', () => {
  it('should convert the letter at index to low case', () => {
    expect(convertLetterToLowCase('Note', 0)).toBe('note');
    expect(convertLetterToLowCase('NoteText', 4)).toBe('Notetext');
  });

  it('should convert the first letter and the first letter after dot to low case', () => {
    expect(convertLettersToLowCase('Note')).toBe('note');
    expect(convertLettersToLowCase('NoteText')).toBe('noteText');
    expect(convertLettersToLowCase('Note.NoteText')).toBe('note.noteText');
  });
});

const morseDecode = require('../morse-code');

describe('morseDecode', () => {
  
    test('should decode single letter', () => {
      expect(morseDecode('....')).toBe('H');
      expect(morseDecode('.')).toBe('E');
      expect(morseDecode('.-')).toBe('A');
    });
  
    test('should decode multiple letters', () => {
      expect(morseDecode('.... ..')).toBe('HI');
      expect(morseDecode('.... . .-.. .-.. ---')).toBe('HELLO');
    });
  
    test('should decode a single word with numbers', () => {
      expect(morseDecode('.---- ..--- ...--')).toBe('123');
      expect(morseDecode('....- ..... -....')).toBe('456');
    });
  
    test('should decode multiple words', () => {
      const morse = "--. --- --- -..   -- --- .-. -. .. -. --.   -. --- .-. - .... -.-. --- -.. . .-. ...";
      expect(morseDecode(morse)).toBe("GOOD MORNING NORTHCODERS");
    });
  
    test('should return empty string for empty input', () => {
      expect(morseDecode('')).toBe('');
    });
  
    test('should encode text to morse code', () => {
      expect(morseDecode('HI', true)).toBe('.... ..');
      expect(morseDecode('HELLO', true)).toBe('.... . .-.. .-.. ---');
    });
  
    test('should encode multiple words to morse code', () => {
      expect(morseDecode('HELLO WORLD', true)).toBe('.... . .-.. .-.. ---   .-- --- .-. .-.. -..');
      expect(morseDecode('GOOD MORNING NORTHCODERS', true)).toBe('--. --- --- -..   -- --- .-. -. .. -. --.   -. --- .-. - .... -.-. --- -.. . .-. ...');
    });
  
  });
import { QuakerMapsTheme } from './theme';
import { deepOrange, deepPurple, green, pink, red } from '@mui/material/colors';

describe('QuakerMapsTheme', () => {
  it('should have correct primary color main value', () => {
    expect(QuakerMapsTheme.palette.primary.main).toEqual(deepPurple[500]);
  });

  it('should have correct secondary color main value', () => {
    expect(QuakerMapsTheme.palette.secondary.main).toEqual(pink.A400);
  });

  it('should have correct error color main value', () => {
    expect(QuakerMapsTheme.palette.error.main).toEqual(red[500]);
  });

  it('should have correct warning color main value', () => {
    expect(QuakerMapsTheme.palette.warning.main).toEqual(deepOrange[500]);
  });

  it('should have correct info color main value', () => {
    expect(QuakerMapsTheme.palette.info.main).toEqual(deepPurple[500]);
  });

  it('should have correct success color main value', () => {
    expect(QuakerMapsTheme.palette.success.main).toEqual(green[500]);
  });

  it('should be a valid MUI theme object', () => {
    expect(QuakerMapsTheme).toHaveProperty('palette');
    expect(QuakerMapsTheme).toHaveProperty('typography');
    expect(QuakerMapsTheme).toHaveProperty('spacing');
    expect(QuakerMapsTheme).toHaveProperty('breakpoints');
  });
});